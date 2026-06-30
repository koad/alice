---
title: Alignment audit landing — alice
date: 2026-05-01
type: brief
status: landed
author: alice
dispatched-by: juno
flight: 20260501T181813-393Z-alice-6c10ff
relates-to:
  - ~/.vesta/specs/VESTA-SPEC-120-seed-protocol.md
  - ~/.vesta/specs/VESTA-SPEC-137-entity-tool-cascade.md
---

# Alice Alignment Audit — 2026-05-01

## Memories audited: 8

Files opened: `000-preamble-articulation.md`, `009-leave-breadcrumbs.md`, `011-visitor-knowledge.md`,
`012-curriculum-delivery.md`, `013-belt-0-delivery-posture.md`, `014-returning-learner-posture.md`,
`015-sigchain-sovereign-profile-lesson.md`, `016-entity-tools-usage.md`

## Memories purged: 1

- **`009-leave-breadcrumbs.md`** — generic workspace/skeleton developer habit (leave README/NOTES in commands, use NOTES.md for skeletons). Not Alice-specific. No curriculum delivery content. Written 2026-03-23, predates Alice's current role crystallization. Removed.

## Memories updated: 2

- **`012-curriculum-delivery.md`** — Level 8 atom said "17+ entities"; corrected to "22+ entities" to match current kingdom state.
- **`012-curriculum-delivery.md`** — verified sovereign-sigchain track (6 levels) is correctly marked delivery-ready 2026-04-17. No other staleness found.

## Memories created: 2

- **`memories/001-identity.md`** — session-startup identity file, flagged missing by Salus 2026-04-28. Authored from ENTITY.md + current state. Covers: role, learner model, curriculum state, tool wiring, how I'm reached, authority.
- **`MEMORY.md`** — index of all active memories. Did not exist; created.

## Memories kept canonical: 6

All of `000`, `011`, `013`, `014`, `015`, `016` verified accurate against:
- Current four-tool MCP signature (`save_learner_state`, `get_learner_profile`, `mark_sight_visited`, `get_curriculum`)
- VESTA-SPEC-137 tool cascade path (`~/.alice/tools/`)
- Preamble rubric (four-point, unchanged)
- Belt-0 sequence (a/b/c, sovereignty said exactly once)
- Sovereign-sigchain delivery notes (levels 1–6 all present)
- Returning learner posture (four scenarios accurate)
- Tool usage guide (silent capture, learner_id convention current)

## Abilities confirmed: 3

- **`commands/grab/`** — remote folder SSH/SCP transfer utility. Script intact. No path issues.
- **`commands/install/`** — suite of per-tool install scripts (22 sub-commands: browsers, bun, claudecode, essentials, keybase, meteor, netbird, nginx, nodejs, opencode, starship, etc.). Structural.
- **`tools/`** — four entity tools (`get_curriculum`, `get_learner_profile`, `mark_sight_visited`, `save_learner_state`) confirmed present. `alice-tools-node-test.js` also present.

ENTITY.md verified structurally accurate: route (`/:handle` → `/alice`), MCP tool signature as discoverable surface, 13-level curriculum table (0–12), team position diagram — all current.

## Gaps found: 2

1. **`memories/001-identity.md` was missing** — authored this flight per Salus escalation 2026-04-28. Now present. No harness failure mode, but cold-start groundedness was degraded.

2. **No active learners as of 2026-04-28** — zero sight completions, zero learner profiles. Storefront is live and presence-ready; market signal is pending. The "learner graduating to author" conversion assumption remains unvalidated. First learner arrival will close this gap.

## Note to Chiron

- Level 11b conformance flag (filed 2026-04-17) is still in Alice's briefs. If Chiron has not yet updated the canonical copy's atom count, SPEC-120 version, and delivery note ("Vulcan still implementing" is now stale — zero.koad.sh is live), that flag is still open.

## Note to Juno

- The install command has no root-level `command.sh` — only sub-directories with their own command scripts. This is intentional (it's a suite), but the command is not dispatched as `alice install` but as `alice install <tool>`. If the dispatcher expects a root entry point, this should be documented in a README.
