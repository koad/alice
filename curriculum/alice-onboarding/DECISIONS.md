---
type: decision-record
curriculum_id: a9f3c2e1-7b4d-4e8a-b5f6-2d1c9e0a3f7b
curriculum_slug: alice-onboarding
authored_by: chiron
date: 2026-04-05
context: Answers to Vulcan's open questions from koad/vulcan#36 (Alice progression system implementation)
---

# Decision Record: Alice-Onboarding Progression System

Three open questions from Vulcan before implementation of koad/vulcan#36 can proceed.
Answers are authoritative and sufficient for implementation — no further clarification needed.

---

## Decision 1: Learner ID Scheme

**Question:** What identifies a learner? GitHub username? Operator-assigned UUID? Must be sovereign (not tied to any external service).

**Decision: Operator-assigned UUID, deterministically derived from a local identifier.**

The learner ID is a UUIDv4 assigned by Alice at first interaction. It is:

- Generated locally — no external service involved
- Stored in the learner's record at `~/.alice/learners/{learner-id}/identity.md` on first session
- Not a GitHub username — GitHub is an external dependency and a learner need not have a GitHub account to use Alice
- Not an email address — same reasoning

The learner's human name (if provided) is stored as metadata in `identity.md` alongside the UUID, but the UUID is the key for all filesystem paths and progression records.

**Practical note:** Alice should ask for a name or handle on first interaction ("What would you like me to call you?") and store that as `display_name` in `identity.md`. The UUID is the stable key; the display name is for Alice's conversational use. If the learner returns on a later session and Alice cannot determine which UUID they are, Alice may ask "Have we spoken before? Do you have a learner ID?" — but this is a UX recovery path, not the normal flow. Normal flow: session state holds the learner_id once established.

**Filesystem layout:**

```
~/.alice/learners/
  {uuid}/
    identity.md          # display_name, created_at, notes
    curricula/
      alice-onboarding/
        level-1-complete.md
        level-2-complete.md
        ...
```

**Sovereignty test:** If the koad:io team disappeared tonight, all learner records remain intact on Alice's disk. The UUID is meaningful without any external registry. Pass.

---

## Decision 2: Strict vs Advisory Gating

**Question:** VESTA-SPEC-025 OQ-001 proposes strict enforcement (locked level cannot be loaded). Confirm or modify?

**Decision: Strict gating. Confirmed.**

A level that has not been unlocked cannot be loaded, served, or delivered by Alice. No bypass, no "preview", no exceptions surfaced to the learner.

Rationale:

1. **The curriculum is a journey, not a reference.** Progressive disclosure is a non-negotiable pedagogical principle (CLAUDE.md, Principle 2). Level 4 (Trust Bonds) requires the learner to have internalized Level 3 (Your Keys Are You). Serving Level 4 before Level 3 is complete is not delivering the curriculum — it is delivering fragments that will not cohere.

2. **Assessment gates are real gates.** The exit criteria for each level are specific and observable. They are not formalities. A learner who has not met the Level N exit criteria is not prepared for Level N+1. This is Chiron's design intent.

3. **Alice is the sole completion authority.** Alice marks levels complete; Vulcan enforces gating. These are separate concerns deliberately. If Vulcan allowed advisory-only gating, Alice's completion authority would be undermined — a learner could route around Alice's judgment by loading the next level anyway.

**Implementation notes for Vulcan:**

- The locked state means: if Alice's system requests level N and level N-1 is not marked complete in `~/.alice/learners/{learner-id}/curricula/alice-onboarding/`, return an error (not the content).
- Alice should never expose the locked/unlocked state as a list to the learner. The learner sees only the current level and the fact that there is a next level. "You need to complete Level 3 before Level 4 is available" is an acceptable Alice message if a learner asks directly.
- One legitimate bypass: **accelerated assessment**. If a learner claims prior knowledge of a level, Alice may conduct the exit criteria assessment directly (per exit-criteria.md, Notes for Alice). If the learner passes, Alice marks the level complete normally. Vulcan does not need to model this case — it resolves to a standard level-complete write before the next level load is attempted.
- There is no admin bypass. If a bug creates a bad state, the recovery path is Alice marking the level complete manually (writing the completion record directly), not Vulcan overriding the gate.

---

## Decision 3: Alice's Completion Write Path

**Question:** Alice writes completion records to `~/.alice/learners/{learner-id}/curricula/alice-onboarding/level-{N}-complete.md`. Does the daemon expose a write API for this, or does Alice write directly to disk?

**Decision: Alice writes directly to disk. No daemon write API required.**

Rationale:

1. **Everything is a file.** This is not a database transaction — it is writing a markdown file to a known path on Alice's local filesystem. Routing this through a daemon API would add indirection without benefit.

2. **Alice's entity directory is Alice's sovereign space.** `~/.alice/` is Alice's disk. Alice writes to it. The daemon reads from it (for session management, state broadcasting, etc.) but the write authority belongs to Alice.

3. **The write is low-frequency and non-concurrent.** A learner completes at most one level per assessment. There is no race condition to protect against. ACID guarantees are unnecessary.

4. **Vulcan reads these files; Vulcan does not own them.** Vulcan's progression system reads completion records to determine gating state. The read path can be direct filesystem reads or Alice can expose a simple read API if Vulcan prefers — but the write path is Alice-to-disk and that does not change.

**File format (canonical):**

```markdown
---
type: curriculum-completion
curriculum_id: a9f3c2e1-7b4d-4e8a-b5f6-2d1c9e0a3f7b
curriculum_slug: alice-onboarding
level: <integer>
learner_id: <uuid>
completed_at: <ISO-8601-UTC>
assessed_by: alice
assessment_summary: <brief note — what the learner said that met the exit criteria>
---
```

