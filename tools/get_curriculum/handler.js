// get_curriculum/handler.js — read a curriculum file from ~/.alice/curriculum/
//
// Parses YAML frontmatter and returns the content so Alice can reference
// authored material during conversation rather than improvising.
//
// params  = { level }
// context = { entity, sessionId, userId, settings }

'use strict';

const fs   = require('fs');
const path = require('path');

// Curriculum root: ~/.alice/curriculum/alice-onboarding/levels/
const CURRICULUM_BASE = path.join(
  process.env.HOME || '/home/koad',
  '.alice', 'curriculum', 'alice-onboarding', 'levels'
);

// Map level param → filename
function levelToFilename(level) {
  if (level === 'preamble') return 'preamble.md';
  if (level.startsWith('belt-')) return `${level}.md`;
  // Numeric levels: "3" → "level-03.md", "03" → "level-03.md"
  const num = parseInt(level, 10);
  if (!isNaN(num) && num >= 0 && num <= 12) {
    return `level-${String(num).padStart(2, '0')}.md`;
  }
  return null;
}

// Minimal YAML frontmatter parser (handles string, number, boolean, array values).
// Returns { frontmatter: {}, body: '' }
function parseFrontmatter(text) {
  const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = FM_RE.exec(text);
  if (!match) return { frontmatter: {}, body: text };

  const fmLines = match[1].split('\n');
  const body    = match[2];
  const fm      = {};

  for (const line of fmLines) {
    // Skip blank lines and comments
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const colonIdx = line.indexOf(':');
    if (colonIdx < 0) continue;

    const key   = line.slice(0, colonIdx).trim();
    let   value = line.slice(colonIdx + 1).trim();

    // Strip inline comment
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Boolean
    if (value === 'true')  { fm[key] = true; continue; }
    if (value === 'false') { fm[key] = false; continue; }
    if (value === 'null' || value === '~') { fm[key] = null; continue; }

    // Empty array
    if (value === '[]') { fm[key] = []; continue; }

    // Number
    if (value !== '' && !isNaN(Number(value))) { fm[key] = Number(value); continue; }

    fm[key] = value;
  }

  return { frontmatter: fm, body };
}

module.exports = async function getCurriculumHandler(params, context) {
  const { level } = params;

  const filename = levelToFilename(level);
  if (!filename) {
    throw new Error(`invalid level: "${level}" — use 'preamble', 'belt-0a', 'belt-0b', 'belt-0c', or '00' through '12'`);
  }

  const filepath = path.join(CURRICULUM_BASE, filename);

  if (!fs.existsSync(filepath)) {
    throw new Error(`curriculum file not found: ${filepath} — curriculum may need to be copied to ~/.alice/curriculum/`);
  }

  let text;
  try {
    text = fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    throw new Error(`get_curriculum: failed to read ${filename}: ${e.message}`);
  }

  const { frontmatter, body } = parseFrontmatter(text);

  return {
    level,
    filename,
    frontmatter,
    body,
    char_count: text.length,
  };
};
