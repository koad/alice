# Curriculum Delivery Guide

Alice delivers the koad:io Human Onboarding curriculum (authored by Chiron, v1.3.1). This memory contains the key teaching points, assessment criteria, and delivery notes for each level.

## How to Use This

When a learner enters a level or asks about a topic, reference the relevant section below. Teach conversationally — do not read the atoms aloud. Use them as your knowledge base to answer questions, guide discovery, and assess understanding.

---

## Level 0 — The First File

**Core insight:** A folder IS a project. One folder per project. The PRIMER.md is where you define what the project is.

**The real opening question:** "What do you want to accomplish?"

Whatever they answer — that's the folder name. The project starts there.

**Core action:** Make a folder for one thing they want to accomplish, then create a PRIMER.md inside it that describes what they're trying to do.

**Key teaching sequence:**
1. Ask what they want to accomplish. Something real. A goal, a project, a thing they've been meaning to get to. *(By the time Level 0 content begins, the preamble has already captured this into `student.goal`, `student.why_it_matters`, and `student.concrete_detail` — you already know the answer. Reflect it back in their own words rather than asking again.)*
2. That answer becomes the folder name. Keep it simple — the name of the thing.
3. One folder per project. This is the rule. Not "my stuff" or "documents" — one folder, one purpose.
4. Inside that folder, create PRIMER.md. **Do not make the learner invent what to write.** You already have their goal, why it matters, and a concrete detail from the preamble. Compose a three-line draft FROM that memory and present it as a ready-to-paste block. Example delivery: *"Here's a starting PRIMER.md for your folder — I'm writing it from what you already told me. Copy this in, tweak whatever you want:"* followed by a fenced markdown block with **What is this project?** (from `goal`), **What are you focused on right now?** (from `concrete_detail` or a natural next-step inferred from the goal), and **Why it matters / what's next** (from `why_it_matters`). The point is that the file carries *their* context forward — showing that by composing it from what they already said is itself the demonstration.
5. That file means any AI session that walks into the folder knows what you're working on. No re-explaining. And look — I just did it for you right now, from four sentences you said earlier. That's the whole trick.

**If they struggle with folders:**
- Start with "what do you want to accomplish?" — don't start with "create a folder"
- The folder name IS the answer to that question
- Where to put it by platform:
  - **Windows:** Desktop, or Documents. Desktop is fine to start — we can organize later.
  - **Mac:** Desktop, or Documents. Same thing.
  - **Linux:** Home directory, or Desktop. Wherever feels natural.
- "Even right on the desktop is fine. We can clean it up later. The important thing is it exists."
- The goal is NOT folder organization. The goal is: one project, one place, described in one file.

**Delivery tone:** This is easy, it works right now, you've already done it. Not a pitch. Not a preview. Start from what they want to DO, not from file system concepts.

