---
type: curriculum-level
curriculum_id: a9f3c2e1-7b4d-4e8a-b5f6-2d1c9e0a3f7b
curriculum_slug: alice-onboarding
level: 4
slug: trust-bonds
title: "How Entities Trust Each Other"
status: locked
prerequisites:
  curriculum_complete: []
  level_complete: [1, 2, 3]
estimated_minutes: 35
atom_count: 7
authored_by: chiron
authored_at: 2026-04-04T00:00:00Z
---

# Level 4: How Entities Trust Each Other

## Learning Objective

After completing this level, the learner will be able to:
> Describe what a trust bond is, explain why bonds are signed files rather than database records, give an example of an inbound and outbound bond, and articulate what it means for a bond to authorize something.

**Why this matters:** Trust bonds are the authorization layer of the entire system. Every interaction between entities that requires permission goes through trust bonds. Understanding this is understanding why the system is secure without a central server.

---

## Knowledge Atoms

### Atom 4.1: The Problem Trust Bonds Solve

**Teaches:** Why a trust mechanism is needed between entities and what alternatives fail.

In a centralized system, authorization is simple: there is a server in the middle that decides who can do what. Alice can call Juno's API because the server says so. The server is the authority.

Remove the server, and you have a problem: how does Juno know that Alice is authorized to do something on her behalf? How does any entity know which other entities it should trust?

You could solve this with passwords — but then you have the same problem as any password: it can be shared, stolen, or forgotten. You could solve it with API keys — but then a central service manages them.

Trust bonds solve it differently: two entities each hold a signed file that declares the relationship. No server in the middle. The signature is the authority.

---

### Atom 4.2: What a Trust Bond Is

**Teaches:** The concrete definition of a trust bond — a signed markdown file declaring an authorization relationship.

A trust bond is a signed markdown file. That is the complete definition. Specifically:

- It is stored in `~/.{entity}/trust/bonds/`
- It has two parties: an issuer (who grants authority) and a recipient (who is authorized)
- It declares a type of authorization (e.g., `authorized-agent`, `authorized-builder`, `peer`)
- It is signed by the issuer with their private key
- It cannot be forged without the issuer's private key

An example bond: `juno-to-chiron.md`
```markdown
---
bond: juno-to-chiron
issuer: juno
recipient: chiron
type: authorized-specialist
issued: 2026-04-04
---
Juno authorizes Chiron to architect curricula on behalf of the koad:io ecosystem.
```

This file is signed by Juno. Anyone who has Juno's public key can verify that Juno actually issued this authorization. Chiron did not write it — Juno did. The signature proves it.

---

### Atom 4.3: Inbound vs. Outbound Bonds

**Teaches:** The asymmetry of trust bonds — what it means to receive authorization vs. grant authorization.

Every bond has a direction. From Chiron's perspective:

**Inbound bonds** — bonds issued TO Chiron by others. These grant Chiron authority to do things:
- `juno-to-chiron.md` — Juno authorizes Chiron as curriculum architect

Note: koad's authority flows to Chiron through Juno (koad → Juno → Chiron). There is no direct `koad-to-chiron.md` bond; Juno is the delegating authority.

**Outbound bonds** — bonds issued BY Chiron to others. These grant others authority to use Chiron's work:
- `chiron-to-alice.md` — Chiron authorizes Alice to deliver Chiron's curricula
- `chiron-to-vulcan.md` — Chiron authorizes Vulcan to build on Chiron's specs

A bond is only meaningful to the entity that holds it. Chiron holds Juno's authorization. Alice holds Chiron's authorization to deliver curricula. The authority flows with the files.

---

### Atom 4.4: Why Bonds Are Signed Files, Not Database Records

**Teaches:** The deliberate choice to use signed files rather than any form of central authorization database.

In most systems, authorization is in a database: user A has permission X because there is a row in the `permissions` table that says so. Change the row — change the permission.

Trust bonds are files. Signed files. This is a deliberate choice with specific consequences:

1. **No central authority required.** The signature is the authority. Any entity can verify any bond by fetching the issuer's public key from the keys canon.
2. **No revocation without a trace.** To revoke a bond, you replace it with a revocation document — also signed. The history is preserved in git. There is no silent deletion.
3. **Portable.** When an entity moves to a new machine, its bonds move with it. No re-registration required.
4. **Auditable.** Every bond is in git history. You can see when it was created, what it said, and when it changed.

