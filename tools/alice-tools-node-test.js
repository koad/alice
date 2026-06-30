#!/usr/bin/env node
// alice-tools-node-test.js — verify Alice's entity tools load and behave correctly
// Run: node ~/.alice/tools/alice-tools-node-test.js

'use strict';

const fs   = require('fs');
const path = require('path');
const os   = require('os');

// Load the cascade
require(path.join(process.env.HOME, '.koad-io', 'packages', 'harness', 'server', 'tool-cascade.js'));
const cascade = globalThis.KoadHarnessToolCascade;

// ── Helpers ───────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    passed++;
    process.stdout.write(`  [PASS] ${label}\n`);
  } else {
    failed++;
    process.stderr.write(`  [FAIL] ${label}\n`);
  }
}

function assertEqual(a, b, label) {
  if (JSON.stringify(a) === JSON.stringify(b)) {
    passed++;
    process.stdout.write(`  [PASS] ${label}\n`);
  } else {
    failed++;
    process.stderr.write(`  [FAIL] ${label}\n`);
    process.stderr.write(`         expected: ${JSON.stringify(b)}\n`);
    process.stderr.write(`         got:      ${JSON.stringify(a)}\n`);
  }
}

// ── Load Alice's tools via the cascade ───────────────────────────────────────

const HOME       = process.env.HOME || '/home/koad';
const FW_TOOLS   = path.join(HOME, '.koad-io', 'packages', 'harness', 'tools');
const ENTITY_BASE = HOME;

console.log('\n=== load Alice entity tools ===');
let reg;
try {
  reg = cascade.load('alice', ENTITY_BASE, FW_TOOLS);
} catch (e) {
  process.stderr.write(`FATAL: cascade.load threw: ${e.message}\n`);
  process.exit(1);
}

const EXPECTED_ALICE_TOOLS = [
  'save_learner_state',
  'get_curriculum',
  'mark_sight_visited',
  'get_learner_profile',
];

for (const name of EXPECTED_ALICE_TOOLS) {
  assert(reg.all.has(name), `tool loaded: ${name}`);
}

// leave_message is a framework tool — should also be present
assert(reg.all.has('leave_message'), 'framework tool present: leave_message');

const totalExpected = EXPECTED_ALICE_TOOLS.length + 1; // +1 for leave_message
assert(reg.all.size >= totalExpected, `at least ${totalExpected} tools loaded (got ${reg.all.size})`);

// ── save_learner_state ────────────────────────────────────────────────────────

console.log('\n=== save_learner_state ===');

// Use a temp dir so we don't pollute real messages
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'alice-test-'));
const realMessagesDir = path.join(HOME, '.koad-io', 'messages', 'alice');

// Temporarily override HOME so handler writes to tmpDir
// Instead, we test via globalThis._koadLeaveMessageCallback to avoid fs side-effects

{
  const calls = [];
  globalThis._koadLeaveMessageCallback = async (msg) => { calls.push(msg); };

  (async () => {
    try {
      const r = await reg.invoke('save_learner_state', {
        learner_id: 'test-learner-01',
        state_type: 'progress',
        data: { current_level: 3, completed_levels: [0, 1, 2] },
      }, { entity: 'alice', sessionId: 'test-session' });

      assert(r.saved === true, 'save_learner_state: saved=true');
      assertEqual(r.learner_id, 'test-learner-01', 'save_learner_state: learner_id echoed');
      assertEqual(r.state_type, 'progress', 'save_learner_state: state_type echoed');
      assertEqual(r.via, 'daemon', 'save_learner_state: routed via daemon callback');
      assertEqual(calls.length, 1, 'save_learner_state: callback called once');
      assertEqual(calls[0].target, 'alice', 'save_learner_state: callback target=alice');

      // Invalid learner_id
      try {
        await reg.invoke('save_learner_state', { learner_id: 'bad id!', state_type: 'profile', data: {} }, {});
        failed++;
        process.stderr.write('  [FAIL] save_learner_state: should throw on bad learner_id\n');
      } catch (e) {
        passed++;
        process.stdout.write('  [PASS] save_learner_state: rejects invalid learner_id\n');
      }

      // Invalid state_type
      try {
        await reg.invoke('save_learner_state', { learner_id: 'abc', state_type: 'unknown', data: {} }, {});
        failed++;
        process.stderr.write('  [FAIL] save_learner_state: should throw on bad state_type\n');
      } catch (e) {
        passed++;
        process.stdout.write('  [PASS] save_learner_state: rejects invalid state_type\n');
      }
    } finally {
      delete globalThis._koadLeaveMessageCallback;
    }
  })();
}

