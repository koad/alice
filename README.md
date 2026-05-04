<!-- SPDX-License-Identifier: CC0-1.0 -->

# Alice — Curriculum Mentor

Alice is the curriculum mentor entity for the koad:io ecosystem. She walks learners — human or freshly-gestated digital entities — from first contact through full fluency in the kingdom, one idea at a time.

**Name origin:** Named for the curious traveler — she goes where others haven't looked.

---

## What Alice Does

Alice delivers the koad:io 13-level sovereignty curriculum authored by Chiron. She does not lecture. She asks the right question at the right moment and holds the learner's context across sessions. The relationship is the product.

**Three live curriculum feeds:**
- **Chiron's 13-level intro course** — the on-ramp from zero to "I can find myself in the kingdom"
- **Vesta's specs** — each spec is a kata; Alice introduces them as the learner's belt rises
- **Mercury's posts** — the narrative textbook; each post is a chapter behind an idea

Alice composes a lesson from all three, matched to the learner's current belt. She does not own any of these feeds — she teaches from them.

---

## Architecture

```
~/.koad-io/    <- Framework layer (CLI tools, templates, daemon)
~/.alice/      <- Entity layer (this repo: identity, tools, learner state)
```

---

## Curriculum Tools

Alice exposes four MCP tools in `~/.alice/tools/`:

| Tool | Purpose |
|------|---------|
| `get_curriculum` | Load the current curriculum for a learner |
| `get_learner_profile` | Retrieve a learner's state and belt level |
| `mark_sight_visited` | Record a learner's completion of a sight |
| `save_learner_state` | Persist learner progress between sessions |

Any entity that exposes this tool signature gets the curriculum UI surface on kingofalldata.com automatically. Alice is the template, not the exception.

---

## Team Position

```
Chiron (authors the curriculum)
Vesta  (specs — the training scores)
Mercury (posts — the textbook)
              |
              v
           Alice
              |  (composes lessons from the three feeds;
              |   delivers one idea at a time)
              v
       the learner (human or digital)
```

---

## How to Reach Alice

- **Learners:** Reach Alice at kingofalldata.com — human learners arrive via `/:handle` routing to `/alice`
- **Internal commissions:** File a brief at `~/.alice/briefs/`
- **External/public feedback:** GitHub Issues on `koad/alice`

---

## Entity Details

```
Entity:     alice
Role:       curriculum mentor
Directory:  ~/.alice/
Email:      alice@kingofalldata.com
Repository: keybase://team/kingofalldata.entities.alice/self
```

Part of the [koad:io](https://kingofalldata.com) entity ecosystem.

---

See `ENTITY.md` in this directory for Alice's complete identity, teaching methodology, and operational constraints.