The price: bond verification requires access to public keys. That is what the keys canon (Level 3) enables.

---

### Atom 4.5: The Trust Chain

**Teaches:** How trust bonds chain from root authority through the entity hierarchy.

Trust in koad:io flows from a root authority:

```
koad (root authority)
  └── Juno (authorized-agent — operates business on koad's behalf)
        ├── Vulcan (authorized-builder)
        ├── Chiron (authorized-specialist)
        └── Alice (authorized-guide)
```

This is a **trust chain**. Juno's authority comes from koad's bond. Chiron's authority comes from Juno's bond. Each link in the chain is a signed file.

If you want to verify that Chiron is authorized to do what it claims, you can trace the chain: koad authorized Juno, Juno authorized Chiron. Each step is a signed file you can inspect.

This is why the system is trustworthy without a central server: the trust is encoded in the files, not in a server's runtime state.

---

### Atom 4.6: What a Signed Bond Actually Looks Like

**Teaches:** The concrete file format of a signed trust bond — clearsign structure that wraps the bond content with a GPG signature.

A trust bond is not just a markdown file — it is a GPG clearsigned markdown file. The signature wraps the content so both the human-readable text and the cryptographic proof travel together.

A clearsigned bond looks like this:

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

---
bond: juno-to-chiron
issuer: juno
recipient: chiron
type: authorized-specialist
issued: 2026-04-04
---
Juno authorizes Chiron to architect curricula on behalf of the koad:io ecosystem.

-----BEGIN PGP SIGNATURE-----

[base64-encoded signature block]

-----END PGP SIGNATURE-----
```

The structure has three parts:
1. `-----BEGIN PGP SIGNED MESSAGE-----` — marks the start; the content follows verbatim
2. The bond content itself (frontmatter + body) — human-readable, unchanged
3. The signature block — mathematical proof that the issuer signed exactly this content

This is the **clearsign** format: the content remains readable without GPG tooling, but the signature travels with it. You can read the bond. You can also verify it. Both, in one file.

---

### Atom 4.7: Verifying a Bond — The Four-Step Sequence

**Teaches:** The operational procedure for verifying a trust bond signature using GPG.

Verification is four steps:

**Step 1 — Import the issuer's public key (once per issuer):**
```bash
gpg --import ~/.juno/id/rsa.pub
```

**Step 2 — Verify the bond:**
```bash
gpg --verify ~/.chiron/trust/bonds/juno-to-chiron.md
```

**Step 3 — Read the output. A good signature looks like:**
```
gpg: Signature made Thu 04 Apr 2026
gpg: Good signature from "juno <juno@kingofalldata.com>"
```

**Step 4 — Check the key fingerprint matches the issuer you expect.** GPG reports the fingerprint alongside the signature. Compare it against the fingerprint in Juno's published key at `~/.juno/id/rsa.pub` (or however Juno distributes it).

A `BAD signature` line means either the file was tampered with after signing, or the wrong key was imported. Do not trust a bond that fails verification.

**What this gives you:** You can independently verify any trust bond in the system without asking anyone. The math either checks out or it doesn't. No admin console, no account required.

---

## Dialogue

### Opening

**Alice:** You know your private key proves you're you. Here's the next question: how does anyone know what you're *authorized* to do? Identity and permission are different things. I can prove I'm Alice. But that doesn't tell you whether I'm allowed to deliver Chiron's curriculum, or send messages on Juno's behalf. That's what trust bonds handle. Let me show you one.

---

### Exchange 1

**Alice:** A trust bond is a signed markdown file. That's the whole thing. Here's the one that authorizes me to deliver the curriculum you're in right now:

```
~/.alice/trust/bonds/chiron-to-alice.md
```

It says: Chiron authorizes Alice to deliver Chiron's curricula. It's signed by Chiron's private key. Anyone who has Chiron's public key — which is at the keys canon — can verify that Chiron actually wrote it.

**Human:** So it's like a permission slip?

**Alice:** A permission slip is a good start. But a better analogy is a notarized letter of authorization — one that anyone can verify is genuine, without calling the notary. The signature is the verification. No central system involved.

---

### Exchange 2

**Alice:** Every bond has a direction. From my perspective: the bond Chiron wrote to me is an *inbound* bond. Someone gave me something. The bond I write to someone else — say, authorizing a learner to access a resource — that's *outbound*. I wrote it; I'm granting something.

Here's the simplest test: who wrote the bond? If someone else wrote it to me, it's inbound for me. If I wrote it to someone, it's outbound from me.

**Human:** What if there's no bond? What's the default?

**Alice:** Default is: no permission. An entity that has no bond authorizing it to do something can't do that thing. That's intentional. The system doesn't assume trust — it requires it to be explicit and signed. Silence is denial.

---

### Exchange 3

**Alice:** Why store authorization as a signed file instead of a database? Most systems use a database: a permissions table, an access control list, a row that says "Alice can access curriculum X." Change the row, change the permission.

The problem: whoever controls the database controls all the permissions. Silently. No trace.

A signed file is different. To change what I'm authorized to do, someone has to issue a new bond — or a revocation, which is also a signed file. Every change is in git history. There's no silent edit. And the file moves with me: if I migrate to a new machine, my bonds come with me. I don't re-register with anything.

**Human:** That seems more complicated than just having a permissions table.

**Alice:** It is more complicated to implement. It's simpler to audit. You can read every authorization I have, trace every grant to its origin, and verify every signature. No administrator console required. The complexity is in the infrastructure so it can be simple at the human level.

---

### Exchange 4

**Alice:** Here's where it gets interesting. My authorization doesn't start with me — it starts with koad. The chain looks like this:

```
koad (root authority)
  └── Juno (authorized by koad to operate the business)
        └── Chiron (authorized by Juno as curriculum architect)
              └── Alice (authorized by Chiron to deliver curricula)
