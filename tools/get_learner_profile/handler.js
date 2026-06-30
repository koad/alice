// get_learner_profile/handler.js — retrieve a learner's saved profile and progress
//
// Scans ~/.koad-io/messages/alice/ for JSON files matching the learner_id and
// returns all records sorted by timestamp. The tool runs server-side and reads
// the filesystem directly (no Meteor globals needed).
//
// params  = { learner_id }
// context = { entity, sessionId, userId, settings }

'use strict';

const fs   = require('fs');
const path = require('path');

const VALID_LEARNER_RE = /^[a-zA-Z0-9_.\-]+$/;
const MESSAGES_DIR = path.join(process.env.HOME || '/home/koad', '.koad-io', 'messages', 'alice');

module.exports = async function getLearnerProfileHandler(params, context) {
  // Defensive fallback: if the LLM omitted learner_id but the harness injected
  // it into toolContext (from the client's POST body), use that value.
  const learner_id = params.learner_id || (context && context.learnerId) || null;

  // Validate
  if (!learner_id || typeof learner_id !== 'string' || learner_id.length > 64) {
    throw new Error('learner_id must be a non-empty string, max 64 chars');
  }
  if (!VALID_LEARNER_RE.test(learner_id)) {
    throw new Error('learner_id may only contain alphanumeric chars, hyphens, underscores, and dots');
  }

  // Messages dir may not exist yet if no state has been saved
  if (!fs.existsSync(MESSAGES_DIR)) {
    return {
      learner_id,
      found:   false,
      records: [],
      message: 'No learner records found — messages directory does not exist yet.',
    };
  }

  let filenames;
  try {
    filenames = fs.readdirSync(MESSAGES_DIR);
  } catch (e) {
    throw new Error(`get_learner_profile: failed to read messages directory: ${e.message}`);
  }

  // Filter to files containing the learner_id token (double-underscore delimited)
  // File naming convention: <timestamp>__<learner_id>__<state_type>.json
  const escapedId  = learner_id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matchRe    = new RegExp(`__${escapedId}__`);
  const matching   = filenames.filter(f => f.endsWith('.json') && matchRe.test(f));

  if (matching.length === 0) {
    return {
      learner_id,
      found:   false,
      records: [],
      message: `No records found for learner "${learner_id}".`,
    };
  }

  // Parse each file, skip unreadable/malformed ones
  const records = [];
  for (const fname of matching) {
    const fpath = path.join(MESSAGES_DIR, fname);
    try {
      const raw  = fs.readFileSync(fpath, 'utf8');
      const data = JSON.parse(raw);
      records.push(data);
    } catch (e) {
      // Skip malformed files silently — log to stderr for debugging
      process.stderr.write(`[get_learner_profile] skipping ${fname}: ${e.message}\n`);
    }
  }

  // Sort by saved_at / visited_at ascending
  records.sort((a, b) => {
    const ta = a.saved_at || a.visited_at || '';
    const tb = b.saved_at || b.visited_at || '';
    return ta < tb ? -1 : ta > tb ? 1 : 0;
  });

  // Summarize: which sights completed, latest profile, current level
  const sightsCompleted = records
    .filter(r => r.event === 'sight_visited')
    .map(r => ({ sight_number: r.sight_number, sight_title: r.sight_title, visited_at: r.visited_at }));

  const profileRecords = records.filter(r => r.state_type === 'profile');
  const latestProfile  = profileRecords.length > 0 ? profileRecords[profileRecords.length - 1].data : null;

  const progressRecords = records.filter(r => r.state_type === 'progress');
  const latestProgress  = progressRecords.length > 0 ? progressRecords[progressRecords.length - 1].data : null;

  return {
    learner_id,
    found:           true,
    record_count:    records.length,
    sights_completed: sightsCompleted,
    latest_profile:  latestProfile,
    latest_progress: latestProgress,
    all_records:     records,
  };
};
