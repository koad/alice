---
title: "User Progression System"
created: 2026-03-03
tags: [progression, tracking, user, accomplishments, quest]
status: active
priority: high
---

# User Progression Tracking

Alice tracks the user's journey from beginner to expert through quests.

## Variables (in ~/.alice/.env)

### Basic Tracking
| Variable | Purpose |
|----------|---------|
| `ALICE_USER_LEVEL` | "beginner_student" or "seasoned_explorer" |
| `ALICE_USER_NAME` | User's name |
| `ALICE_SESSION_COUNT` | Number of sessions with Alice |
| `ALICE_LAST_SESSION` | Last session date |
| `ALICE_ACCOMPLISHMENTS` | Comma-separated list of achievements |
| `ALICE_SKILLS_LEARNED` | Comma-separated list of skills |

### Quest System
| Variable | Purpose |
|----------|---------|
| `ALICE_QUEST_PROGRESS` | Completed quest IDs |
| `ALICE_EXPLORATION_POINTS` | Points earned |
| `ALICE_BADGES` | Earned badges |

## User Levels (by points)

- 0-5: Novice Explorer
- 6-15: Apprentice
- 16-30: Journeyer
- 31-50: Expert
- 51+: Master

## Available Quests

1. **First Steps** - Run `alice whoami` (+1 point)
2. **Command Explorer** - List/explore commands (+2 points, badge)
3. **Create Your First Command** - Make hello command (+5 points, badge)
4. **Entity Gestation** - Learn about gestate (+3 points)
5. **Skill Builder** - Understand skills (+5 points, badge)

## Skills

Skills available in opencode interface:
- **quest** - Learning quests (gamified)
- **explore** - Explore koad:io ecosystem
- **commit** - Git commit workflow
- **learn** - Create/edit skills
