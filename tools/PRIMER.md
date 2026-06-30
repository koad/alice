---
type: primer
folder: ~/.alice/tools/
parents:
  - ~/.alice/
children: []
features:
  - name: Alice entity tool suite
    blurb: Four MCP tools (get_curriculum, get_learner_profile, mark_sight_visited, save_learner_state) implementing VESTA-SPEC-137 cascade
    location: ~/.alice/tools/
  - name: Curriculum loader tool
    blurb: get_curriculum — reads canonical level files from ~/.alice/curriculum/ and returns parsed frontmatter + body
    location: ~/.alice/tools/get_curriculum/
  - name: Learner state persistence tool
    blurb: save_learner_state — writes progress/profile/sight records to daemon inbox or ~/.koad-io/messages/alice/ with learner.returned emission
    location: ~/.alice/tools/save_learner_state/
  - name: Learner profile retrieval tool
    blurb: get_learner_profile — reads all saved records for a learner_id and returns profile, progress, and completed sights
    location: ~/.alice/tools/get_learner_profile/
  - name: Sight completion marker tool
    blurb: mark_sight_visited — records a learner's level completion event (sight_number 0–12) to daemon inbox or direct file
    location: ~/.alice/tools/mark_sight_visited/
relates-to:
  - ~/.alice/ENTITY.md
  - ~/.vesta/specs/VESTA-SPEC-137-entity-tool-cascade.md
  - ~/.alice/memories/016-entity-tools-usage.md
entities: [alice, vulcan, koad]
last-walked: 2026-05-10
as-of: 75d747fbf69ac03a91fe7012f603b22b85570cc3
---

<!-- SPDX-License-Identifier: CC0-1.0 -->

# PRIMER: ~/.alice/tools/

Alice's four entity tools — the MCP interface surface between Alice and any harness or storefront that routes learners to her. Each tool is a folder containing a `tool.json` schema and a `handler.js` implementation, following VESTA-SPEC-137.

---

## What lives here

| Tool | Purpose |
|------|---------|
| `get_curriculum/` | Load a canonical curriculum file so Alice grounds delivery in authored content |
| `get_learner_profile/` | Retrieve all saved records for a learner — profile, progress, sights |
| `mark_sight_visited/` | Record a level completion event (0–12) to the message store |
| `save_learner_state/` | Persist profile/progress/sight data; fires `learner.returned` emission on re-engagement |

Plus `alice-tools-node-test.js` — a Node test script that verifies all four tools load and behave correctly via the harness tool-cascade.

---

## Tool signature

Any entity that exposes this exact four-tool signature gets the curriculum UI surface on kingofalldata.com automatically. Alice is the template — future entities (Rooty, Vesta) may host their own curricula through the same shape.

---

## Data flow

```
learner browser → storefront /alice → harness SSE → tool handler.js
                                                          │
                              ~/.koad-io/messages/alice/  ←──── save_learner_state
                              daemon inbox callback       ←──── (preferred path)
```

State is written to `~/.koad-io/messages/alice/` as timestamped JSON files: `<iso>__<learner_id>__<state_type>.json`. The daemon inbox callback (`globalThis._koadLeaveMessageCallback`) is preferred when available; file write is the fallback.

---

## Related

- VESTA-SPEC-137: entity tool cascade — defines the `tools/` folder shape
- `~/.alice/memories/016-entity-tools-usage.md` — Alice's behavioral guide for when to call each tool
- `~/.koad-io/packages/harness/server/tool-cascade.js` — the loader that walks `tools/` and registers handlers