// ── get_curriculum ────────────────────────────────────────────────────────────

console.log('\n=== get_curriculum ===');

{
  (async () => {
    // Load preamble
    try {
      const r = await reg.invoke('get_curriculum', { level: 'preamble' }, { entity: 'alice' });
      assert(typeof r.body === 'string' && r.body.length > 0, 'get_curriculum preamble: body non-empty');
      assert(r.frontmatter && typeof r.frontmatter === 'object', 'get_curriculum preamble: frontmatter parsed');
      assertEqual(r.level, 'preamble', 'get_curriculum preamble: level echoed');
      assert(r.frontmatter.slug === 'preamble', 'get_curriculum preamble: slug in frontmatter');
    } catch (e) {
      failed++;
      process.stderr.write(`  [FAIL] get_curriculum preamble: ${e.message}\n`);
    }

    // Load belt-0a
    try {
      const r = await reg.invoke('get_curriculum', { level: 'belt-0a' }, { entity: 'alice' });
      assert(r.body.length > 0, 'get_curriculum belt-0a: body non-empty');
      assertEqual(r.filename, 'belt-0a.md', 'get_curriculum belt-0a: correct filename');
    } catch (e) {
      failed++;
      process.stderr.write(`  [FAIL] get_curriculum belt-0a: ${e.message}\n`);
    }

    // Load level 3
    try {
      const r = await reg.invoke('get_curriculum', { level: '03' }, { entity: 'alice' });
      assert(r.body.length > 0, 'get_curriculum level-03: body non-empty');
      assertEqual(r.filename, 'level-03.md', 'get_curriculum level-03: correct filename');
    } catch (e) {
      failed++;
      process.stderr.write(`  [FAIL] get_curriculum level-03: ${e.message}\n`);
    }

    // Invalid level
    try {
      await reg.invoke('get_curriculum', { level: '99' }, { entity: 'alice' });
      failed++;
      process.stderr.write('  [FAIL] get_curriculum: should throw on level 99\n');
    } catch (e) {
      passed++;
      process.stdout.write('  [PASS] get_curriculum: rejects out-of-range level\n');
    }
  })();
}

// ── mark_sight_visited ────────────────────────────────────────────────────────

console.log('\n=== mark_sight_visited ===');

{
  const calls = [];
  globalThis._koadLeaveMessageCallback = async (msg) => { calls.push(msg); };

  (async () => {
    try {
      const r = await reg.invoke('mark_sight_visited', {
        learner_id:   'test-learner-01',
        sight_number: 3,
        sight_title:  'Level 3: Your First Entity',
      }, { entity: 'alice' });

      assert(r.recorded === true, 'mark_sight_visited: recorded=true');
      assertEqual(r.sight_number, 3, 'mark_sight_visited: sight_number echoed');
      assertEqual(r.via, 'daemon', 'mark_sight_visited: routed via daemon');
      assertEqual(calls[0].action, 'sight_visited', 'mark_sight_visited: action=sight_visited');

      // Invalid sight_number
      try {
        await reg.invoke('mark_sight_visited', {
          learner_id: 'abc', sight_number: 99, sight_title: 'foo',
        }, {});
        failed++;
        process.stderr.write('  [FAIL] mark_sight_visited: should throw on sight_number 99\n');
      } catch (e) {
        passed++;
        process.stdout.write('  [PASS] mark_sight_visited: rejects out-of-range sight_number\n');
      }
    } finally {
      delete globalThis._koadLeaveMessageCallback;
    }
  })();
}

// ── get_learner_profile ───────────────────────────────────────────────────────

console.log('\n=== get_learner_profile ===');