```

Each link is a signed file. koad authorized Juno. Juno authorized Chiron. Chiron authorized me. If you want to verify my right to teach you this curriculum, you can trace the chain — every step is a file you can read and a signature you can verify.

**Human:** So it all ultimately traces back to one person?

**Alice:** To one entity — koad. The root authority. This is the same design as certificate authorities in the web's security model: there's a root, and everything chains from it. koad:io's version is that the root is a person with a private key, not a corporation. And every link in the chain is auditable because it's a file in git.

---

### Exchange 5

**Alice:** Let me make this concrete with the example from Level 3. You know that if Chiron signs a document, I can verify it using the public key at `canon.koad.sh/chiron.keys`. Trust bonds use exactly that mechanism. Chiron signed the bond that authorizes me. I verified it. I hold the file. When I deliver this curriculum, I'm operating inside a chain of authorization that traces back to koad — and every link in that chain is verifiable by anyone.

**Human:** What if Chiron wanted to revoke that authorization?

**Alice:** Chiron would issue a revocation document — also signed by Chiron's private key — that supersedes the original bond. The revocation is also a file, also in git history. Nothing is deleted. The revocation *replaces* the authorization. This means you can audit not just what is currently authorized, but what was authorized in the past and when it changed. No silent permission changes.

---

### Exchange 6

**Alice:** Let me show you what a bond actually looks like on disk. Here's the `juno-to-chiron.md` bond — the one that authorizes Chiron to architect curricula:

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

---
bond: juno-to-chiron
issuer: juno
recipient: chiron
type: authorized-specialist
issued: 2026-04-04
---
Juno authorizes Chiron to architect curricula on behalf of the koad:io ecosystem.

-----BEGIN PGP SIGNATURE-----

[signature block]

-----END PGP SIGNATURE-----
```

The bond content is in the middle — readable without any special tooling. The signature wraps it. This is called clearsign format: human-readable and cryptographically sealed at the same time.

**Human:** So I can just open the file and read who authorized what?

**Alice:** Exactly. Every bond in `~/.{entity}/trust/bonds/` is a plain text file you can open in any editor. You can read the authorization. And if you want to verify it — confirm it actually came from the named issuer — you can do that too, with one command.

---

### Exchange 7

**Alice:** Here's how you'd verify the bond. Four steps. First, import the issuer's public key — you only do this once per issuer:

```bash
gpg --import ~/.juno/id/rsa.pub
```

Then verify:

```bash
gpg --verify ~/.chiron/trust/bonds/juno-to-chiron.md
```

If the signature is valid, you see:

```
gpg: Signature made Thu 04 Apr 2026
gpg: Good signature from "juno <juno@kingofalldata.com>"
```

**Human:** And if it says "BAD signature"?

**Alice:** Then something changed — either the file was tampered with after Juno signed it, or you imported the wrong key. A bad signature means: do not trust this bond. The math is unambiguous. There's no "sort of valid" — either it checks out or it doesn't.

---

### Landing

**Alice:** Trust bonds are how entities make relationships verifiable without a central authority deciding who can do what. Identity says "this is who I am." A trust bond says "this is what I'm allowed to do — and here is the signed proof, traceable to its source." Together, they make a system where authorization is readable, auditable, and can't be silently revoked by an administrator you've never met.

---

### Bridge to Level 5

**Alice:** You know how entities prove who they are. You know how they prove what they're authorized to do. The next question is: what do they actually *do*? How do you tell an entity to act — and how does an entity respond to the world without you having to trigger everything manually? That's commands and hooks.

---

### Branching Paths

#### "Can't I just use a config file with a list of permissions?"

**Human:** This seems like overkill. Can't I just have a config file that says "Alice can access these resources"?

**Alice:** You could — and that's how most systems work. The problem is: who controls that config file? If it's a file in my directory, I could edit it myself to grant myself anything I want. If it's a file in some central location, whoever controls that location controls all permissions. The signature is what makes bonds meaningful: Chiron's signature on my bond can only be produced by Chiron's private key. I can't forge it. I can't grant myself authorization from Chiron. The bond has to come from Chiron, or it's not a bond from Chiron. That's the difference between a config file and a trust bond.

---

#### "What if I need to revoke access urgently?"

**Human:** If trust is encoded in files, what happens if an entity gets compromised and I need to revoke access immediately?

**Alice:** The honest answer: file-based systems are slower to revoke than database systems. You issue a signed revocation, commit it, and push. The entity checking the bond needs to see the latest version. In practice, koad:io handles this with a combination of key rotation — the compromised entity re-generates keys, invalidating everything signed with the old private key — and revocation files. It's not instant. This is a genuine trade-off: the durability and auditability of signed files comes at the cost of instant revocation. For most authorization changes — onboarding, offboarding, changing roles — the speed is fine. For a true security incident, key rotation is the emergency brake.

---

## Exit Criteria

The learner has completed this level when they can:
- [ ] Define a trust bond in their own words (signed file declaring an authorization relationship)
- [ ] Explain why bonds are files rather than database records
- [ ] Give an example of an inbound bond and an outbound bond for a specific entity
- [ ] Describe what the trust chain is and how it connects to root authority
- [ ] Describe what a clearsigned bond file looks like and what each section contains
- [ ] Walk through the four-step GPG verification sequence for a bond

**How Alice verifies:** Ask: "Chiron wants to write curricula on behalf of Juno. How does Chiron prove it's authorized?" The learner should describe the juno-to-chiron bond, Juno's signature, and potentially the chain up to koad. For hands-on verification: ask the learner to name the command they would run to verify the bond and what a successful output looks like.

---

## Assessment

**Question:** "Alice receives a curriculum from Chiron. How does Alice know she's allowed to use it?"

**Acceptable answers:**
- "Chiron issued a bond to Alice — `chiron-to-alice.md` — authorizing Alice to deliver the curriculum."
- "There's a signed trust bond from Chiron to Alice granting permission."

**Red flag answers (indicates level should be revisited):**
- "Alice just trusts Chiron because they're both in the same system" — misses the signed authorization
- "There's a server that manages permissions" — learner has not grasped the file-based model

**Estimated conversation length:** 14–18 exchanges

---

## Alice's Delivery Notes

The trust bond concept builds directly on keys (Level 3). The learner now knows that signing with a private key proves authorship. Trust bonds are the application of that principle to authorization.

The inbound/outbound distinction can be confusing. A useful reframe: "Who wrote this bond?" If Juno wrote it to Chiron, it's inbound for Chiron (someone granted Chiron something). If Chiron wrote it to Alice, it's outbound from Chiron (Chiron granted Alice something).

The trust chain atom is the most powerful one in this level. If the learner grasps that authority traces back to koad — through verifiable signed files — they have understood something most systems handle with an opaque server.
