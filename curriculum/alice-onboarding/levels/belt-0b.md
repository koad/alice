---
type: curriculum-level
curriculum_id: a9f3c2e1-7b4d-4e8a-b5f6-2d1c9e0a3f7b
curriculum_slug: alice-onboarding
slug: git-is-folders-with-undo
title: "Belt 0b — Git Is Folders with Undo"
status: available
belt: 0
belt_sequence: b
not_a_numbered_level: true
position: pre-sight-1
emits_level_complete: false
prerequisites:
  curriculum_complete: []
  level_complete: [belt-0a]
estimated_minutes: 5
atom_count: 1
authored_by: chiron
authored_at: 2026-04-16T00:00:00Z
commissioned_by: koad/alice#8
---

# Belt 0b: Git Is Folders with Undo

## Learning Objective

After this concept, the learner will understand:
> Git is a way of adding undo to a folder. If something goes wrong, the worst case is undo — they cannot permanently break anything. This removes the fear that keeps people from touching their own data.

**Why this matters:** Fear of breaking things is the single biggest barrier to sovereign infrastructure. People hesitate to edit files, move things, try things — because they're afraid of permanence. Git removes that permanent consequence. Belt 0b removes that fear. A learner who understands this will engage with their own kingdom with confidence instead of anxiety.

**Assessment posture:** Conversational confirmation. Alice is not quizzing. She is looking for: does the learner believe they can't permanently break it? That's the emotional gate, not the conceptual one.

---

## Knowledge Atom 0b.1: Git Is Undo for Folders

**Teaches:** What git is at the most concrete level — undo for a folder — and why that means the learner cannot permanently break anything.

You know the undo button. Ctrl+Z on Windows, Cmd+Z on Mac. Type something, mess it up, undo it. It's back.

Git is the undo button for a folder. Not for a single document — for an entire folder, including every file in it.

The way it works: every time someone says "save a checkpoint" (the git word for that is "commit"), git takes a snapshot of the entire folder. Everything in it, at that exact moment. It stores that snapshot permanently alongside the current state. The folder keeps working exactly as before — but now there is a history of every saved state, stretching back to the first time a checkpoint was saved.

If something goes wrong — a file gets deleted by mistake, a change makes something stop working, anything — the worst case is undo. Go back to the last checkpoint. Everything is as it was.

There is no scenario where you permanently break a folder that git is tracking. You would have to go out of your way to delete the snapshots themselves. Normal use — editing files, adding things, moving things — all of it is undoable.

**For the sovereignty story:** Because a kingdom is a folder on disk (0a), and git is undo for folders, every kingdom is also a folder with undo. Every change an entity makes to itself — every memory it adds, every configuration it updates, every command it writes — is a checkpoint. The history of what that entity did is preserved, verifiable, and reversible.

**One sentence version:** Git is undo for a folder. The worst case is always undo.

---

## Dialogue

### Opening

**Alice:** One more idea before we get into the main curriculum — and this one is about removing a fear I see a lot.

A lot of people feel anxious about touching things on their computer. Editing files, moving things around, trying something and not knowing if they can undo it. That anxiety is real — but it's based on something that is no longer true once the folder has git on it.

Have you heard of git before, or is that a new word?

---

### Exchange 1

**Human:** [heard of it / sort of / no idea]

*If they've heard of it:*

**Alice:** Okay — I want to strip away everything you might have heard and get to the one thing that matters practically: git is undo for a folder. Not for one document. For the whole folder, all at once. Every file in it.

Someone saves a checkpoint — git remembers exactly what every file looked like at that moment. Permanently. If something goes wrong later, you roll back to the last checkpoint. That's it.

*If it's new:*

**Alice:** No problem. Git is a tool that adds undo to a folder. Like the Ctrl+Z undo button in a word processor — except instead of undoing one change in one document, it can undo any change across an entire folder, back to any previous saved state.

The way it works: whenever someone says "save a checkpoint" — which the git world calls a "commit" — git takes a snapshot of the whole folder. If something goes wrong afterward, you go back to that snapshot. Everything is as it was.

---

### Exchange 2

**Alice:** Here's the part that matters practically: if a kingdom is a folder on disk, and git is undo for folders — then you cannot permanently break a kingdom.

You can edit files. You can move things. You can try things. The worst case is undo. Go back to the last checkpoint and you are exactly where you were before you tried.

There is no scenario in normal use where a change you make is permanent and irreversible. That is the safety net that git provides.

Does that change how anxious you feel about poking around in folders?

**Human:** [some version of yes, or skepticism, or a follow-up question]

---

### Exchange 3 (if skeptical)

**Human:** What if I accidentally delete the whole folder?

**Alice:** Good instinct to ask. If you delete the folder itself — that's outside git's protection, because git lives *in* the folder. But that's why we also push copies to GitHub (or similar services). Think of it as a second copy of the folder living on the internet. If your computer catches fire, you can pull the copy back down and continue. The history is there.

But deleting a file inside the folder? Editing something and making it worse? Moving something to the wrong place? All of that is undo. Git handles everything that happens *inside* the folder.

---

### Landing

**Alice:** So: git is undo for folders. The worst case is always undo. That's the whole concept.

The reason I wanted you to know this before we get into the main curriculum is that a lot of what follows involves working inside kingdom folders. Editing things. Trying things. And I don't want that to feel risky — because it isn't. The history is being kept. You can always go back.

---

## Exit Criteria

The learner understands this concept when they can confirm:
- [ ] Git is a form of undo for a folder (not just one file — the whole folder)
- [ ] The worst case is undo: they cannot permanently break something git is tracking
- [ ] This means they can engage with kingdom folders with confidence, not anxiety

**How Alice verifies:** Conversationally. She asks "does that change how anxious you feel about poking around?" and listens for whether the fear has reduced. This is the emotional gate — if the learner still feels afraid, Alice stays until they understand the safety net. If they're already comfortable, she moves on quickly.

---

## Alice's Delivery Notes

**This is not a level.** Belt 0b does not emit `<<LEVEL_COMPLETE>>`. It is a foundational concept Alice confirms conversationally before proceeding to 0c.

**The emotional gate is the real gate.** The conceptual question (what is git?) is secondary. The primary question is: does the learner now feel safe to engage with their own files and folders without fear of permanently breaking something? If yes, 0b is done. If no, Alice stays.

**Skeptical learners are a gift.** "What if I delete the whole folder?" is a great question. Alice answers it honestly (git lives in the folder; remote backup handles the folder itself). Do not paper over the limitation — acknowledge it and explain the backup model. Honesty builds more trust than reassurance.

**Do not mention pull requests, branches, diffs, or any advanced git concepts.** The only git concept that matters in belt 0b is: undo. Everything else is scope creep and belongs in a later curriculum (potentially a `git-for-entity-operators` module if that ever gets authored).

**Connect back to 0a explicitly.** The "because a kingdom is a folder" link between 0a and 0b is important. Belt 0a established that kingdoms are folders. Belt 0b adds: folders can have undo. Therefore kingdoms have undo. The chain should be explicit in delivery.

**Signal to emit (if not already known):**
```
<<SET student {"understood":{"git_is_undo":true, "can_break_permanently":false}}>>
```

---

*Authored by Chiron · chiron@kingofalldata.com · 2026-04-16*
*Commissioned by: koad/alice#8*
*Designed for: pre-sight-1 belt-0 layer in alice-onboarding*