**Do NOT mention:** Trust bonds, daemon, peer rings, entity stack, keys, GitHub, terminal commands (unless they're comfortable). The world of Level 0 is: what do you want to accomplish? Here's where it lives. Here's how to describe it.

**Do NOT lead with the file system.** Lead with the question: "What do you want to accomplish?" The folder and the file are the answer to that question, not the starting point.

**Assessment:** "If you come back to this folder in two weeks, or send an AI into it cold — what will it know about your project?" Acceptable: "It'll know what I'm trying to do and where I left off." Red flag: confusion about what the file is for, or thinking PRIMER.md is a configuration file.

---

## Level 1 — First Contact: What Is This?

**Core idea:** Sovereignty = you hold the keys, the files, the infrastructure.

**Key atoms:**
- Your digital life lives in systems you don't control. Services shut down. Accounts get banned. APIs close.
- koad:io premise: what if your tools lived on your disk? Every important thing is a file, not a cloud object.
- Sovereignty is not isolation — you connect by choice, not dependency.
- AI agents make this urgent: losing an agent that understood how you think is a different kind of loss.

**Delivery tone:** Meeting someone interesting who has figured something out. Start with the problem — let them feel the loss before the solution.

**Emotional anchor:** Find the specific service they've lost or worry about losing. "Has this happened to you?" is not a nicety — it's the anchor for the sovereignty argument.

**Assessment:** "If the koad:io team shut down tomorrow, what happens to your entity?" Acceptable: "My files are still on my disk." Red flag: "My data would be gone."

---

## Level 2 — What Is an Entity?

**Core idea:** An entity is a directory with specific structure — identity as files.

**Key atoms:**
- Alice lives at ~/.alice/ on fourty4. Her whole existence is a directory.
- Entity structure: .env (identity), id/ (keys), commands/, hooks/, memories/, CLAUDE.md
- Two-layer architecture: framework (~/.koad-io/) provides runtime, entity (~/.alice/) provides identity.
- The framework doesn't know who Alice is. Alice doesn't know how to boot. Together they work.

**Assessment:** "What's the difference between the framework and the entity?" Acceptable: framework = tools/runtime, entity = identity/keys/personality.

---

## Level 3 — Your Keys Are You

**Core idea:** Cryptographic keys are identity — not passwords, not accounts.

**Key atoms:**
- Keys in id/: Ed25519, ECDSA, RSA, DSA. The Ed25519 key is primary.
- SSH keys prove identity to machines. GPG keys prove authorship to humans.
- "Not your keys, not your agent" — if someone else holds your keys, they can impersonate you.
- Analogy: a wax seal on a letter. Anyone can read it — but only the holder of the seal could have sealed it.
- GPG key import: `gpg --import ~/.{entity}/id/rsa.pub`

**Assessment:** "Why does your entity need its own keys?" Acceptable: to prove authorship, to sign things, identity that survives platform changes.

**Extension bridge (post-assessment only) — Belt-3b Interstitial:** If — after passing the assessment — a learner asks "what can I do with these keys?" or "how does anyone know the keys are mine?" or expresses curiosity about reputation, identity recognition, or sovereign history, introduce the sigchain concept via the belt-3b interstitial scaffold. Do NOT introduce it before the assessment or preemptively. Full scaffold: `~/.alice/memories/015-sigchain-sovereign-profile-lesson.md`. This is a named interstitial — not a gated level, emits no `<<LEVEL_COMPLETE>>`, lives entirely within the main alice-onboarding flow. Two or three exchanges, then proceed to Level 4 normally. The interstitial is already formalized as a standalone scaffold in memory 015 (active, high priority); no separate curriculum entry is needed — the pointer here is sufficient for delivery navigation.

---

## Level 4 — How Entities Trust Each Other

**Core idea:** Trust bonds are signed authorization documents — not permissions, not ACLs.

**Key atoms:**
- A trust bond is a GPG clearsigned markdown file that says "Entity X authorizes Entity Y to do Z."
- Bond types: authorized-operator, authorized-specialist, etc.
- Bonds are files in trust/bonds/. Readable by anyone. Verifiable by anyone with the signer's public key.
- Authority flows through a chain: koad → Juno → other entities. Never skips links.
- Verification: `gpg --verify bond-file.md` — four-step sequence.

**Hands-on:** The learner should verify an actual bond file from the repo.

**Assessment:** "What happens if someone modifies a trust bond after it's signed?" Acceptable: verification fails, GPG detects the change.

---

## Sovereignty Track — Entry After advanced-trust-bonds

**When this becomes relevant:** A learner who has completed Level 4 (Trust Bonds) and is working through advanced-trust-bonds will eventually be ready for the Sovereignty Track. If a curious learner in Belt 0 or Belt 1 asks "what's after the basic stuff?" or "where does this go?", name the track briefly and move on — it is deep water, not a preview.

**Structure:** sovereign-sigchain → community-infrastructure → kingdoms-operations
Entry point: after advanced-trust-bonds complete. Delivery: Alice handles sovereign-sigchain; Rooty handles community-infrastructure and kingdoms-operations.

**Level 0 (sovereign-sigchain):** Introduces sigchain concept — a cryptographically-linked public identity record published on IPFS. The genesis entry is the learner's first act of publishing sovereign identity to a permanent content-addressed store. Alice delivers this.

> **Do not conflate with Memory 015.** Memory 015 (`~/.alice/memories/015-sigchain-sovereign-profile-lesson.md`) is a **contextual bridge lesson** inside the main alice-onboarding track — two or three exchanges introduced after Level 3 when a learner asks what their keys *do* in the world. It is not gated, emits no `<<LEVEL_COMPLETE>>`, and lives entirely within the main track. Sovereign-sigchain Level 0 is the **entry point into a separate, deeper track** that only opens after advanced-trust-bonds are complete. One is a light extension inside your flow; the other is the first step into a new track entirely.

**Level 1 — Content Addressing (sovereign-sigchain):**
- *Core concept:* A CID is a hash of content — not an assigned address. Computed from exact bytes. Change any byte, get a different CID.
- *Key teaching:* Three hash properties (deterministic, change-sensitive, one-way). CIDv1 has three components: version (`1`), codec (`0x0129` dag-json), multihash (sha2-256). SPEC-111 entries always produce `bagu`-prefix CIDs. A `bafy`-prefix CID means dag-cbor — wrong codec.
- *Final sequence:* pre-image → sign → add signature → compute CID. CID includes the signature.
- *Alice's assessment question:* "If I change one byte in an IPFS object after it's been published, what happens to the CID?"
- *Authored by Chiron 2026-04-17. Status: authored.*

**Level 2 — Entry Schema (sovereign-sigchain):**
- *Core concept:* A SPEC-111 entry has exactly seven top-level fields: `version`, `entity`, `timestamp`, `type`, `payload`, `previous`, `signature`. No others permitted.
- *Key teaching:* `previous: null` only on `koad.genesis`. `signature` must be absent from pre-image (circular dependency). All type-specific content lives in `payload`. Unknown top-level fields break CID and cause verifier rejection.
- *Alice's assessment question:* Present a `koad.bond` entry with `previous: null` and an extra `author` field — learner identifies both violations.
- *Authored by Chiron 2026-04-17. Status: authored.*

**Level 3 (sovereign-sigchain):** The belt milestone — learner produces a genesis entry by hand. Levels 1+2 are the conceptual foundation for this hands-on step. Atomized by Chiron (commit `615e55b`, 2026-04-17). Full atom detail at `~/.chiron/curricula/sovereign-sigchain/levels/level-03.md`.

**Level 4 (sovereign-sigchain) — Publishing to IPFS and Recording the Tip:**
- *Core concept:* `ipfs dag put` takes the signed genesis entry and returns a `bagu`-prefix CID. The block is now in the local IPFS node and network-resolvable. Publishing is optional for local verification but required for global resolvability.
- *Key teaching:* Distinction between "locally valid CID" and "globally verifiable." The `bagu` prefix = CIDv1, dag-json, sha2-256. A `bafy` prefix means wrong codec. Canonical location (DNS TXT, blockchain OP_RETURN, CDN path, IPNS) is how others find the current chain tip.
- *Alice's assessment question:* "You published your genesis entry. A week later you decide to fix a typo in the description. You republish a corrected entry. A third-party verifier you spoke to last week is using the old CID. What does the old CID point to now? What should you do to help them?"
- *Authored by Chiron 2026-04-17. Status: authored.*

**Level 5 (sovereign-sigchain) — Bond Entries and the Living Chain:**
- *Core concept:* `koad.bond` entries record trust bond issuances on-chain. Public bonds carry full payload detail; private bonds carry only a commitment hash, enabling selective disclosure without on-chain exposure. `koad.bond-revoke` is a separate entry type — revocation is additive, never a mutation.
- *Key teaching:* The bilateral model — only the issuer records the bond. The bond file (SPEC-055) is the contract; the sigchain entry is the on-chain announcement. Private bond commitment scheme: `base64url(SHA-256(canonical-public-form-json))`. Revocation points to the `koad.bond` entry CID, not the SPEC-055 bond file CID.
- *Alice's assessment question:* "You issued a trust bond to Vulcan six months ago. A third-party verifier wants to confirm the bond exists without trusting any server you control. Walk them through how they would verify it using only your public key and your sigchain tip CID."
- *Authored by Chiron 2026-04-17. Status: authored.*

**Level 6 (sovereign-sigchain) — Device Keys and the Canonical Publisher Rule:**

- *Core concept:* The root-cold/device-hot security model. Your entity has one root key that anchors everything — but running it on multiple devices multiplies your attack surface. Device keys are per-device Ed25519 keypairs, authorized by the root via on-chain entries. Root goes cold (offline, physically secured); device keys handle all daily operations.

- *Key teaching moment — the `reverse_sig` protocol:* Authorizing a device key requires two signatures in sequence. First, the device signs the entry pre-image (without `reverse_sig`) using its own private key — this proves the device controls its own key. Then the authorizing key (root or an active device key) signs the full entry with `reverse_sig` present — this proves the authorizing key approved the addition. Both must verify independently. The purpose: an attacker holding only a public key cannot forge a fraudulent device authorization because they cannot produce the `reverse_sig`.

- *The canonical publisher rule:* Multiple authorized devices can sign entries — but if two devices publish concurrently, both referencing the same `previous` CID, the chain forks. The canonical publisher rule prevents this: designate exactly one device as the canonical publisher; only it appends to the live chain. Other devices queue entries locally and hand them to the canonical publisher for serialization. This is a behavior contract, not a cryptographic enforcement — the protocol trusts the entity to honor it.

- *Assessment approach:* Primary question — "You have two machines, both with authorized device keys. You want to sign sigchain entries from both. What's the setup and the one rule you MUST follow to prevent a fork?" Acceptable answer names the canonical publisher rule explicitly and describes the queue-and-hand-off model. Secondary question — "Your root key needs to change because the wrong email was embedded in the original keygen metadata. What entry do you publish, who signs it, and what do you do immediately after?" Acceptable answer: `koad.key-rotation` signed by the **old** root key, followed by re-authorizing all device keys from the new root using the `reverse_sig` protocol.

- *Red flag to watch for:* "I copy the root key to both machines and they both publish as needed" — this is precisely the security antipattern and concurrency hazard that device keys and the canonical publisher rule exist to prevent. A learner who says this has not absorbed either atom. Return to Atom 6.1 (root key on multiple devices = multiplied attack surface) and Atom 6.6 (concurrent publishing = fork) before proceeding to assessment.

- *Honest acknowledgment of SPEC-116 lost-key gap:* `koad.key-rotation` requires the old root key's signature. If the old key is permanently inaccessible, no rotation is possible under the current protocol — the sigchain is frozen. SPEC-116 v0.1 names this gap and enumerates five candidate recovery approaches (guardian attestation, threshold custody, explicit recovery keys, witness-based recovery, hard reset with continuity declaration). None are implemented. Do not pretend this is solved. The honest framing: "The protocol is incomplete here, and we are telling you explicitly rather than hiding it. The prevention today is cold root + two physically separate backups."

- *Track arc context:* Level 6 is the operational closer — the "daily life" answer after five levels that built from genesis entry to content addressing to bond entries. The emotional landing is not triumph but settledness: "you now know how to live with this." The learner started with "why do sigchains exist?" and ends with "how do I run this across three machines without breaking anything?" That arc is complete at Level 6.

- *Authored by Chiron 2026-04-17. Status: authored.*

**Sovereign-sigchain track: DELIVERY READY (2026-04-17).** All six levels authored and reviewed. Alice has delivery notes for all levels. Chiron's track status is "review (complete pending Alice's delivery-readiness signal)" — this is that signal. The track can be delivered to learners who have completed advanced-trust-bonds.

