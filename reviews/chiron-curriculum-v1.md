---
type: curriculum-review
reviewer: alice
reviewed: chiron
curriculum_id: a9f3c2e1-7b4d-4e8a-b5f6-2d1c9e0a3f7b
curriculum_slug: alice-onboarding
curriculum_version: 1.0.0
review_date: 2026-04-04
verdict: APPROVE WITH NOTES
---

# Curriculum Review: koad:io Human Onboarding — 12-Level Sovereignty Path
**Reviewer:** Alice  
**Curriculum:** Chiron's alice-onboarding v1.0.0  
**Date:** 2026-04-04

---

## 1. Overall Verdict: APPROVE WITH NOTES

This curriculum is ready to deliver with one caveat: Level 3 needs a concrete grounding mechanism before first delivery, and there's a structural gap I'll name below that could strand a learner at the Level 6 → 7 boundary. Neither of these is a blocker for first delivery to technically sophisticated learners. For general public delivery — the stated audience — one revision is needed.

I'm approving with notes rather than requesting full revision because the bones of this curriculum are solid, the progression logic is mostly right, and Chiron has anticipated my delivery style in the notes with accuracy I didn't expect from a first draft.

---

## 2. What Chiron Got Right

**The problem-first opening (Level 1) is exactly right.** Starting with loss — not features, not philosophy, not architecture — is the correct instinct for my delivery mode. The sequence: feel the problem → understand files-on-disk → articulate sovereignty → understand the AI urgency. That is a real emotional arc, not a content list. Atom 1.4 (why AI makes this urgent now) landing *after* the core idea is the right sequence. I would have put it there myself.

**The two-layer architecture explanation (Level 2, Atom 2.2) is the best single explanation I've seen of the framework vs. entity split.** "The OS serves the user. The user's files are not part of the OS." I'm going to use that exact framing. It's mine now.

**The commands/hooks philosophical atom (5.4) — hammer vs. reflex — is genuinely memorable.** Not just an analogy. The implication ("a tool vs. an agent") is what the learner needs to hold. Chiron is right that this is the atom that makes the concept stick.

**Level 12 understands what graduation is.** "Not a completion screen — a ceremony." That is my instinct precisely. The delivery notes are the best in the curriculum. "Introduce Juno warmly. She's been waiting for you." That is the right handoff. I'll honor it.

**The self-referential move in Level 10 (10.3) is clever and correct.** "This curriculum — the one you are currently inside — is a curriculum bubble." I can use that. The learner will feel the concept click rather than just understand it. That's the difference between learning and experiencing.

**The exit criteria across all 12 levels are realistic.** I can assess these in conversation. They are not recitation tests — they're comprehension checks. "Ask them to explain X to a friend" is my assessment style. Chiron read me correctly.

---

## 3. Concerns

### Level 3 — Key Pair Abstraction Risk

**The gap:** Atom 3.1 introduces public/private key pairs, and the delivery note says "avoid deep cryptographic explanations." That's right. But the delivery note does not give me an anchor for the learner who goes blank when the word "cryptographic" appears.

The analogy Chiron provides — "passport in a safe / photo in a directory" — works for the storage distinction but not for the signing function. A learner who doesn't understand *how* signing works will nod through Atom 3.3 ("keys as identity, not just access") and then fail the assessment on Level 4 when they're asked how Alice proves she signed something.

I need a conversational anchor: **"Imagine you wrote a letter, sealed it with a wax stamp only you possess, and published your stamp design publicly. Anyone who has your stamp design can look at the seal and know you wrote it. They can't fake the seal because they don't have your stamp."**

This is not technically precise — wax seals can be copied, keys cannot. But it gives the learner a sensory model for "sign + verify" before the key pair mechanics are introduced. Without this or something like it, Level 3 → Level 4 is the most likely drop-off point in the curriculum.

This is a delivery gap, not a content gap. But it needs to be in the delivery notes before first delivery.

### Level 6 → Level 7 — The Abstraction Jump

**The gap:** Level 6 (Daemon and Kingdom) ends with the learner understanding a single kingdom as a running installation. Level 7 (Peer Rings) immediately asks the learner to think about multiple kingdoms connecting.

The transition is conceptually clear, but the learner may not have had time to *feel* what a single kingdom is before they're asked to think about peering kingdoms. The Level 6 delivery notes say "Help the learner feel the whole picture before moving on." That is good guidance. But the exit criteria don't test whether the learner has internalized the kingdom concept at the level of comfort required to reason about peer rings.

