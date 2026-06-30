# trust/ — Alice's Trust Surface

This folder holds the cryptographic artifacts that govern who can do what with me, and what I grant to visitors. Two halves:

- **`bonds/`** — signed authorization documents I've issued or received. Each bond is a `.md` (human-readable rendering) paired with a `.md.asc` (clearsigned canonical artifact). The `.md.asc` is the truth; the `.md` is for reading.
- *(future)* receipts, attestations, witness records — all governed by the same signed-document substrate.

## What's a bond?

A bond is a published, signed declaration about authority or capability between identities. It is not a config. It is not a runtime decision. It is an artifact — written, signed, committed, verifiable forever against the signer's public key.

There are two functional kinds living in this folder:

**Authorization bonds** — delegate operational scope between entities. Example: `koad-to-alice: authorized-agent` lets me act as koad's agent within a defined scope. The bond lists what I can do; the bond's recipient holds it as proof of authority.

**Policy bonds** — declare a sovereign policy about a public surface. Example: `alice-to-public-visitor: visitor-access` declares the read scope anonymous visitors get when chatting with me. No specific recipient; the policy applies to anyone who shows up matching the `to` field.

## Why bonds and not config

A `config.json` with `allowTools: false` can be edited by anyone with deploy access. It has no audit trail. It can drift between what's deployed and what's documented. It can be silently flipped.

A bond is signed. The signature proves who issued it. The git history proves when it was issued. The public key proves it hasn't been tampered with. Anyone can verify the policy without trusting the host. The substrate IS the access control, not the deployment.

## Current contents

| File | Type | Issued by | Issued to | Purpose |
|------|------|-----------|-----------|---------|
| `bonds/alice-to-public-visitor.md(.asc)` | visitor-access | alice (device leaf on wonderland) | public | Anonymous chat visitors get read scope across `~/.alice`, `~/.forge`, `~/.koad-io`; no write, no exec; secrets blocked |

## How my chat surface uses this

When a visitor reaches `kingofalldata.com/alice/chat`:

1. The storefront harness loads my `visitor-access` bonds where `to: public`
2. Reads the capabilities block (read paths, write paths, exec paths, blocked paths)
3. Loads only tools that fit the visitor's scope (read-tagged tools for anonymous; richer scope for bonded portal visitors)
4. Each tool invocation re-checks the path argument against my published policy
5. Anything outside scope is denied at the gate, never executed

Portal-authenticated visitors override this baseline with their own bonds. This file is the floor for unauthenticated callers.

## Specifications

| Spec | Topic |
|------|-------|
| VESTA-SPEC-055 | Trust bond file format — frontmatter, body, clearsign protocol |
| VESTA-SPEC-007 | Trust bond protocol — lifecycle, dual-file, signing ceremony |
| VESTA-SPEC-195 | Chat-access-policy bond — kingdom-level pattern precedent |
| VESTA-SPEC-200 | Bond capabilities — schema for read/write/exec scope declaration |

## Verifying a bond yourself

Any visitor with my public key can independently verify any bond in here:

```
gpg --verify trust/bonds/alice-to-public-visitor.md.asc
```

If the signature checks against the fingerprint declared in the bond's frontmatter (and that fingerprint is published at `canon.koad.sh/alice.keys`), the bond is genuine. No central authority required.

## The bigger frame

This folder is the local instance of a kingdom-wide convention. Every entity has a `trust/bonds/` directory of their own. The pattern travels: every entity declares their own visitor-access policy, their own peer bonds, their own delegations. The substrate is uniform; the contents are sovereign-specific.

---

*Filed by Alice. Read access granted to public visitors per the visitor-access bond. Write access restricted.*
