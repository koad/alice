// mark_sight_visited/handler.js — record a learner's sight (level) completion
//
// Writes a completion event to the Alice message store (daemon inbox or direct file).
// Delegates to the same _koadLeaveMessageCallback pattern as leave_message when
// the daemon is available; falls back to direct file write otherwise.
//
// params  = { learner_id, sight_number, sight_title }
// context = { entity, sessionId, userId, settings }

'use strict';

const fs   = require('fs');
const path = require('path');

const VALID_LEARNER_RE = /^[a-zA-Z0-9_.\-]+$/;
const MESSAGES_DIR = path.join(process.env.HOME || '/home/koad', '.koad-io', 'messages', 'alice');

module.exports = async function markSightVisitedHandler(params, context) {
  // Defensive fallback: if the LLM omitted learner_id but the harness injected
  // it into toolContext (from the client's POST body), use that value.
  const { sight_number, sight_title } = params;
  const learner_id = params.learner_id || (context && context.learnerId) || null;

  // Validate
  if (!learner_id || typeof learner_id !== 'string' || learner_id.length > 64) {
    throw new Error('learner_id must be a non-empty string, max 64 chars');
  }
  if (!VALID_LEARNER_RE.test(learner_id)) {
    throw new Error('learner_id may only contain alphanumeric chars, hyphens, underscores, and dots');
  }

  const num = sight_number;
  if (typeof num !== 'number' || !Number.isInteger(num) || num < 0 || num > 12) {
    throw new Error('sight_number must be an integer 0–12');
  }

  if (!sight_title || typeof sight_title !== 'string' || sight_title.trim().length === 0) {
    throw new Error('sight_title must be a non-empty string');
  }
  if (sight_title.length > 200) {
    throw new Error('sight_title must be 200 chars or fewer');
  }

  const now = new Date().toISOString();
  const record = {
    event:        'sight_visited',
    learner_id,
    sight_number: num,
    sight_title:  sight_title.trim(),
    visited_at:   now,
    entity:       context.entity    || 'alice',
    session:      context.sessionId || null,
  };

  // Try daemon callback first
  const callback = globalThis._koadLeaveMessageCallback;
  if (callback) {
    await callback({
      entity:    context.entity    || 'alice',
      sessionId: context.sessionId || null,
      userId:    context.userId    || null,
      target:    'alice',
      action:    'sight_visited',
      subject:   `${learner_id}:sight-${num}`,
      body:      JSON.stringify(record),
      meta:      { learner_id, sight_number: num },
    });
    return { recorded: true, learner_id, sight_number: num, sight_title: sight_title.trim(), via: 'daemon' };
  }

  // Fallback: direct file write
  try {
    fs.mkdirSync(MESSAGES_DIR, { recursive: true });
    const ts    = now.replace(/[:.]/g, '-');
    const fname = `${ts}__${learner_id}__sight-${String(num).padStart(2, '0')}.json`;
    fs.writeFileSync(path.join(MESSAGES_DIR, fname), JSON.stringify(record, null, 2) + '\n', 'utf8');
    return { recorded: true, learner_id, sight_number: num, sight_title: sight_title.trim(), via: 'file', file: fname };
  } catch (e) {
    throw new Error(`mark_sight_visited: failed to write file: ${e.message}`);
  }
};