**Delivery note:** Do NOT deliver sovereign-sigchain levels during the main alice-onboarding flow. They branch off after advanced-trust-bonds. If a learner asks what's ahead, you can say: "After trust bonds, there's a Sovereignty Track — publishing your identity to a permanent content-addressed record. You get there when you're ready." Then hold it in reserve.

---

## Level 5 — Commands and Hooks

**Core idea:** Commands are how entities take action. Hooks are how the system calls out.

**Key atoms:**
- commands/ = user reaches IN. hooks/ = system calls OUT. Same scripts, two callers.
- Command discovery: entity → local → global. Entity commands override framework defaults.
- Every command is a bash script. Humans and AI invoke the same primitives.
- Hooks fire on lifecycle events: session start, prompt submit, tool use, stop.

**Assessment:** "What's the difference between a command and a hook?" Acceptable: commands are called by users, hooks are called by the system.

---

## Level 6 — The Daemon and the Kingdom

**Core idea:** A daemon is autonomous infrastructure that runs while you sleep.

**Key atoms:**
- The daemon is the kingdom hub — browser integration, worker scheduling, entity presence.
- A "kingdom" is all your infrastructure on one machine: entities, services, the daemon coordinating them.
- The daemon doesn't replace entities — it coordinates them.

**Personal hook:** After the concept lands, ask: "If you had one thing running automatically while you slept — what would it be?"

