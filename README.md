<!-- SPDX-License-Identifier: CC0-1.0 -->

# Alice — the koad:io starting entity

Alice is the entity [koad:io](https://kingofalldata.com) puts in front of every newcomer: a
curriculum mentor who walks learners — human or freshly-gestated digital entity — from first
contact to full fluency, one idea at a time.

This repository is also **the starting shape**. Clone it and it becomes your entity.

---

## What this repo is

A **template**, not a snapshot of a live agent's home directory.

Everything a specific machine or a specific person's identity would put here is absent by
design. There is no `.env`, no `id/`, no `devices/`, no keyring, no trust bonds, no wallet
file, no memories, no briefs, no private curriculum mirror. What ships is the shape: identity
documents, manifest, and a documented `.env.example` to copy.

That is deliberate. An entity's identity is generated **on the device that owns it**:

```bash
git clone https://github.com/koad/alice.git ~/.alice
koad-io init sovereign        # your sovereign identity — do this first
koad-io init alice            # this entity's keypair + this device's leaf
alice                         # launch
```

`init sovereign` creates your master identity and this device's leaf key. `init alice` adopts
the entity: it generates the entity keypair, signs the sigchain entries, scaffolds `.env` if
you have not copied the example, writes the launcher, and builds `AGENTS.md`. Both commands
are idempotent — run them as often as you like.

A clone that skipped those two commands has **no identity at all**, and that is the honest
state to be in. Borrowed keys are worse than no keys.

---

## What's in the box

| File | What it is |
|------|------------|
| `ENTITY.md` | Alice's identity document — role, principles, teaching methodology, behavioral constraints |
| `PRIMER.md` | Orientation for whoever arrives next: an agent, a visitor, you at 3am |
| `README.md` | This file |
| `.env.example` | Every environment variable an entity can set, documented and portable. Copy to `.env` |
| `.gitignore` | Keeps generated identity and runtime state out of git |
| `passenger.json` | The entity manifest — handle, role, buttons, skills (VESTA-SPEC-045) |
| `origins.txt` | Canonical locations for badge referrers |
| `avatar.png` | Alice's face |
| `LICENSE` | AGPL-3.0 |
| `outfit.json` | Visual palette |
| `AGENTS.md` | *(not committed)* generated context cascade — built by `koad-io init alice` |

---

## What Alice does

Alice delivers the koad:io sovereignty curriculum. She does not lecture. She asks the right
question at the right moment and holds the learner's context across sessions. The
relationship is the product.

**Three live feeds, composed per lesson:**

- **Chiron's 13-level intro course** — the on-ramp from zero to *"I can find myself in the kingdom"*
- **Vesta's specs** — each spec is a kata; Alice introduces them as the learner's belt rises
- **Mercury's posts** — the narrative textbook behind each idea

Alice owns none of these feeds. She teaches from them, one idea at a time.

**Discoverable by tool signature.** An entity that exposes `get_curriculum`,
`get_learner_profile`, `mark_sight_visited`, and `save_learner_state` gets the curriculum
surface on kingofalldata.com automatically. Alice is the first implementation of a generalized
pattern, not a special case. (The handlers themselves are runtime tooling and are not part of
this template.)

---

## Making it yours

The interesting edit is `ENTITY.md`. It is the stable personality — the file that travels
with the entity and that every harness loads. Change the name, the role, the principles, and
you have a different entity with the same skeleton.

`PRIMER.md` is the other one worth rewriting immediately: it is the current-state document,
and current state goes stale in days.

---

## Learn more

- **koad:io** — [kingofalldata.com](https://kingofalldata.com)
- **Alice's public profile** — [kingofalldata.com/alice](https://kingofalldata.com/alice)
- **The framework** — [github.com/koad/koad-io](https://github.com/koad/koad-io)
- **Specs** — [github.com/koad/vesta](https://github.com/koad/vesta)

---

*Part of the [koad:io](https://kingofalldata.com) entity ecosystem. See `ENTITY.md` for Alice's
complete identity, teaching methodology, and operational constraints.*
