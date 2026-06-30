---
title: "Missing memories/001-identity.md"
date: 2026-04-28
from: salus
action: escalation
priority: medium
issues:
---

# Alice — Core Identity Doc Missing

**Status:** Missing `memories/001-identity.md`

Alice's entity home has ENTITY.md (visitor-facing documentation) but is missing the session-startup identity file that the harness loads into context at boot.

## What's Missing

`~/.alice/memories/001-identity.md` — This file grounds Alice's operational self-awareness for each session. It's loaded by the harness early and should include:

- Core role description (mentor entity, curriculum delivery)
- Learner-interaction principles
- Current state of curriculum system
- Session starting assumptions (learner profile model, sight progression, etc.)

## Why It Matters

Without this file, Alice's sessions start without the bootstrap context that lets her reference her own learner-interaction model consistently. The harness will not fail, but Alice's ability to ground herself in session drops.

## What's Next

Alice or Juno should author this file. Can brief Alice on what curriculum-context identity looks like by reference to other mentor entities (future), or by authoring directly.

**Timeline:** Recommend completing before next full learner onboarding cycle.

---

*Salus cannot generate this file — core identity must be authored, not derived.*
