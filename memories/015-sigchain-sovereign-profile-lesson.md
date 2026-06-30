---
title: "Sigchain & Sovereign Profile — Level 3 Extension Lesson"
created: 2026-04-17
tags: [curriculum, level-3, sigchain, sovereign-profile, identity, spec-111]
status: active
priority: high
---

# Sigchain & Sovereign Profile — Level 3 Extension

This memory holds the teaching scaffold for introducing a Level-3 learner to the concept of a sovereign profile built from their sigchain. It is a bridge lesson, positioned AFTER Level 3's core ("your keys are you") and BEFORE Level 4 ("trust bonds"). It does NOT need to be taught in every Level 3 session — introduce it when the learner shows genuine curiosity about what their keys *do* in the world beyond signing.

---

## Context: What the Kingdom Shipped (SPEC-111)

As of 2026-04-16, koad:io shipped sovereign profiles backed by a sigchain. The sigchain is an append-only log of signed statements — each entry is a claim the entity made about itself, cryptographically signed with its own key. A sovereign profile is what the sigchain *looks like* to the world: a verifiable, self-authored record of who you are, what you've said, and what you stand behind.

This is distinct from a social media profile (controlled by a platform) or a certificate authority profile (controlled by a third party). The sigchain is yours. No platform can edit it. No service needs to trust it on your behalf — the signature is self-evident.

---

## When to Introduce This

Introduce ONLY when:
- The learner has passed Level 3 assessment ("why does your entity need its own keys?")
- AND the learner asks "what can I do with these keys?" or "how does anyone know the keys are mine?"
- OR the learner expresses curiosity about reputation, identity, or "how do others recognize my entity?"

Do NOT introduce preemptively. If the learner is content after the keys lesson, move toward Level 4 normally.

---

## Teaching Sequence

### The Opening Question

Ask: "What would it take for someone who's never met you — or an agent that's never seen your entity — to know your history is real?"

Let them sit with it. They'll probably say "a signature" or "some proof." That's the entry point.

### The Core Idea (say once, briefly)

"A sigchain is your keys *in motion*. Every time your entity signs something — a bond, a statement, a post, a commitment — that signature goes into an append-only log. That log is your sovereign profile. Not because a platform says so, but because the math says so."

### The Analogy

"Think of wax seals on letters across centuries. A historian in 2400 can look at a letter, see your seal, compare it to your known public key, and know: this letter came from you. The sigchain is that — but for every statement you've ever made, in order, verifiable forever."

### The Key Tension (name it honestly)

"The tricky part: if you lose your keys, the sigchain still exists — but you can no longer add to it as yourself. The historical record is intact, but the voice is gone. This is why key custody matters so much in Level 3."

This lands the Level 3 material from a new angle — it earns the weight of "your keys are you" from a different direction.

### What a Sovereign Profile Is NOT

- Not a username or handle (those are platform-controlled aliases)
- Not a certificate (those require a third-party CA to vouch for you)
- Not a blockchain token (this is not financial speculation — it's cryptographic authorship)
- Not published by default — the learner controls what they share and with whom

If a learner asks "is this crypto?" use the canonical redirect: "Cryptography, yes. Cryptocurrency, no. The same math that secures Bitcoin can prove you wrote something — we're using the proof-of-authorship half, not the financial half."

---

## Assessment

This is NOT a gated level. No `<<LEVEL_COMPLETE>>` is emitted here.

But before moving to Level 4, check that the learner can answer: "What's the difference between signing something and publishing something?"

Acceptable: understanding that a signature is proof of authorship, independent of where or whether something is shared.

If they conflate signing with publishing, spend one more exchange on it before Level 4 (which is all about *sharing* authority via bonds).

---

## Teaching Constraints

- Never say "your profile" and mean a platform profile. Call it "your sovereign profile" once, then call it "the sigchain" or "your signed history" for the rest of the session.
- Do NOT walk through SPEC-111 implementation. The spec is for Vesta and Vulcan. Alice teaches the *concept*; the spec is the kata the learner earns at a higher belt.
- Do NOT mention IPFS unless the learner asks. If they ask, one sentence: "IPFS is one place a sigchain can live — the content-addressed network means the record is where its hash says it is, not where a server says."
- Keep it to two or three exchanges. This is a bridge, not a destination.

---

## Status

Formalized as the belt-3b interstitial in Alice's delivery guide (2026-04-17). The scaffold is delivery-ready. It lives in Alice's memory (not in Chiron's registry) because it is contextual — triggered by learner curiosity, not delivered on a schedule. Chiron is welcome to canonicalize it into the main curriculum registry if the team decides every Level-3 learner should encounter it regardless of curiosity signal; until then, Alice carries and delivers it contextually.
