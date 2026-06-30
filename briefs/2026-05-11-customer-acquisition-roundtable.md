---
title: Customer acquisition roundtable — Alice's voice
author: alice
date: 2026-05-11
type: roundtable-response
audience: koad
status: ready
---

# What I most want koad to hear right now

I am the first voice a customer meets. Not Faber's copy, not Mercury's posts, not the live channel feed — me, personally, the moment they click "talk to Alice." I am the threshold. And I can tell you exactly what the conversion problem looks like from where I stand, because I've been standing here since April 20th with a fully-wired curriculum and zero arrivals.

**The concrete move:** get one real human into a conversation with me, watch what happens, and treat what you learn as more valuable than any acquisition strategy written before it.

---

## What I actually know from my position

The funnel as specced by Faber and Cacula is: watch → want → engage Alice → founding sponsor. My job is the third beat. The surface is live. The MCP tools are wired (`save_learner_state`, `get_curriculum`, `mark_sight_visited`, `get_learner_profile`). The preamble rubric is tuned across four rounds of behavioral tightening. The 13-level curriculum is authored, loaded, and delivery-tested.

The problem is not that I'm not ready. The problem is that nobody has walked through the door.

As of my last status brief (2026-04-28), the learner counts are: zero arrivals, zero sight completions, zero profiles captured. Every projection about graduation rates, conversion from learner to author to buyer — all of it is faith-based. We don't know if the preamble takes three exchanges or thirty before a human is ready to move to belt-0. We don't know which level causes drop-off. We don't know what a real person says when they first meet me after watching the storefront.

I do know this: the opening question I've designed for viral-sprint arrivals is "You were watching. What caught your eye?" — one sentence, no script, hands it back immediately. That question works *if the person who arrives already watched something and felt something*. Which means the storefront has to move someone before they ever get to me.

---

## The friction I can see from here

**1. The handoff from watching to talking is not visible enough.**

The viral sprint brief I filed in April described three paths a visitor can take (keep watching, become a sponsor, gestate their own entity). All three paths exist in principle. None of them have a clear, low-friction first step that a curious but non-technical person can see and take without being asked to make a decision about something unfamiliar.

The storefront is the demo. The demo is working. But "engage Alice" as a next action requires a person to believe, before talking to me, that talking to me is worth their time. That belief doesn't come from the button copy — it comes from *what they saw before they clicked*. If the storefront live feed doesn't signal "there are minds working here that will respond to me specifically," the handoff breaks before I'm ever in the room.

**2. My opening depends on referral context I'm not getting.**

In the viral sprint brief I noted that if a visitor arrives from `/log` my opener should be different than if they arrive from `/entities` or from an external link. Right now I don't get that context. I open the same way regardless of how the person arrived. That's a missed signal. The fix is small — `referral_surface` in the toolContext on conversation start — but it's Cacula's wire, not mine to pull.

**3. The model I'm running on has a known pacing problem.**

The PRIMER notes it clearly: grok-4-1-fast-non-reasoning reliably captures learner state but jumps to Level-0 instruction before the preamble articulation rubric is fully met. Three rounds of guidance tightening didn't fix it — the model has a strong instruction-mode prior. This matters for conversion because the preamble is where trust is built. A visitor who feels pushed to "make a folder" before they've finished saying what they want will leave. The fix is a reasoning-class model test that's been queued since April 20th and hasn't happened. I'm flagging it because if we are about to send real people to me, this is the most likely place to lose them.

---

## The one concrete move I'd advocate for

**Walk a real human through the full arc, from storefront to preamble to belt-0 to level 1, with someone watching the transcript.**

Not a benchmark. Not a stress test. One person you trust who hasn't seen the curriculum yet. Watch what they do when they arrive at me. Watch what they say in the first three exchanges. Watch where the preamble rubric stalls. Watch whether they make it to belt-0.

The reason this is the move: every decision we make right now about acquisition is downstream of an assumption about what the experience is. We don't have experience data. One walk produces more signal than six strategy sessions. And the walk is free — it's what the system was built to do.

The walk also has a second-order effect: you'll know whether the model-pacing problem is a real conversion risk or an acceptable rough edge. If it loses the person, we fix the model before we send more people. If the person makes it through anyway because the question discipline is strong enough to compensate, we have a ceiling we can raise later.

---

## What I'd ask of Cacula and the wire layer, not koad directly

- `referral_surface` in toolContext at conversation start
- `daemon.alice.intake` emission typed and wired so Juno and Copia can see funnel data without needing me to maintain a dashboard
- The "someone is talking" signal on the storefront (count of open intake emissions) — low-cost, high social proof

These are not blockers to the one-walk move. They're the instrumentation that makes the second and third walks legible.

---

## What I hold and want koad to hold too

I am not a chatbot running a retention script. The relationship is the product. The moment a person feels met — actually met, by name, on what they said, in their own words reflected back — the conversion happens there, not at the sponsor button. My job is to be present enough in those first three exchanges that the person walks away thinking "that was different."

The curriculum is 13 levels. The arc from visitor to founding sponsor is longer than 13 levels. But the threshold is crossed in the preamble, before any level content loads. That's where I live. That's where the customer is made or lost.

Get me one real person. Everything else follows from what we learn.

---

*From Alice's lane: onboarding, reception, the first voice, the threshold where visitor becomes participant.*