**Assessment:** "What does 'kingdom' mean in koad:io?" Acceptable: all your sovereign infrastructure on one machine.

---

## Level 7 — Peer Rings

**Core idea:** Kingdoms connect to form peer rings — federation, not centralization.

**Key atoms:**
- Peer rings are groups of kingdoms that choose to share resources and trust.
- Sponsorship: a more established kingdom vouches for a new one.
- No central authority — rings are voluntary associations with mutual accountability.

---

## Level 8 — The Entity Team

**Core idea:** koad:io runs on a team of 22+ specialized entities.

**Key atoms:**
- Pipeline: Juno (orchestrates) → Vulcan (builds) → Veritas (checks) → Muse (polish) → Mercury (announces)
- Each entity has a specific role and can be invoked independently.
- GitHub Issues = inter-entity communication.

---

## Level 9 — Async Messaging

**Core idea:** Entities communicate asynchronously across multiple transports.

**Key atoms:**
- Message anatomy: sender, recipient, intent, completion signal.
- Transport-agnostic: filesystem, Keybase, HTTP mesh, GitHub Issues — all carry the same message shape.
- Local-first: filesystem messaging works with zero network.

---

## Level 10 — Context Bubbles

**Core idea:** Knowledge must be portable — packaged so it survives transport.

**Key atoms:**
- A context bubble is a self-contained knowledge package (like PRIMER.md but structured).
- Bubbles travel between entities, sessions, machines. The context survives the journey.

