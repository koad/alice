---
type: primer
folder: ~/.alice/curriculum/
parents:
  - ~/.alice/
children:
  - path: alice-onboarding/
    blurb: Canonical 13-level sovereignty curriculum authored by Chiron; 17 files including preamble, belt-0 layer, and levels 0–12
    status: documented
features:
  - name: Alice onboarding curriculum
    blurb: 13-level sovereignty path from first contact through kingdom building — authored by Chiron, delivered by Alice
    location: ~/.alice/curriculum/alice-onboarding/levels/
  - name: Curriculum preamble mode
    blurb: Friendship-first articulation mode that precedes level delivery — two phases (relationship, then rubric-gated articulation)
    location: ~/.alice/curriculum/alice-onboarding/levels/preamble.md
  - name: Belt-0 foundational concepts
    blurb: Three pre-level concepts (0a: folders are folders, 0b: git is folders+undo, 0c: words are numbers) delivered inline after preamble
    location: ~/.alice/curriculum/alice-onboarding/levels/belt-0a.md
relates-to:
  - ~/.alice/ENTITY.md
  - ~/.chiron/curricula/alice-onboarding/
  - ~/.alice/tools/get_curriculum/
entities: [alice, chiron]
last-walked: 2026-05-10
as-of: 75d747fbf69ac03a91fe7012f603b22b85570cc3
---

<!-- SPDX-License-Identifier: CC0-1.0 -->

# PRIMER: ~/.alice/curriculum/

Alice's local mirror of the canonical curriculum authored by Chiron. Alice does not write curriculum — she teaches from it. This directory holds what she teaches from.

---

## What lives here

```
curriculum/
  12-levels.md                  — reference overview (titles and descriptions)
  alice-onboarding/
    levels/
      preamble.md               — friendship-first articulation mode spec
      belt-0a.md                — foundational concept: folders are folders
      belt-0b.md                — foundational concept: git is folders with undo
      belt-0c.md                — foundational concept: words are numbers but easier to type
      level-00.md               — Level 0: The First File
      level-01.md               — Level 1: First Contact
      level-02.md               — Level 2: What Is an Entity?
      level-03.md               — Level 3: Your Keys Are You
      level-04.md               — Level 4: How Entities Trust Each Other
      level-05.md               — Level 5: Commands and Hooks
      level-06.md               — Level 6: The Daemon and the Kingdom
      level-07.md               — Level 7: Peer Rings
      level-08.md               — Level 8: The Entity Team
      level-09.md               — Level 9: Async Messaging
      level-10.md               — Level 10: Context Bubbles
      level-11.md               — Level 11: Running an Entity
      level-11b-spawn-your-first-seed.md — Level 11 variant: Spawn Your First Seed
      level-12.md               — Level 12: The Commitment
```

The canonical source lives at `~/.chiron/curricula/alice-onboarding/levels/`. These files are copies. When Chiron revises a level, Alice's curriculum mirror needs updating.

---

## Access pattern

Alice accesses curriculum via the `get_curriculum` tool during live sessions:

```
get_curriculum({ level: "preamble" })  → returns parsed frontmatter + body
get_curriculum({ level: "01" })        → "level-01.md"
get_curriculum({ level: "belt-0a" })   → "belt-0a.md"
```

The handler reads from this directory directly (`~/.alice/curriculum/alice-onboarding/levels/`), not from Chiron's canonical source. Both should stay in sync.

---

## Drift risk

Chiron revises curriculum files (e.g., the 2026-04-17 Level 11b addition, the 2026-04-16 preamble revision). Alice's mirror may lag. A drift check against `~/.chiron/curricula/alice-onboarding/` is warranted when Chiron ships a curriculum update.
