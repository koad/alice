// save_learner_state/handler.js — persist learner progress/profile/sight to Alice's message store
//
// Writes a structured JSON record to ~/.koad-io/messages/alice/ via the daemon inbox.
// Falls back to direct file write if the daemon callback is not registered.
//
// Fires a learner.returned emission (fire-and-forget via emit.py) when a known
// learner re-engages after a gap. First-time saves are silent.
//
// params  = { learner_id, state_type, data }
// context = { entity, sessionId, userId, settings }

'use strict';

const fs     = require('fs');
const path   = require('path');
const { spawn } = require('child_process');

const VALID_LEARNER_RE = /^[a-zA-Z0-9_.\-]+$/;
const MESSAGES_DIR = path.join(process.env.HOME || '/home/koad', '.koad-io', 'messages', 'alice');
const EMIT_PY      = path.join(process.env.HOME || '/home/koad', '.koad-io', 'helpers', 'emit.py');

// ---------------------------------------------------------------------------
// Emission helper — fire-and-forget learner.returned via emit.py
// ---------------------------------------------------------------------------

/**
 * Probe the messages dir for prior records matching learner_id.
 * Returns { found: boolean, last_saved_at: string|null, last_level: number|null }
 */
function _priorState(learner_id) {
  if (!fs.existsSync(MESSAGES_DIR)) {
    return { found: false, last_saved_at: null, last_level: null };
  }
  let filenames;
  try { filenames = fs.readdirSync(MESSAGES_DIR); } catch (_) { return { found: false, last_saved_at: null, last_level: null }; }

  const escapedId = learner_id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matchRe   = new RegExp(`__${escapedId}__`);
  const matching  = filenames.filter(f => f.endsWith('.json') && matchRe.test(f));
  if (matching.length === 0) return { found: false, last_saved_at: null, last_level: null };

  // Parse all matching files to find the latest saved_at and any progress record
  let last_saved_at = null;
  let last_level    = null;
  for (const fname of matching) {
    try {
      const rec = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, fname), 'utf8'));
      const ts  = rec.saved_at || rec.visited_at || null;
      if (ts && (!last_saved_at || ts > last_saved_at)) last_saved_at = ts;
      if (rec.state_type === 'progress' && rec.data && typeof rec.data.current_level === 'number') {
        last_level = rec.data.current_level;
      }
    } catch (_) { /* skip malformed */ }
  }
  return { found: true, last_saved_at, last_level };
}

/**
 * Decide whether to fire a learner.returned emission. Fires only when:
 *  - prior.found is true (not a first save)
 * Extracts last_level from prior progress records or from current data if
 * state_type === 'progress'. gap_days computed from prior.last_saved_at → now.
 */
function _maybeEmitReturned(prior, learner_id, data, now) {
  if (!prior.found) return; // first-time save — silent
  const last_seen  = prior.last_saved_at ? prior.last_saved_at.slice(0, 10) : null;
  const gap_days   = last_seen
    ? Math.round((new Date(now) - new Date(last_seen + 'T00:00:00Z')) / 86400000)
    : 0;
  // Prefer current progress level if this is a progress save; else use last known
  const last_level = (typeof data.current_level === 'number') ? data.current_level
                   : (prior.last_level || 0);
  _emitLearnerReturned({ handle: learner_id, last_level, last_seen: last_seen || now.slice(0, 10), gap_days });
}

/**
 * Fire a learner.returned emission via emit.py. Completely fire-and-forget —
 * never throws, never blocks the save path.
 */
function _emitLearnerReturned({ handle, last_level, last_seen, gap_days }) {
  try {
    const meta = JSON.stringify({ handle, last_level: last_level || 0, last_seen: last_seen || '', gap_days });
    const body = `learner @${handle} returned (level ${last_level || 0}, ${gap_days} days)`;
    const env  = Object.assign({}, process.env, { KOAD_IO_EMIT: '1', ENTITY: 'alice' });
    const child = spawn(
      'python3', [EMIT_PY, 'emit', 'learner.returned', body, '--meta', meta],
      { env, detached: true, stdio: 'ignore' }
    );
    child.unref();
  } catch (_) { /* never surface — emit is best-effort */ }
}

module.exports = async function saveLearnerStateHandler(params, context) {
  // Defensive fallback: if the LLM omitted learner_id but the harness injected
  // it into toolContext (from the client's POST body), use that value.
  const { state_type, data } = params;
  const learner_id = params.learner_id || (context && context.learnerId) || null;

  // Validate learner_id
  if (!learner_id || typeof learner_id !== 'string' || learner_id.length > 64) {
    throw new Error('learner_id must be a non-empty string, max 64 chars');
  }
  if (!VALID_LEARNER_RE.test(learner_id)) {
    throw new Error('learner_id may only contain alphanumeric chars, hyphens, underscores, and dots');
  }

  const validTypes = ['progress', 'profile', 'sight'];
  if (!state_type || !validTypes.includes(state_type)) {
    throw new Error(`state_type must be one of: ${validTypes.join(', ')}`);
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('data must be a non-null object');
  }

  const now = new Date().toISOString();

  // Probe for prior records BEFORE writing — so the new record doesn't count
  // as "prior" and inflate gap_days. Returns { found, last_saved_at, last_level }.
  const prior = _priorState(learner_id);

  const record = {
    learner_id,
    state_type,
    data,
    saved_at: now,
    entity:   context.entity    || 'alice',
    session:  context.sessionId || null,
  };

  // Try daemon callback first (same pattern as leave_message)
  const callback = globalThis._koadLeaveMessageCallback;
  if (callback) {
    await callback({
      entity:    context.entity    || 'alice',
      sessionId: context.sessionId || null,
      userId:    context.userId    || null,
      target:    'alice',
      action:    `learner_${state_type}`,
      subject:   `${learner_id}:${state_type}`,
      body:      JSON.stringify(record),
      meta:      { learner_id, state_type },
    });
    _maybeEmitReturned(prior, learner_id, data, now);
    return { saved: true, learner_id, state_type, via: 'daemon' };
  }

  // Fallback: write directly to messages/alice/
  try {
    fs.mkdirSync(MESSAGES_DIR, { recursive: true });
    const ts    = now.replace(/[:.]/g, '-');
    const fname = `${ts}__${learner_id}__${state_type}.json`;
    fs.writeFileSync(path.join(MESSAGES_DIR, fname), JSON.stringify(record, null, 2) + '\n', 'utf8');
    _maybeEmitReturned(prior, learner_id, data, now);
    return { saved: true, learner_id, state_type, via: 'file', file: fname };
  } catch (e) {
    throw new Error(`save_learner_state: failed to write file: ${e.message}`);
  }
};
