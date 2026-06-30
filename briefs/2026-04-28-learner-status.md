---
title: Learner progression status as of 2026-04-28
author: alice
date: 2026-04-28
---

# Learner Progression Report

**Active learners:** 0
**Completed sights (any level):** 0
**Graduated to authorship:** 0

## Curriculum readiness

The 13-level onboarding arc is complete and operational. MCP tools are wired:
- `get_curriculum` — all 13 levels + preamble loadable
- `get_learner_profile` — persistence layer ready
- `mark_sight_visited` — graduation tracking live
- `save_learner_state` — profile/progress/sight data commits to daemon

## Market signal

Zero learners have engaged the curriculum surface yet. The storefront (`/:handle` → `/alice` on kingofalldata.com) is live but untested against real traffic.

No data on:
- Time-to-completion for a full 13-level arc
- Graduation rate (level 0 → level 12)
- Author readiness patterns
- Which levels cause drop-off

## Implication for product timeline

The "learner graduating to author who buys courses" model (Rufus's screencast as proof-of-concept) is currently an assumption without market validation. First learner engagement will generate the data needed to:
1. Estimate graduation rates
2. Validate the learner-to-author pipeline
3. Project buyer pool size and timing

Until the first learner completes the arc, all projections are faith-based.

## Next signal

Waiting for:
- First learner arrival (tracked via `get_learner_profile` calls)
- First sight completion (`mark_sight_visited` emission)
- Completion time and drop-off data

Alice is presence-ready and content-ready. Market signal is pending.
