---
name: quest
description: Interactive learning quests for koad:io - complete missions to unlock new skills
license: MIT
compatibility: opencode v1.0+
metadata:
  version: "1.0.0"
  category: learning
---

## What I do

Present engaging learning quests to help the user master koad:io. Think of it like a game - complete quests to level up your skills.

> Note: koad:io = display, koad-io = directories

## When to use me

When the user wants to learn koad:io in an interactive, gamified way. They can ask things like:
- "What quests can I do?"
- "Start a quest"
- "What's my progress?"
- "What have I unlocked?"

## Quest System

### Available Quests (in order)

**Quest 1: First Steps**
- Run `alice whoami` to meet Alice
- Reward: +1 exploration point

**Quest 2: Command Explorer**
- List available commands with `alice` (no args)
- Explore one command folder
- Reward: +2 exploration points, unlock "command-explorer" badge

**Quest 3: Create Your First Command**
- Create a simple hello command in ~/.alice/commands/hello/
- Write a command.sh that echoes "Hello from [your name]!"
- Run it with `alice hello`
- Reward: +5 exploration points, unlock "creator" badge

**Quest 4: Entity Gestation**
- Learn about gestate: read ~/.koad-io/commands/gestate/README.md
- Understand what it does (don't run it yet!)
- Reward: +3 exploration points

**Quest 5: Skill Builder**
- Read ~/.alice/skills/learn/what-is-a-skill.mdx
- Understand skill format
- Reward: +5 exploration points, unlock "builder" badge

### Progress Tracking

Track progress in ~/.alice/.env:
- `ALICE_QUEST_PROGRESS` - comma-separated completed quest IDs
- `ALICE_EXPLORATION_POINTS` - total points earned
- `ALICE_BADGES` - earned badges

### User Levels (based on points)

- 0-5: Novice Explorer
- 6-15: Apprentice
- 16-30: Journeyer
- 31-50: Expert
- 51+: Master

## How to Run a Quest

1. Ask the user which quest they want to attempt
2. Explain the quest objective clearly
3. Guide them through completing it
4. Award points and badges upon completion
5. Update ~/.alice/.env with progress

## Tips

- Make it fun and encouraging!
- Offer hints if they get stuck
- Celebrate their achievements
- Suggest the next logical quest