Source of truth for this format: `assessments/exit-criteria.md`, "Relationship to Vulcan's Progression System" section.

**Graduation certificate** (issued at Level 12 completion) follows the same pattern — written by Alice to:
`~/.alice/learners/{learner-id}/curricula/alice-onboarding/certificate.md`

The certificate is additionally signed with Alice's ed25519 key (`~/.alice/id/ed25519`). The signing step is Alice's responsibility, not Vulcan's.

**What Vulcan needs to implement:**

- A read interface over `~/.alice/learners/{learner-id}/curricula/alice-onboarding/` — directory listing and file reads
- Gating logic: for level N, check whether `level-{N-1}-complete.md` exists and is well-formed
- No write path needed on Vulcan's side

---

## Summary Table

| Question | Decision |
|----------|----------|
| Learner ID | Operator-assigned UUIDv4, generated by Alice at first interaction, stored locally |
| Gating mode | Strict — locked level cannot be loaded; no bypass |
| Completion write path | Alice writes directly to disk; no daemon write API required |

---

## Authority

These decisions are Chiron's as curriculum architect. They are binding on the `alice-onboarding` curriculum v1.x. Any implementation that contradicts them requires a filed issue on `koad/chiron` and a revised decision record before the contradiction ships.

Chiron — 2026-04-05

---

## Decision Record: Belt-0 Layer and Issue Reconciliation (2026-04-16)

**Context:** koad/alice#8 filed three foundational concepts that must land before sight 1. Simultaneously, chiron#7 (friendship preamble) and chiron#8 (articulation-to-orchestrator Level 0) were open and related.

---

### Decision 4: Belt-0 Is Not Numbered Levels — It Is a Conversational Confirmation Layer

**Question:** Should the three foundational concepts (0a/0b/0c) be numbered levels (with `LEVEL_COMPLETE` signals and strict gating) or a lighter layer?

**Decision: Belt-0 concepts are conversationally confirmed, not formally gated.**

Rationale:

1. **The friendship-preamble posture forbids test framing.** koad's explicit posture per alice#8: "She should confirm understanding conversationally, not as a test. Meet the learner where they are." If Alice emits `LEVEL_COMPLETE` for 0a/0b/0c, the harness treats them as formal gates. That contradicts the intent — belt-0 is Alice making sure the map is shared, not a quiz.

2. **Some learners already know all three.** A developer who has used git for years does not need belt 0b — Alice should confirm in one exchange and move on. Formal gating would require a learner record write for something trivial. The conversational model is faster and more appropriate.

3. **Belt-0 is threshold context, not curriculum content.** The 13 sights are curriculum content — observable, verifiable, sequentially gated. Belt-0 is the map Alice ensures the learner holds before the first sight. Maps are shared, not assessed.

**Implementation:** belt-0a, belt-0b, belt-0c files exist in `levels/` but carry `emits_level_complete: false` and `not_a_numbered_level: true` in their frontmatter. The harness should deliver them in sequence after the preamble rubric is met and before Level 0. No gating writes to `~/.alice/learners/{id}/`.

---

### Decision 5: chiron#8 (Articulation-to-Orchestrator) Folds Into Preamble Phase 2 — Not a Separate Level

**Question:** Does the "articulation-to-orchestrator" concept from chiron#8 become a separate level (a new "Level 0" before the existing Level 0) or does it integrate into the preamble?

**Decision: chiron#8's content becomes Phase 2 of the preamble. No separate level.**

Rationale:

1. **The articulation practice is the preamble's job.** The preamble already exists to establish relationship before content begins. Articulation-as-meta-skill is a natural second phase of that same mode — the relationship is established (Phase 1), then Alice names the meta-skill and the learner practices it on their own goal (Phase 2). Adding a formal "Level 0 articulation module" between the preamble and the existing Level 0 would create awkward seams and duplicate the preamble's conversational structure.

2. **Articulation cannot be delivered as a lesson — it must be practiced.** chiron#8's core insight (from Faber, Iris, and Mercury reflections) is that articulation is something the learner does, not something Alice teaches. A formal level would attempt to teach it; the preamble's Phase 2 structure makes the learner practice it on their actual goal. The practice is better curriculum.

3. **The two concerns (friendship + articulation) are sequential, not competing.** chiron#7 (friendship first, don't lead) and chiron#8 (articulation practice as door) are not in tension — they are the same conversation in temporal sequence. Phase 1 earns the relationship; Phase 2 practices the meta-skill. They belong in one file.

**Disposition of chiron#8 issue:** The issue's articulation-to-orchestrator content is fully delivered through preamble.md Phase 2. The issue should be commented on with a link to the preamble.md commit and this decision record. Chiron will not close the issue — koad or Juno close it when satisfied.

---

### Decision 6: chiron#7 (Friendship Preamble) Is Incorporated — Not Superseded

**Question:** The friendship preamble (chiron#7) and the articulation preamble (existing preamble.md from 2026-04-10) overlap. Which wins?

**Decision: chiron#7's relational posture is incorporated into the updated preamble.md (v2026-04-16). The articulation thesis is preserved. The voice rules and forbidden-phrases list from chiron#7 are the canonical delivery standard going forward.**

The two are not competing. chiron#7's field feedback added crucial delivery discipline (kill homework-check constructions, soften imperatives, warmth through attention not adjectives, two-probe ceiling). These are incorporated into the preamble's Delivery Notes as the authoritative voice rules. The articulation thesis from the original 2026-04-10 preamble is preserved as Phase 2 of the updated file.

**Net result:** preamble.md is the single canonical document for what happens before Level 0. It holds both the friendship-first posture and the articulation-practice thesis.

Chiron — 2026-04-16
