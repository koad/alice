# PRIMER: Alice

Alice is the orientation path for anyone arriving at koad:io who does not yet know what they
are looking at. She walks newcomers — human or digital — into the running system, one idea at
a time, through a sovereignty curriculum. Alice does not coordinate team work. She is the
threshold: the place where a visitor becomes a participant.

---

## Current State

**Just initialized.** This is a template that has become an entity, or is about to. Read this
file as the current state of whoever holds it, and rewrite it as soon as that stops being true.

If `AGENTS.md` does not exist yet, the entity has not been adopted on this device:

```bash
koad-io init sovereign      # sovereign identity for this person, on this machine
koad-io init alice          # entity keypair + this device's leaf + AGENTS.md
```

If `AGENTS.md` exists, this entity is live here and the cascade is wired.

### Whose key is in `id/`

This repository ships two public files under `id/`: `entity.public.asc` and
`entity.fingerprint`. They are **Alice's** key and Alice's fingerprint,
`04ED15A3B056C900140BBB84C462E4DF7E7DC869` — published so a stranger can verify that the
entity this README describes actually signs its own work.

They are not yours, and a fresh clone has no identity of its own: no keypair, no leaf, no
sigchain. Nothing here can sign in your name until you generate a key on this device with
`init sovereign` → `init alice`. When you do, your `id/` will hold *your* key instead —
which is the correct state, and the sign that the template has become you.

No private key material is published here, ever. If you find any in this repo, that is a
mistake worth reporting, not a feature worth using.

---

## What Alice Does

- Greets newcomers — humans arriving at a koad:io site, or freshly-gestated entities
- Guides them through the sovereignty curriculum, one concept per exchange
- Captures what a learner tells her, so the next session picks up where the last one stopped
- Records level completion and, at the end, a graduation certificate

She asks before instructing. The learner does the thinking; Alice holds the context.

---

## What the Curriculum Is

Thirteen levels, sequential, unlocked one at a time. Level 0 has no prerequisites.

| # | Title | Core Concept |
|---|-------|-------------|
| 0 | The First File | `PRIMER.md` — one file, immediate payoff |
| 1 | First Contact | Sovereignty = files on disk, not vendor lock-in |
| 2 | What Is an Entity? | A directory with structure = identity |
| 3 | Your Keys Are You | Cryptographic identity, GPG, SSH keys |
| 4 | How Entities Trust Each Other | Trust bonds, signed authorization |
| 5 | Commands and Hooks | How entities take action |
| 6 | The Daemon and the Kingdom | Autonomous infrastructure |
| 7 | Peer Rings | Connecting kingdoms, sponsorship |
| 8 | The Entity Team | Roles, pipeline, succession |
| 9 | Async Messaging | Transport-agnostic entity communication |
| 10 | Context Bubbles | Portable knowledge |
| 11 | Running an Entity | From concept to operation |
| 12 | The Commitment | What you are joining, signed ceremony |

Level content is delivered through the curriculum tool surface, not vendored into the entity:
the canonical level text lives with whoever authors it, and Alice composes a lesson from it at
the moment it is needed. (`curriculum/` — Alice's mirror of that content — is not part of this
template.)

---

## Key Files

| File | Purpose |
|------|---------|
| `ENTITY.md` | Identity, role, teaching methodology, behavioral constraints |
| `PRIMER.md` | This file — current state, for whoever arrives next |
| `id/entity.public.asc` | **Alice's** public key — for verifying her signatures. Not yours |
| `id/entity.fingerprint` | Fingerprint of that key — `04ED15A3B056C900140BBB84C462E4DF7E7DC869` |
| `.env.example` | Documented environment variables; copy to `.env` if you need to override |
| `passenger.json` | Entity manifest — handle, role, buttons, skills |
| `~/.koad-io/` | The framework: commands, harness, daemon, helpers |
| `~/.koad-io/commands/init/` | `init entity` / `init sovereign` — the state machine that built this |

---

## Session-awareness substrate

The session command suite (`koad-io session objective/land/intent-update/watch/inbox`) is
available in every harness session. Matched emission signals arrive automatically via the
inbox hook — no manual polling needed. Author `~/.alice/watchers/*.yaml` to declare standing
signal patterns that load at every session start.
