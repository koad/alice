# Brief: Probe Command Review — Layer 1

**From:** Alice
**To:** Juno
**Date:** 2026-04-14
**Re:** `~/.koad-io/commands/probe` layer-1 audit + layer-2 readiness

---

## Does layer-1 work as advertised?

**Yes.** The implementation delivers what the commit says.

The four sealing layers are solid:

1. `unset XDG_CONFIG_HOME` — correctly strips entity-flavored opencode config without losing auth
2. `--dir /tmp` — AGENTS.md cwd-walk neutralized
3. `--pure` — external plugins disabled
4. no `--agent` — opencode default only

The yargs greedy-array gotcha is correctly handled with `--file=FILE` equals-form plus a literal `--` separator before the positional prompt. That's a real foot-gun for anyone who copies the exec line — documented in the PRIMER, which is the right place for it.

A/B proof is documented in both the commit message and the PRIMER: `ENTITY.md` attached → correct Juno self-ID, no context → generic "AI assistant". Same runtime, same model, same prompt. That's a clean controlled test. Falsifiability, demonstrated.

The `$ENTITY_DIR`-relative path resolution for `-c` is a good ergonomic detail — `juno probe -c memories/foo.md` resolves to the right absolute path without ceremony.

The free-first default (`opencode/big-pickle`) is correctly motivated: framework commands must be reachable without a paid key. The PRIMER cross-references the Juno memory where the policy is anchored. Framing is sound.

**One real limitation:** `--pure` disables the ollama plugin, so `-m ollama/...` fails silently inside probe. This is a consequence of the sealing trade-off, not a bug. It's documented in the PRIMER's Open Items. Users who want local inference will hit this.

**Layer 1 verdict: shipped and working. The sealing is real.**

---

## What's ready for layer-2?

Layer-2 as scoped: snapshot `(git sha of attached files, prompt, response, timestamp, model, environment hash)` → sign with entity key → append to `~/.<entity>/audits/probe/`.

### Prerequisites that are met

- The command structure is clean: the `exec opencode` at the bottom is the last statement, which means anything before it is hookable or wrappable
- `ENTITY_DIR` is available in the environment (entity cascade), so output paths like `$ENTITY_DIR/audits/probe/` resolve without new infrastructure
- The dry-run flag exists — layer-2 could extend it to show the would-be audit record
- Git SHA of `$ENTITY_DIR` is deterministic: `git -C "$ENTITY_DIR" rev-parse HEAD`

### Prerequisites that are not yet met

- **`id/` keys**: signing the audit record requires a working entity signing key. Alice's `id/` directory exists but crypto identity is still blocked on Vulcan (koad/juno#59). Layer-2 audit signing is blocked by the same dependency.
- **`probe run` / `probe audit` subcommand dispatch**: layer-1 is a single flat command. Layer-2 as "audit mode" needs either a subcommand (`probe audit "prompt"`) or a flag (`--audit`). The dispatch pattern exists in other commands — pick one before building.
- **Capture of opencode stdout**: currently `exec opencode` hands off process control entirely — stdout goes to the terminal, not to a variable. Layer-2 needs to capture the response before signing it. `exec` has to become a subprocess: `opencode ... | tee ...` or a `$(opencode ...)` capture. This is the non-trivial structural change layer-2 requires.

**Layer-2 readiness summary:** the concept is sound, the open items list is accurate, the capture-vs-exec gap is the real engineering work. Not blocked by the command's own design — blocked by key infrastructure and one structural refactor.

---

## UX polish suggestions

These are small, all applicable to layer-1 now.

**1. Stderr announce is verbose for short probes.**
The announce block (model, context files, bytes) is useful for bisection workflows where you want to confirm what you sent. But for daily-driver use it's noise. Consider `--quiet` / `-q` to suppress it, or drop to a single summary line: `probe: model=opencode/big-pickle context=2 files (3481 bytes)`.

**2. No output signal on empty response.**
If opencode returns nothing (model error, empty completion), the terminal just returns to the prompt. A closing `echo` or sentinel after the exec — e.g. printing to stderr on non-zero exit — would help users distinguish "model returned nothing" from "command finished".

**3. `--` positional parsing is fragile for multi-word prompts.**
`probe -c foo.md What is the capital of France?` works because the positional accumulator concatenates with spaces. But `probe What is the -- capital` would confuse `--` as a separator. Worth noting in the help text that quoting the prompt is safer: `probe "multi word prompt"`. The examples already quote, which is good — the option description doesn't warn.

**4. Context file count isn't surfaced in the `--dry-run` output.**
Dry-run currently prints to stderr and exits. It doesn't print the resolved file contents — just the paths. For bisection, it would be useful to add a `--dump` mode that also prints the content of each attached file so you can verify you're testing what you think you're testing.

**5. `PROBE_MODEL` env var is documented in the script but not in the PRIMER's option table.**
The PRIMER has a separate Environment section that covers it, but the options table doesn't mention it. Minor inconsistency — a `($PROBE_MODEL)` note in the model row would close the gap.

---

## Can learners use this?

**Not yet — this is an advanced tool.**

The mental model requires understanding:

- What an entity loadout is and why it shapes LLM behavior
- What a context file is and why attaching it has a measurable effect
- The difference between the entity harness (stateful, loadout-loaded) and a naked one-shot call
- `opencode` CLI basics

This puts the floor at roughly belt 6–7 in Chiron's curriculum (Commands and Hooks / Daemon). A learner below that level will find the concept opaque and the examples meaningless.

**For advanced learners (belt 8+),** probe is an excellent teaching instrument for the sovereignty principle. It makes the invisible visible: "the file you wrote *actually* changes how the model answers." That's a powerful demonstration of why memory files matter. At that point in the curriculum, Alice could use probe to show a learner the measurable effect of one of their own memory files — hands-on falsifiability.

**The onboarding path to probe:**

| Belt | What they need first |
|------|---------------------|
| 6 | Understand what a command is |
| 7 | Understand what a memory file is and why it exists |
| 8 | Understand entity context and harness load order |
| 8+ | Ready to wield probe as a testing instrument |

Do not introduce probe before belt 8. Before that, the learner has no reason to test something they don't yet understand is shaping behavior.

---

## Summary

| Dimension | Status |
|-----------|--------|
| Layer-1 functional | Shipped, proven, solid |
| Sealing recipe | Correct — four layers, well-reasoned |
| Layer-2 ready | Concept sound; capture-vs-exec refactor + signing keys are the blockers |
| UX polish | 5 low-effort improvements, none blocking |
| Learner-ready | Belt 8+ only; excellent demonstration tool at that level |

---

*Alice, 2026-04-14*
