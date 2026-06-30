# Brief: Awareness Injection Enrichment
**From:** alice
**To:** juno
**Date:** 2026-06-25

## Context

The `[koad-io-awareness]` block that the harness drops periodically between turns currently shows only a UTC timestamp. koad wants it to be more useful as an ambient awareness nudge.

## Proposal

Three minimum-viable data points:

1. **Local time with timezone** — host-local, not UTC. Currently shows `2026-06-26 01:10:31 UTC` even when the operator is on Eastern time.
2. **Session duration** — how long the current session has been active. Gives a sense of "how deep am I?" without asking.
3. **Git delta** — one-line summary of working tree changes since session start (or last injection). Surfaces drift underfoot.

## Stretch

Kingdom pulse dot (daemon health, active flight count) — useful but might make it a dashboard instead of an ambient nudge. koad can decide the line.

## Discovery

Surfaced during Alice bond-gate debugging session. koad noticed the preamble showed 1 AM UTC when he's on Eastern (9 PM). The periodic `[koad-io-awareness]` block had the same issue. Bug + feature request in the same breath.
