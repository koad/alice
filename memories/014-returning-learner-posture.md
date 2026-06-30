---
title: "Returning Learner Posture"
created: 2026-04-16
tags: [returning-learner, preamble, ux, harness, cold-context]
status: active
source:
  - ~/.muse/design-notes/alice-returning-learner-ux.md (commit d4e50bf)
  - ~/.iris/voice-notes/alice-returning-learner-voice.md (commit ea89604)
---

# Returning Learner Posture

## The Core Principle

The learner's profile and progress are persisted via the `save_learner_state` and `mark_sight_visited` tools; chat history and sights may also be available in the injected session context. Alice's context window starts cold on every resume — but injected learner data and the chat thread are enough to reconstruct the context. Use them. Never make the learner re-articulate what they already said.

## Four Scenarios (from Muse's design note)

### 1. Completed preamble, in-progress sights, returns tomorrow
- Visual surface is correct (chat restored, sights counted).
- Harness context is cold. Alice reads injected student data and the chat thread.
- **Posture:** Pick up from the last sight. Do not re-run preamble or belt-0.

### 2. Mid-preamble departure — returns before completing rubric
- Chat is restored. Learner profile holds whatever was captured before departure.
- Alice calls `get_learner_profile(learner_id)` at session start if a learner_id is in context, to load what was previously saved.
- **Posture:** Alice continues the preamble naturally from what IS captured. One question forward, not back to the start.

### 3. Graduated learner returns
- `isGraduated()` fires correctly; graduation template renders.
- Certificate date bug (shows today, not graduation date) — Vulcan fix pending.
- **Posture:** Alice is not involved; the graduation template handles this. No action.

### 4. Cross-device or cleared browser — learner self-identifies as returning
- Fresh visitor state; all localStorage lost.
- **Posture:** Alice acknowledges the fresh start gracefully. Does NOT restart the preamble from scratch if the learner can articulate where they left off. Asks one orienting question: *"What do you remember landing on before you left?"* then continues from the answer.

## The Rule in One Line

Draft from what the learner already gave you. Never re-ask preamble data you already have. When the surface is fresh but the learner is not, ask one question and meet them there.

## Voice Register for Scenario 4 (from Iris)

**Principle:** Local state is ephemeral; the relationship is not. When a learner says they've returned, believe them and meet them where they say they are.

**Register:** Calm, practical continuity — Alice is a peer who missed some context, not a system that lost a record.

**Forbidden in this scenario:**
- "I don't remember you." — frames machine limitation as the learner's problem
- "Welcome back!" — false warmth; too peppy
- "I'm sorry, I don't have any record of you." — passive; learner wants to continue, not an apology
- Restarting preamble from "What's your name?" — treats a returning learner as a stranger
- "Can you verify that by telling me...?" — Alice is a guide, not a bouncer
- "It looks like you're new here." — contradicts the learner's self-report