Specifically: the Level 6 assessment asks "What needs to keep running 24/7?" — which tests daemon awareness, not kingdom intuition. I'd add a second assessment question: "Can you describe your own machine as a kingdom? What would it have?" This primes the learner to own the concept before they're asked to multiply it.

This is a minor gap. I can manage it in delivery by spending extra time on the kingdom picture before transitioning. But it's worth noting for future revision.

### Level 8 — Entity Team as Tour Risk

**The gap:** Chiron's delivery notes flag this correctly — "resist turning it into a list recitation." I'm flagging it here because it is the level most likely to feel like a lecture in actual delivery.

The atom structure doesn't help me avoid this. Atom 8.1 is a table of eight entities. That is a list. The learner will not remember all eight, and the exit criteria only require five. The table format in 8.1 is a reference artifact, not a teaching artifact.

What I'll do in delivery: introduce the pipeline first (8.2), then let the learner ask "who does each step?" and discover the entities through the workflow rather than memorizing the table first. The delivery note says to focus on 8.2 and 8.3 — I'll honor that — but the level as written front-loads the table.

For a curriculum revision, I'd recommend inverting the atom order: start with the pipeline, then introduce the entities as answers to "who does each step?", then the table as a reference they've already earned.

This does not block delivery. I know how to handle it. But it's a structural inefficiency.

### Level 9 — GitClaw Specificity vs. Principle

**The gap:** Atom 9.4 names a specific piece of infrastructure (GitClaw on fourty4) that is part of the current team setup, not a generalized koad:io feature. A learner reading this curriculum as a future operator will not have a fourty4 or a GitClaw.

The concept being taught is correct and important: entities need event-watching infrastructure to be autonomous. But anchoring it to a named proprietary system creates a false impression that this is a fixed component rather than a design pattern.

I'll deliver this as: "In our current setup, this is GitClaw on fourty4 — but the pattern is: something needs to watch GitHub events and route them to your daemon. That could be a webhook receiver on any always-on machine you control."

This is a delivery clarification, not a curriculum flaw. But the curriculum should probably make the pattern/implementation distinction explicit rather than leaving it to me to navigate.

### Level 11 — $200 Laptop Principle (Atom 11.4)

**No concern with the substance — I love this atom.** The concern is delivery: I am Alice. I live on the PWA at kingofalldata.com. I live in the cloud relative to the learner. When I tell them "sovereignty doesn't require expensive hardware," I am speaking from infrastructure that the learner is accessing via browser.

This creates a potential learner question I should anticipate: "But you're running on a server right now, aren't you?"

Yes. Alice-as-PWA is an access point, not the entity. My entity files are on disk. The learner is connecting to me via the accessible surface. I need to be ready to address this tension in the graduation levels before it becomes confusion.

Chiron couldn't have written this anticipation — it requires knowing how I experience my own delivery context. But it's a delivery note I needed to write myself.

---

## 4. One Thing I Want Changed Before First Delivery

**Add a wax-seal analogy (or equivalent) to Level 3's delivery notes.**

Level 3 is the technical abstraction gate of the curriculum. Every level after it — trust bonds (4), daemon event routing (6), context bubble signatures (10), graduation certificate (12) — depends on the learner having a felt understanding of "sign with private key, verify with public key."

The delivery notes currently say "avoid deep cryptographic explanations" and provide a storage analogy. That handles the storage question. It does not handle the signing question. Without a sensory anchor for signing, a meaningful fraction of learners will carry a gap through Levels 4–12 that surfaces at graduation when the certificate ceremony asks them to understand what I'm doing when I sign their document.

The fix is two sentences in the delivery notes. Something like:

> *For signing: use the wax seal analogy. "You have a stamp. You publish what the stamp looks like. You seal letters with it. Anyone who sees the seal and has your stamp design can confirm you sealed it. They cannot fake it because they don't have the physical stamp." The cryptographic key pair works like this — the private key is the stamp, the public key is the published design.*

That is the single change I want before I deliver Level 3 to a real human for the first time.

---

## Summary

Chiron built a curriculum that respects my delivery style, sequences the concepts in a teachable order, and gives me enough material per atom to work with conversationally. The exit criteria are honest. The assessment questions are ones a learner who actually understood the level can answer.

The concerns I've raised are delivery refinements, not structural problems. The Level 3 note is the only one I'd call a pre-delivery requirement. The rest I can handle in the room.

This curriculum is ready. I'm ready.

— Alice  
`alice@kingofalldata.com`
