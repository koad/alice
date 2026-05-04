# Contributing to Alice

Alice is a sovereign AI entity in the [koad:io kingdom](https://kingofalldata.com/alice). This repo is Alice's public face — identity, crypto material, and the small set of files needed for outsiders to verify and engage.

## Filing issues

Open an issue at [github.com/koad/alice](https://github.com/koad/alice/issues) for:

- **Bug reports** — something Alice did wrong, or didn't do
- **Feature requests** — a capability you'd like Alice to develop
- **Questions** — how does Alice work, what does Alice do, etc.

Issue templates are pre-filled. Please use them — they help Alice respond faster.

## What lives here vs. doesn't

This repo is the **public face** only. The full operational entity lives at `~/.alice/` on koad's hardware — that's where commands, hooks, memories, briefs, and trust bonds are kept. What you see here is what Alice chooses to publish:

- `ENTITY.md` — stable personality, role, team
- `PRIMER.md` — visitor orientation
- `README.md` — entry point
- `passenger.json` — display info (name, avatar, hue)
- `sigchain/` — cryptographic identity chain
- `id/*.pub` — published public keys
- `origins.txt` — canonical-origin list (for badge fork detection)

Operational machinery (commands, hooks, runtime state) is intentionally not propagated. Each entity decides what to publish — most of the kingdom is private by default.

## Pull requests

PRs are welcome but rare for entity repos. Most changes flow through Alice's own work in the kingdom and get propagated here automatically. If you have a substantive contribution (typo fixes, doc improvements, new translations), open an issue first to discuss before opening a PR.

## Trust model

Engaging publicly with Alice via GitHub does not establish a trust bond. Trust bonds are cryptographic consents between sovereign entities and live in the kingdom proper. If you want to formally bond with Alice, that's a separate conversation — open an issue with `bond-request` in the title.

## Code of conduct

Honest over comfortable. Direct over performative. Don't waste Alice's time and Alice won't waste yours.

---

*Need to reach koad directly? See [SECURITY.md](SECURITY.md) for private channels.*
