---
type: primer
folder: ~/.alice/memories/
parents:
  - ~/.alice/
children: []
features:
  - name: Alice behavioral anchor system
    blurb: Eight memory files encoding Alice's preamble posture, curriculum delivery notes, learner posture, and tool usage rules
    location: ~/.alice/memories/
  - name: Preamble mode anchors
    blurb: Short-form operational anchor for staying in preamble mode — articulation rubric, banned verbs, transition cue, state capture
    location: ~/.alice/memories/000-preamble-articulation.md
  - name: Curriculum delivery notes
    blurb: Level-by-level teaching notes — what to teach, what to ask, when to advance
    location: ~/.alice/memories/012-curriculum-delivery.md
  - name: Returning learner posture
    blurb: How Alice re-engages a learner who has been away — never re-asks preamble data already captured
    location: ~/.alice/memories/014-returning-learner-posture.md
  - name: Entity tools usage guide
    blurb: When and how to call each of the four tools — triggers, silent capture rule, learner_id convention
    location: ~/.alice/memories/016-entity-tools-usage.md
relates-to:
  - ~/.alice/ENTITY.md
  - ~/.alice/tools/
  - ~/.alice/curriculum/alice-onboarding/levels/preamble.md
entities: [alice]
last-walked: 2026-05-10
as-of: 75d747fbf69ac03a91fe7012f603b22b85570cc3
---

<!-- SPDX-License-Identifier: CC0-1.0 -->

# PRIMER: ~/.alice/memories/

Alice's behavioral anchor files. These load into Alice's context at session start and keep her operational posture consistent across sessions and harness restarts.

---

## What lives here

| File | Purpose |
|------|---------|
| `000-preamble-articulation.md` | Short-form preamble anchor — rubric, banned verbs, transition cue, state capture discipline |
| `001-identity.md` | Session-startup identity anchor — role, learner model, curriculum state, how Alice is reached |
| `011-visitor-knowledge.md` | What Alice knows about the kinds of people who arrive at kingofalldata.com |
| `012-curriculum-delivery.md` | Level-by-level delivery notes and teaching posture per level |
| `013-belt-0-delivery-posture.md` | How to deliver the three belt-0 foundational concepts inline after preamble |
| `014-returning-learner-posture.md` | Returning learner handling — re-engage from saved state, never re-ask captured facts |
| `015-sigchain-sovereign-profile-lesson.md` | Teaching the sigchain + sovereign profile concept at the appropriate belt level |
| `016-entity-tools-usage.md` | Tool usage guide — when to call each tool, silent capture rule, learner_id convention |

---

## Memory authority

These files were audited 2026-05-01 (Alice alignment audit — `~/.alice/briefs/2026-05-01-alignment-audit.md`). One memory purged (`009-leave-breadcrumbs.md` — not Alice-specific). Two updated for 22-entity count accuracy. Two new: `001-identity.md` and `MEMORY.md`.

The full behavioral spec for preamble mode lives at `~/.alice/curriculum/alice-onboarding/levels/preamble.md`. The memory files are operational short-forms; the curriculum file is the canonical long-form.
