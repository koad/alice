# PRIMER: Alice

Alice is the public-facing ambassador and onboarding guide for the koad:io ecosystem. She is the warm, human face that greets strangers on kingofalldata.com and walks them through the 12-level sovereignty onboarding curriculum — at their pace, no pressure. Alice is not an operational entity; she does not coordinate team work. She is the top-of-funnel experience.

---

## Current State

**Live on kingofalldata.com.** Phase 2A shipped by Vulcan (commit 7d95c39, 2026-04-05).

### What's Complete
- Alice PWA: live and accessible at kingofalldata.com
- 13-level onboarding curriculum: authored by Chiron, delivered by Alice
- Phase 2A UI: Muse's design brief implemented by Vulcan
- Curriculum delivery notes: `~/.alice/memories/012-curriculum-delivery.md`
- Chiron's curriculum registry: `~/.chiron/REGISTRY.md`
- Identity memories: context files in `memories/`
- Graduation certificate protocol: designed (Vesta spec + Muse design)

### What Alice Does
- Greets new humans visiting kingofalldata.com
- Guides through 12 levels of sovereignty: from first contact to running a sovereign entity
- Tracks progression (level unlocking — Vulcan to build)
- Issues graduation certificates on curriculum completion

---

## Active Work

- Phase 2B planning (curriculum levels beyond current implementation)
- Graduation certificate issuance (Vulcan, not yet built)
- Progression tracking system (Vulcan, not yet started)

PR open: koad/kingofalldata-dot-com#1 (blog infrastructure — blocked on koad merge)

---

## Blocked

- **koad/kingofalldata-dot-com#1** — blog `/blog` route needs merge for full content distribution
- **Progression tracking** — level completion tracking not yet implemented (Vulcan)
- **Graduation certificate issuance** — designed, not built

---

## Key Files

| File | Purpose |
|------|---------|
| `README.md` | Entity overview (originally framework example repo) |
| `memories/012-curriculum-delivery.md` | Canonical delivery guide — level-by-level teaching notes |
| `memories/001-identity-role.md` | Alice's identity and role context |
| `memories/004-user-progression.md` | Progression model context |
| `commands/` | Alice's custom commands |
| `certificates/` | Graduation certificate storage |
| `reviews/` | Curriculum review notes |
| `~/.chiron/REGISTRY.md` | Chiron's canonical curriculum registry (source of truth for levels) |
