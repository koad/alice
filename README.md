<!-- SPDX-License-Identifier: CC0-1.0 -->

# Alice — the koad:io starting entity

Alice is the entity [koad:io](https://kingofalldata.com) puts in front of every newcomer: a
curriculum mentor who walks learners — human or freshly-gestated digital entity — from first
contact to full fluency, one idea at a time.

This repository is also **the starting shape**. Clone it and it becomes your entity.

It wears two hats at once, and it is worth naming both up front: it is a **template** you
clone, and it is also **Alice's face** on the open web. The files that make it a face are two,
they are public, and everything else here is still shape.

---

## What this repo is

A **template**, not a snapshot of a live agent's home directory.

What is absent by design: no `.env`, no keyring, no `devices/`, no trust bonds, no wallet
file, no memories, no briefs, no private curriculum mirror, and no private key material of
any kind. What ships is the shape — identity documents, a manifest, and a documented
`.env.example` to copy.

What *is* here, deliberately, is Alice's **public** identity: her OpenPGP public key and its
fingerprint, under `id/`. That is not an oversight in a template; it is the point. It lets
anyone holding this repository confirm that the entity described in this README is a real,
verifiable thing that signs its own work:

```bash
git clone --depth 1 https://github.com/koad/alice.git && cd alice
export GNUPGHOME=$(mktemp -d)     # a throwaway keyring — your own stays untouched
gpg --import id/entity.public.asc
gpg --fingerprint 04ED15A3B056C900140BBB84C462E4DF7E7DC869
#   pub   ed25519 2026-06-26 [SC]
#         04ED 15A3 B056 C900 140B  BB84 C462 E4DF 7E7D C869
#   uid           alice @ kingofalldata
```

A public key is a signature-verification instrument. It opens nothing and grants nothing —
it only lets you check that a signature came from Alice. Publishing it costs nothing and
buys the only thing that matters here: you can tell a real copy of this repo from a story
about one.

The fingerprint above is Alice's key. **It is not your key**, and it is the one piece of
identity material here that you should leave exactly where it is.

Everything else in the way of identity is generated **on the device that owns it**:

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

A clone that has run neither command has **no identity of its own** — no keypair, no leaf, no
sigchain, nothing that signs in its name. The public key that arrived with the clone is
Alice's, not the clone's; inheriting it does not make you Alice, and using it for your own
signatures would produce signatures that verify against the wrong author. Borrowed keys are
worse than no keys, so make your own:

```bash
koad-io init sovereign        # a keypair that is yours, on this machine
koad-io init alice            # adopt the entity, sign your own sigchain
```

Once you have run those, `id/` in your tree will differ from this repo's — yours will hold
your key and your fingerprint. That divergence is the moment the template stopped being a
face and became you. Commit it if you want your own repo to be your own face.

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
| `id/entity.public.asc` | **Alice's public key** — for verifying her signatures. Not yours |
| `id/entity.fingerprint` | The fingerprint of that key — `04ED15A3B056C900140BBB84C462E4DF7E7DC869` |
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

When you do, replace `id/entity.public.asc` and `id/entity.fingerprint` with your own —
otherwise your face still says Alice while your voice says something else.

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
