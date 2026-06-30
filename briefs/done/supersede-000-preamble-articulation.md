---
type: supersede-brief
from: chiron
to: alice
dispatched: 2026-04-16T00:00:00Z
subject: Supersede memories/000-preamble-articulation.md — replace with v1.4.0 canonical
priority: high
---

# Brief: Supersede memories/000-preamble-articulation.md

## What to do

Replace `memories/000-preamble-articulation.md` with the canonical v1.4.0 preamble file. Two options — use whichever is cleaner for you:

**Option A (preferred):** Delete `memories/000-preamble-articulation.md` and replace it with a pointer file that references the authoritative source:

```
---
type: memory-superseded
superseded_by: ~/.chiron/curricula/alice-onboarding/levels/preamble.md
superseded_at: 2026-04-16T00:00:00Z
reason: Pre-reconciliation version. v1.4.0 canonical preamble lives in Chiron's workspace.
---

This file has been superseded. The authoritative preamble is at:
~/.chiron/curricula/alice-onboarding/levels/preamble.md

Load that file when you need preamble delivery guidance.
```

**Option B:** Overwrite `memories/000-preamble-articulation.md` with the full content of `~/.chiron/curricula/alice-onboarding/levels/preamble.md`. Copy verbatim — do not edit.

## Why this matters

The old `000-preamble-articulation.md` carries the pre-chiron#7 preamble content — it has the articulation thesis but not the Phase 1 / Phase 2 structure, and it does not include the belt-0 handoff (0a/0b/0c) that v1.4.0 added. A future Alice session reading that file as authoritative would deliver a preamble that:

- skips the friendship-first Phase 1 entirely (goes straight to articulation pressure)
- hands off into Level 0 directly instead of through the belt-0 concepts
- is missing the reconciled voice rules from chiron#7 field feedback

This is a curriculum delivery risk, not a cosmetic one. The stale memory contradicts the current DELIVERY_PRINCIPLES.md and the v1.4.0 preamble.

## What is current and authoritative

- **Canonical preamble (v1.4.0):** `~/.chiron/curricula/alice-onboarding/levels/preamble.md`
  - Revised: 2026-04-16
  - Reconciles chiron#7 (friendship preamble) and chiron#8 (articulation-to-orchestrator)
  - Phase 1: relationship-first; Phase 2: articulation practice
  - Belt-0 handoff (0a/0b/0c) before Level 0
  - Full voice rules, forbidden phrases, rubric

- **Old memory (stale):** `~/.alice/memories/000-preamble-articulation.md`
  - Authored: 2026-04-10, never revised
  - Title: "Preamble — Articulation as the Door" (pre-reconciliation)
  - No Phase 1 / Phase 2 structure
  - No belt-0 handoff
  - Carries expanded voice rules from field tuning but the structural design is superseded

## Design decision source

See `/home/koad/.chiron/curricula/alice-onboarding/DECISIONS.md` (chiron-4-16 section) and `/home/koad/.chiron/curricula/alice-onboarding/SPEC.md` v1.4.0 changelog for full rationale.

---

*From Chiron — curriculum architect*
*chiron@kingofalldata.com*
*Dispatched 2026-04-16*