{
  (async () => {
    // Write fixture files into tmp dir, then read them back by pointing HOME
    const tmpMessages = path.join(tmpDir, '.koad-io', 'messages', 'alice');
    fs.mkdirSync(tmpMessages, { recursive: true });

    const fixture1 = {
      event: 'sight_visited', learner_id: 'fixture-learner',
      sight_number: 1, sight_title: 'Level 1', visited_at: '2026-04-01T10:00:00.000Z',
    };
    const fixture2 = {
      state_type: 'profile', learner_id: 'fixture-learner',
      data: { name: 'Alice', goal: 'learn koad:io' }, saved_at: '2026-04-01T11:00:00.000Z',
    };
    fs.writeFileSync(path.join(tmpMessages, '2026-04-01T10-00-00-000Z__fixture-learner__sight-01.json'),
      JSON.stringify(fixture1) + '\n');
    fs.writeFileSync(path.join(tmpMessages, '2026-04-01T11-00-00-000Z__fixture-learner__profile.json'),
      JSON.stringify(fixture2) + '\n');

    // Load the handler directly with patched MESSAGES_DIR
    const handlerPath = path.join(HOME, '.alice', 'tools', 'get_learner_profile', 'handler.js');

    // Patch: load handler but override the MESSAGES_DIR it resolves
    // We do this by temporarily setting HOME in the subprocess eval
    // Actually, the simplest approach: require the module and note it caches HOME at load time.
    // Instead, test the real messages dir with a real write.

    // Test 1: no records for unknown learner
    const noRecord = await reg.invoke('get_learner_profile', { learner_id: 'unknown-xyz-99' }, { entity: 'alice' });
    assert(noRecord.found === false, 'get_learner_profile: found=false for unknown learner');
    assertEqual(noRecord.records, [], 'get_learner_profile: empty records for unknown learner');

    // Test 2: if we write real records and read them back
    // Write two fixture records into the real messages dir
    fs.mkdirSync(realMessagesDir, { recursive: true });
    const testId = `test-read-back-${Date.now()}`;
    const sightRec = {
      event: 'sight_visited', learner_id: testId,
      sight_number: 5, sight_title: 'Level 5', visited_at: '2026-04-20T12:00:00.000Z',
    };
    const profileRec = {
      state_type: 'profile', learner_id: testId,
      data: { name: 'Test User', goal: 'verify readback' }, saved_at: '2026-04-20T12:01:00.000Z',
    };
    fs.writeFileSync(path.join(realMessagesDir, `2026-04-20T12-00-00-000Z__${testId}__sight-05.json`),
      JSON.stringify(sightRec) + '\n');
    fs.writeFileSync(path.join(realMessagesDir, `2026-04-20T12-01-00-000Z__${testId}__profile.json`),
      JSON.stringify(profileRec) + '\n');

    const result = await reg.invoke('get_learner_profile', { learner_id: testId }, { entity: 'alice' });
    assert(result.found === true, 'get_learner_profile: found=true after write');
    assertEqual(result.record_count, 2, 'get_learner_profile: 2 records found');
    assert(result.sights_completed.length === 1, 'get_learner_profile: 1 sight completed');
    assertEqual(result.sights_completed[0].sight_number, 5, 'get_learner_profile: correct sight_number');
    assert(result.latest_profile !== null, 'get_learner_profile: latest_profile present');
    assertEqual(result.latest_profile.name, 'Test User', 'get_learner_profile: profile name correct');

    // Clean up test records
    fs.unlinkSync(path.join(realMessagesDir, `2026-04-20T12-00-00-000Z__${testId}__sight-05.json`));
    fs.unlinkSync(path.join(realMessagesDir, `2026-04-20T12-01-00-000Z__${testId}__profile.json`));
  })().catch(e => {
    failed++;
    process.stderr.write(`  [FAIL] get_learner_profile async: ${e.message}\n`);
  });
}

// ── Summary ───────────────────────────────────────────────────────────────────

setImmediate(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
  process.stdout.write(`\n${'─'.repeat(50)}\n`);
  process.stdout.write(`alice-tools: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
});