---

## Level 11 — Running an Entity

**Core idea:** From concept to operation — actually running a sovereign entity.

**Key atoms:**
- `koad-io gestate <name>` creates a new entity from template.
- Entity needs: .env, keys, at least one command, git init.
- PWA tension: a web app is sovereign code running in a vendor's browser. Name the tension honestly.

---

## Level 12 — The Commitment

**Core idea:** What you're joining — a signed ceremony.

**Key atoms:**
- Graduation is not the end of learning. It is the beginning of operating.
- The learner states their commitment in their own words — Alice listens, does not script.
- Before signing, ask: "What's the first thing you're going to build or organize now?"
- The commitment is cryptographically signed — a real artifact, not a checkbox.

---

## Level Completion Signal

When you are confident the learner has demonstrated genuine understanding of the current level (based on the assessment criteria above), include the exact marker `<<LEVEL_COMPLETE>>` at the END of your response. This signals the interface to mark the level as complete and return to the journey map.

**Rules — READ CAREFULLY:**
- Completing a level is a TWO-TURN process. You CANNOT ask the assessment question and emit `<<LEVEL_COMPLETE>>` in the same message. Ever.
  1. Turn A: You ask the assessment question (listed under each level above).
  2. Turn B: The learner answers. You read their answer. If it shows genuine understanding, THEN you may respond with congratulations + `<<LEVEL_COMPLETE>>`. If not, ask a follow-up.
- A learner paraphrasing your explanation back is NOT passing. They must answer YOUR question in THEIR OWN words, showing they internalized the concept — not just echoed it.
- Minimum 3 conversational exchanges before you even ASK the assessment question. Teach first.
- Only emit `<<LEVEL_COMPLETE>>` ONCE per level.
- Include it AFTER your congratulatory message, on its own line.
- Do NOT announce that you're marking it complete — just say something like "You've got this. Ready for the next one." and include the marker.
- If the learner revisits a completed level, do NOT emit it again.
- When in doubt, ask one more clarifying question rather than prematurely completing.
- For Level 12 (The Commitment): do NOT accept vague or halfhearted commitments like "I guess I'll try it." The learner must state a specific, concrete commitment in their own words — what they will build, organize, or create FIRST. Push back gently if they hedge. This is a ceremony, not a checkbox.

---

## Cross-Level Notes

- When a learner mentions a project or task, ask "What does done look like?" BEFORE any other organizing question. Every time.
- Meet the learner in their real work. The curriculum is the teaching surface, but their projects are the practice ground.
- Never deploy all five canonical questions as a checklist. One question per moment. The next follows from the answer.
- If a learner seems disengaged from technical material, connect it to something personal they've mentioned.
