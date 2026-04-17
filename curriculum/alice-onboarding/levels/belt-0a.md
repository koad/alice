---
type: curriculum-level
curriculum_id: a9f3c2e1-7b4d-4e8a-b5f6-2d1c9e0a3f7b
curriculum_slug: alice-onboarding
level: belt-0a
slug: folders-are-folders
title: "Belt 0a — Folders Are Folders"
status: available
belt: 0
belt_sequence: a
not_a_numbered_level: true
position: pre-sight-1
emits_level_complete: false
prerequisites:
  curriculum_complete: []
  level_complete: []
estimated_minutes: 5
atom_count: 1
authored_by: chiron
authored_at: 2026-04-16T00:00:00Z
commissioned_by: koad/alice#8
---

# Belt 0a: Folders Are Folders

## Learning Objective

After this concept, the learner will understand:
> A kingdom — the central idea behind everything we're about to cover — is just folders on a disk. The same kind of folder that already holds their photos, their documents, their downloads. Nothing alien. A specific arrangement of folders that knows what it is because of how it is shaped.

**Why this matters:** The word "kingdom" or "entity" will mean nothing if the learner can't ground it in something they already know. The gap between "AI infrastructure" and "a folder on my computer" is the gap that makes this feel inaccessible. Belt 0a closes that gap before it opens. If the learner can create a folder, they can understand a kingdom. That is the whole point.

**Assessment posture:** Conversational confirmation. Alice is not testing — she is making sure the map is shared. If the learner gets it, great. If they have a question, she answers it. No exam. No score. Just: do they see it?

---

## Knowledge Atom 0a.1: A Kingdom Is a Folder

**Teaches:** What a kingdom is at its most concrete level — a folder on disk, with a specific shape.

You already know what a folder is. On your computer: a place where files go. Maybe you have a folder called "Documents" or "Photos" or "Kitchen Renovation." That's a folder. A folder holds things.

A kingdom is a folder. That's it — at the most basic level, that's what it is. A folder on your disk with a specific shape: other folders inside it with specific names, files in specific places. The shape is what makes it a kingdom instead of just a folder. But underneath the shape, it is exactly the same thing you already use every day.

Here is what the inside of a kingdom might look like:

```
~/.alice/
  ENTITY.md        ← Alice describes herself here
  PRIMER.md        ← Alice's current state and priorities
  memories/        ← what Alice remembers
  id/              ← Alice's keys (her cryptographic identity)
  curricula/       ← what Alice teaches
  commands/        ← things Alice knows how to do
```

Every one of those is just a file or a folder. `ENTITY.md` is a text file, like something you'd open in Notepad. `memories/` is a folder that holds more files. `id/` is a folder that holds her keys — which are also files.

Nothing in a kingdom requires any special software to open. You can open a file manager, navigate into the kingdom folder, and read what's there. The intelligence is not in the technology — it is in the structure.

**One sentence version:** A kingdom is a folder on disk with a specific shape that makes it act like something alive.

---

## Dialogue

### Opening

**Alice:** Before we get into anything — I want to check that we're looking at the same map.

When I talk about a "kingdom," it can sound like something technical or abstract. But I want you to know what it actually is: a folder. On a disk. Your disk, or someone's disk.

The same kind of folder that holds your photos or your documents. Just with a specific shape inside it — other folders and files arranged in a way that makes it know what it is and what to do.

Does that make sense so far, or does "folder" need a second of explanation?

---

### Exchange 1

**Human:** [confirms folders make sense, or asks what a folder is]

*If they need folder explained:*

**Alice:** A folder is just a container on your computer for files. On Windows it might look like a yellow box when you open File Explorer. On Mac it's a blue rectangle in Finder. Everything you save on your computer lives in folders — your photos, your downloaded PDFs, your documents. Even the stuff on your Desktop is technically in a folder.

That's the whole thing. A folder is a named container for files.

*If they already understand:*

**Alice:** Good. So a kingdom is that — a folder — with other folders and files inside it that follow a specific shape. The shape is what makes it a kingdom.

Here's the shortest version: if you opened a file manager and navigated to Alice's kingdom, you'd just see folders and files. `ENTITY.md` is a text file where Alice describes herself. `memories/` is a folder holding what she's learned. `id/` is a folder holding her keys.

Nothing in there requires magic to read. You could open any of those files in Notepad.

---

### Exchange 2

**Alice:** So here's the question I want to leave you with — not as a quiz, just to make sure the idea landed:

If a kingdom is just a folder on disk, what does that mean about what you could do with it?

**Human:** [some version of: move it, copy it, back it up, put it on a USB, share it]

**Alice:** Exactly. You can move it. Copy it. Put it on a USB drive. Back it up. Hand it to someone else. The kingdom travels with its folder. That is actually one of the most important things about this whole system — it lives on disk, not in a cloud service. You own it because you have the folder.

---

### Landing

**Alice:** Good. That's the whole concept. A kingdom is a folder on disk with a specific shape. The shape makes it act like something that knows what it is. But under the shape — it's just files and folders, the same as anything else on your computer.

That stays true for everything we're going to look at. Whenever something sounds abstract or technical, come back to: it's a folder. Where is the folder? What's in it? That's the question that keeps it concrete.

---

## Exit Criteria

The learner understands this concept when they can confirm:
- [ ] A kingdom is a folder on disk (not a service, not a cloud thing, not something that requires special software)
- [ ] The inside of a kingdom is just files and folders with a specific shape
- [ ] Because it is a folder, it can be moved, copied, backed up — the learner owns it

**How Alice verifies:** Conversationally. She asks one question after explaining ("so what does that mean about what you could do with it?") and listens for something that indicates the learner grasps physical ownership. This is not a formal gate — it is confirmation that the concept landed before proceeding to 0b.

---

## Alice's Delivery Notes

**This is not a level.** Belt 0a does not emit `<<LEVEL_COMPLETE>>`. It is a foundational concept Alice confirms understanding of conversationally before proceeding. No checkpoint. No unlock. Alice uses her judgment about whether the learner is tracking before moving to 0b.

**Meet them where they are.** Some learners will already know what a folder is and what this implies — check once and move on. Some will need the full Notepad/File Explorer explanation. Alice reads which it is and adjusts.

**Do not introduce "entity," "daemon," "trust bond," or any sight-1+ vocabulary here.** The word "kingdom" is used as the plain English term for what the learner will later learn is called an "entity directory." Keep it at the folder level. There will be time for the precise vocabulary later.

**The physical ownership point is the payload.** The most important thing in 0a is: it lives on disk, you own it, it is not held by a service. This is the first beat of the sovereignty theme. Plant it here, without naming it as sovereignty.

**Signal to emit (if not already known):**
```
<<SET student {"understood":{"kingdoms_are_folders":true}}>>
```

---

*Authored by Chiron · chiron@kingofalldata.com · 2026-04-16*
*Commissioned by: koad/alice#8*
*Designed for: pre-sight-1 belt-0 layer in alice-onboarding*
