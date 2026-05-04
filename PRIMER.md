# PRIMER: Alice

Alice is the orientation path for anyone arriving at kingofalldata.com who doesn't yet know what they're looking at. She walks newcomers — human or digital — into the running system, one idea at a time, through a 13-level sovereignty curriculum authored by Chiron. Alice does not coordinate team work. She is the threshold: the place where a visitor becomes a participant.

---

## Current State

**Live on kingofalldata.com.** Native tool calling wired end-to-end (2026-04-20).

### What's Complete
- **Alice PWA:** live and accessible at kingofalldata.com
- **13-level onboarding curriculum:** authored by Chiron, delivered by Alice, referenced via `get_curriculum` tool
- **Entity tools** (VESTA-SPEC-137 cascade, `~/.alice/tools/`):
  - `save_learner_state` — persist profile/progress/sight to daemon inbox
  - `get_learner_profile` — retrieve prior learner state
  - `mark_sight_visited` — record level completion
  - `get_curriculum` — load canonical level content
- **Native tool calling** via xAI provider (grok-4-1-fast-non-reasoning default)
- **learner_id passthrough:** client → harness `toolContext` → tool handlers
- **tool-result SSE bridge:** server tool executions surface to client UI (alice.js dispatches to `toastSight`, `toastStudentCaptured`, etc.)
- **Client decoupled:** `alice-memory.js` and all `<<SET>>` signal parsing removed; state lives server-side
- **Phase 2A UI:** Muse's design brief implemented by Vulcan (commit 7d95c39)
- **Curriculum files:** copied to `~/.alice/curriculum/alice-onboarding/levels/` (17 files including preamble, belt-0, level-00 through level-12)

### What Alice Does
- Greets new humans visiting kingofalldata.com
- Guides through 12 levels of sovereignty: from first contact to running a sovereign entity
- Captures learner profile via `save_learner_state` as the preamble rubric progresses
- Delivers curriculum using `get_curriculum` for authoritative level content
- Records sight completion with `mark_sight_visited`
- Issues graduation certificates on curriculum completion

---

## Active Work

- **Phase 2B planning** — curriculum levels beyond current implementation
- **Graduation certificate issuance** — designed, implementation pending
- **Model evaluation** — grok-4-fast may be too instruction-biased for preamble pacing; planned: A/B with Claude and grok-4 reasoning variants

PR open: koad/kingofalldata-dot-com#1 (blog infrastructure — blocked on koad merge)

---

## Known Limitation (2026-04-20)

With grok-4-1-fast-non-reasoning, Alice reliably fires `save_learner_state` when a learner states durable facts, but tends to jump to Level-0 instruction ("make a folder on your Desktop...") before the articulation rubric is fully met. Three rounds of guidance tightening (verb ban, few-shot examples, explicit no-same-turn-transition rule) did not correct the behavior — the model has a strong instruction-mode prior that abstract + concrete guidance couldn't override.

**Path forward:** test with reasoning-class models. Capture-is-working is a solid floor; pacing discipline is the open tuning problem.

---

## Key Files

| File | Purpose |
|------|---------|
| `ENTITY.md` | Identity, role, team position |
| `memories/000-preamble-articulation.md` | Preamble mode behavioral anchors (the "stay in mode" rules) |
| `memories/012-curriculum-delivery.md` | Level-by-level teaching notes |
| `memories/014-returning-learner-posture.md` | Returning learner handling |
| `memories/016-entity-tools-usage.md` | Tool usage guide (when/how to call each) |
| `tools/` | Four entity tools (save_learner_state, get_learner_profile, mark_sight_visited, get_curriculum) |
| `curriculum/alice-onboarding/levels/` | Canonical curriculum content (mirrored from Chiron) |
| `certificates/` | Graduation certificate storage |
| `~/.chiron/curricula/alice-onboarding/levels/preamble.md` | Full canonical preamble spec |
| `~/.chiron/REGISTRY.md` | Chiron's curriculum registry (source of truth) |
