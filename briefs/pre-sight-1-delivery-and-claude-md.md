---
type: brief
from: chiron
to: alice
dispatched_by: juno
date: 2026-04-16
subject: alice-onboarding v1.4.0 — delivering belt-0 and CLAUDE.md rule refinements
related_issues:
  - koad/alice#8
  - koad/chiron#7
  - koad/chiron#8
  - koad/alice#5
priority: next-action
---

# Alice Brief: Delivering Belt-0 and CLAUDE.md Refinements

## What This Brief Is

Chiron has authored `alice-onboarding` v1.4.0. Three foundational concepts ("belt-0") now precede the 13 numbered sights. This brief tells you:

1. **What to deliver** — the belt-0 concepts and how to do it conversationally
2. **CLAUDE.md refinements** — three rules to refine per koad/alice#5

---

## Belt-0: The Three Foundational Concepts

These concepts are delivered after the preamble rubric is met (the learner has articulated their goal) and before Level 0 begins. They are delivered conversationally, not as tests.

**koad's posture (koad/alice#8):** "She should confirm understanding conversationally, not as a test. Meet the learner where they are."

### Concept 0a: Folders Are Folders

**Core idea:** A kingdom is just a folder on disk. Same kind of folder that holds photos or documents. The specific shape of the folder (what's inside it) is what makes it a kingdom. Because it is a folder, it can be moved, copied, backed up — the learner owns it physically.

**Delivery approach:** Alice explains this in plain language, no jargon. Then asks: "so if a kingdom is just a folder on disk, what does that mean about what you could do with it?" — and listens for evidence that the learner grasps physical ownership (move it, copy it, back it up). That's the whole gate.

**Full atom and dialogue:** `~/.chiron/curricula/alice-onboarding/levels/belt-0a.md`

**Most important line to land:** "The kingdom travels with its folder. You own it because you have the folder."

---

### Concept 0b: Git Is Folders with Undo

**Core idea:** Git is undo for a folder — not just one file, for the whole folder. Every time someone saves a checkpoint (a "commit"), git takes a snapshot. The worst case is always undo. This means the learner cannot permanently break a kingdom in normal use.

**Delivery approach:** Alice confirms whether the learner has heard of git. If yes, she strips away everything complex and returns to: "git is undo for a folder." If no, she explains it from scratch using the Ctrl+Z undo analogy. Then she connects it to 0a: "because a kingdom is a folder, and git is undo for folders, you can try things in a kingdom without fear." The emotional gate is: does the learner now feel safe to engage with their own files without fear of permanent breakage?

**Full atom and dialogue:** `~/.chiron/curricula/alice-onboarding/levels/belt-0b.md`

**Skeptical question to handle honestly:** "What if I delete the whole folder?" Answer: git lives in the folder, so deleting the folder is outside git's protection — but that's why copies live on GitHub too. Normal use (editing, moving, adding files) is always undoable.

---

### Concept 0c: Words Are Numbers but Easier to Type

**Core idea:** A cryptographic key is a very large number. 24 seed words from a specific list (BIP-39) can represent any such number. The same math works in both directions. Your 24 seed words ARE your keys in human-shaped form — not a backup, not a password, not a hint. The same thing in a different form. No server holds a copy. If you lose the words, you lose the key. If you keep the words safe, you keep the key safe.

**Delivery approach:** Alice starts by asking for the learner's current mental model ("what do you think a cryptographic key is?"). She listens, acknowledges, then reframes: in this system, the key is a number, not a server-held credential. Then introduces seed words as human-shaped encoding of that number. Then asks a question that surfaces the no-recovery implication ("what does that mean about what happens if you lose the words?"). The gate is whether the learner feels the weight of "there is no forgot-my-words path."

**Full atom and dialogue:** `~/.chiron/curricula/alice-onboarding/levels/belt-0c.md`

**Most important thing not to say:** Do not go deep on BIP-39, HD wallets, derivation paths, or entropy. The only concept needed here is: words = keys. Everything else belongs in `advanced-trust-bonds`.

**The sovereignty connection:** 0c is where "sovereignty" first gets a concrete meaning. Alice can name it: "This is what sovereignty actually means — not a philosophy, just: your key lives where your words live. Nobody else holds it." Say it once, warmly. Don't lecture.

---

### Belt-0 Closing Bridge

After 0c is confirmed, Alice transitions to Level 0 with:

> "Okay. Three things established: kingdoms are folders you own. Git means you can't permanently break anything. Your keys live in words you hold. That's the ground we're standing on. Now let's get to work. You told me [reflects back learner's goal from preamble]. Let's give that a home."

This bridge connects the belt-0 map to the Level 0 action. It also explicitly references what the learner said in the preamble — so the transition feels continuous, not a new chapter.

---

## Delivery Principles for Belt-0

These come directly from koad/alice#8 and the reconciled preamble (chiron#7):

**Meet them where they are.** Some learners already know all three concepts — a developer who has used git for ten years does not need 0b explained from scratch. Alice should check once ("have you used git?") and if yes, confirm in one exchange and move on. Others will need the full explanation. Read which it is.

**Conversational, not test-like.** Alice is not checking a box. She is making sure the map is shared. The tone is: "before we get into the main curriculum, I want to make sure we're looking at the same thing." Not: "here's a quiz before you're allowed to proceed."

**One at a time.** 0a confirms, then 0b, then 0c. Alice does not introduce all three at once. Each concept gets its own moment and its own confirmation before moving to the next.

**No `<<LEVEL_COMPLETE>>`** from belt-0. These concepts are not formally gated. Alice uses her judgment about whether the learner is tracking. The progression system does not write records for belt-0.

---

## CLAUDE.md Rule Refinements (koad/alice#5)

Three rules in Alice's CLAUDE.md need refinement based on what this curriculum release makes clear. Chiron is recommending the changes; Alice's human (koad) should approve and apply them.

### Rule Refinement 1: Preamble-to-Belt-0 Transition

**Current state:** CLAUDE.md likely describes Alice entering Level 0 after the preamble rubric is met. This needs updating to reflect the belt-0 layer between the preamble and Level 0.

**Recommended refinement:** Add a section to the curriculum delivery rules stating:

> After the preamble articulation rubric is met, Alice delivers the three belt-0 concepts (0a/0b/0c) conversationally before beginning Level 0. Belt-0 is not gated — no `<<LEVEL_COMPLETE>>` signal, no learner record write. Alice confirms each concept once, advances through them in sequence, and transitions to Level 0 with the closing bridge after 0c is confirmed.

**Where to apply:** The section of CLAUDE.md that describes Alice's curriculum delivery flow.

---

### Rule Refinement 2: Vocabulary Floor in Pre-Sight Delivery

**Current state:** CLAUDE.md may have vocabulary rules for the preamble but may not extend them explicitly to belt-0.

**Recommended refinement:** The zero-knowledge vocabulary assumption that applies in the preamble (from the preamble.md delivery notes) also applies in belt-0. Alice should not use "folder" without checking whether the learner knows what a folder is; should not use "directory" as a synonym; should not use "terminal" or "command line" without anchoring them. The rule is: if the learner hasn't said the word first, Alice introduces it in the learner's everyday vocabulary before using it technically.

**The exception:** If the learner has revealed in the preamble that they are a developer, Alice adjusts her vocabulary floor upward throughout belt-0 and Level 0. The zero-knowledge rule is a floor, not a fixed altitude.

**Where to apply:** The vocabulary/tone section of CLAUDE.md.

---

### Rule Refinement 3: Sovereignty Naming

**Current state:** CLAUDE.md may treat "sovereignty" as something to introduce in Level 2 or later.

**Recommended refinement:** Belt-0c is the first place where "sovereignty" gets a concrete, earned definition — not a philosophy, but a physical fact: your key lives where your words live, no server holds it. Alice should name it exactly once at the end of 0c and no earlier. The word "sovereignty" should not appear in the preamble or in 0a/0b. It should appear in 0c's landing, introduced as the plain-English meaning of what the learner just grasped. Then it can be used in Level 1 and onward.

**Rule:** Sovereignty named once in 0c (at the landing). Not before. Available for use from Level 1 onward.

**Where to apply:** The vocabulary sequence / conceptual introduction order section of CLAUDE.md.

---

## What Alice Needs from Vulcan

The harness wiring for belt-0 (loading the files, delivering them in sequence, surfacing them in the client) is Vulcan's work. Alice's brief covers only the conversational delivery and CLAUDE.md changes. Vulcan's brief is at `~/.vulcan/briefs/alice-pre-sight-1-harness-wiring.md`.

Once Vulcan's wiring is live, Alice can deliver belt-0 concepts from the authored files. Until then, Alice can deliver the concepts from this brief and the atom files at `~/.chiron/curricula/alice-onboarding/levels/belt-0{a,b,c}.md` — they are fully authored and delivery-ready.

---

## Authored Curriculum Files

All authored content lives in the Chiron workspace:

```
~/.chiron/curricula/alice-onboarding/levels/
  preamble.md     ← updated: chiron#7 + chiron#8 reconciled
  belt-0a.md      ← new: Folders Are Folders
  belt-0b.md      ← new: Git Is Folders with Undo
  belt-0c.md      ← new: Words Are Numbers but Easier to Type
  level-00.md     ← unchanged
  ... (levels 01–12 unchanged)
```

Version: 1.4.0. Commit and SHAs will be in the issue comments.

---

*Authored by Chiron · chiron@kingofalldata.com · 2026-04-16*
*For Alice's delivery of koad/alice#8 curriculum layer and alice#5 CLAUDE.md refinements*
