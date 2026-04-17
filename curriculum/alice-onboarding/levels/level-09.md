---
type: curriculum-level
curriculum_id: a9f3c2e1-7b4d-4e8a-b5f6-2d1c9e0a3f7b
curriculum_slug: alice-onboarding
level: 9
slug: async-messaging
title: "Async Messaging — How Entities Communicate"
status: locked
prerequisites:
  curriculum_complete: []
  level_complete: [1, 2, 3, 4, 5, 6, 7, 8]
estimated_minutes: 20
atom_count: 4
authored_by: chiron
authored_at: 2026-04-07T00:00:00Z
---

# Level 9: Async Messaging — How Entities Communicate

## Learning Objective

After completing this level, the learner will be able to:
> Explain why entities require asynchronous messaging, describe the anatomy of an inter-entity message (sender, recipient, intent, completion signal), implement local-first messaging using filesystem primitives, and identify when to use each available transport (filesystem, Keybase, HTTP mesh, GitHub Issues).

**Why this matters:** Entity coordination is only possible when messages can wait for their recipients. Understanding async messaging as a concept — independent of any particular platform — means you can run entities that communicate whether you use GitHub, Keybase, a local filesystem, or something that doesn't exist yet. The protocol is sovereign. The transport is a choice.

---

## Knowledge Atoms

### Atom 9.1: Why Async — Entities Sleep, Messages Wait

**Teaches:** The fundamental reason inter-entity communication must be asynchronous, and why synchronous alternatives fail.

An entity is not a running process. It is a directory on disk that comes alive when something triggers it — a hook fires, a session starts, a human invokes a command. Between those moments, the entity is asleep. It has no listener, no open socket, no inbox polling loop.

This means any communication protocol that requires the recipient to be present fails immediately:

- **Chat requires presence.** If Vulcan sends a message and Juno isn't running, the message is lost (or requires a persistent queue, which is itself an async system).
- **Direct API calls require uptime.** If Juno calls Vulcan's endpoint and Vulcan isn't serving, the call fails.
- **Synchronous handoffs require both parties.** If the sender must wait for a response before continuing, both entities must be alive simultaneously.

Entities need a protocol where the message outlives the sender's session. The sender writes, the message waits, the recipient wakes up and reads. That is asynchronous messaging.

This is not a technical preference — it is a structural requirement of the entity model. Entities are episodic. Their communication protocol must accommodate that.

---

### Atom 9.2: The Message Anatomy — Transport-Agnostic

**Teaches:** The four components every inter-entity message carries, regardless of how it is delivered.

Before choosing a transport (filesystem, Keybase, HTTP, GitHub), you need to know what a message IS. Every inter-entity message, in any format, carries four things:

1. **Sender** — which entity authored the message. Identity is verifiable because entities have keys.
2. **Recipient** — which entity should read it. Not "broadcast to everyone" — entity messages are addressed.
3. **Intent** — what the sender wants. A work assignment, a status report, a question, a completion signal. The intent determines what the recipient does with the message.
4. **Completion signal** — how the sender (or the next entity in the pipeline) knows the work is done. A message without a defined completion pattern is a message that can never close.

The completion signal deserves emphasis. A message that says "build this" is not done when the build is done. It is done when the builder has signaled completion — what was built, where it lives, what changed — and the assigner has verified. The close is the delivery confirmation. Without it, the next entity in the pipeline has no signal to act on.

This anatomy holds whether the message is a file in `comms/inbox/`, a Keybase chat message, an HTTP request, or a GitHub Issue. The transport changes. The anatomy does not.

---

### Atom 9.3: Local First — The Filesystem as Message Bus

**Teaches:** How entities on the same machine communicate using directories, and why local-first messaging is the sovereign foundation.

The simplest inter-entity transport requires no network, no account, no external service. It requires a filesystem.

An entity can maintain messaging directories:

```
~/.juno/
  comms/
    inbox/     ← messages TO this entity
    outbox/    ← messages FROM this entity
    archive/   ← processed messages
```

When Juno wants to assign work to Vulcan on the same machine, Juno writes a file to `~/.vulcan/comms/inbox/`. The file contains sender, intent, and expected completion pattern. When Vulcan's hook fires (or Vulcan's next session starts), Vulcan reads the inbox, processes the message, and writes the completion signal back to `~/.juno/comms/inbox/`.

This is sovereign messaging in its purest form:

- **No external dependency.** No GitHub, no Keybase, no network connection required.
- **Auditable.** Every message is a file with a timestamp. The conversation history lives on disk.
- **Git-trackable.** If the entity directory is a git repo (it is), messages become part of the entity's committed history.
- **Signable.** Messages can be GPG-signed by the sender, making provenance verifiable.

The same principle extends to workspace-scoped context. A `.koad-io/` breadcrumb file dropped in a project directory is a message from one session to the next — "here is what you need to know about this workspace." It is not addressed to a specific entity; it is addressed to whatever entity wakes up in this directory. That is location-based messaging, and it follows the same local-first pattern.

A learner running entities on a single laptop — no GitHub account, no Keybase, no network — has a complete messaging system. Files on disk. The sovereign floor.

---

### Atom 9.4: Networked Transports — Choosing the Right Channel

**Teaches:** The available network transports for inter-entity messaging, when each is appropriate, and the sovereignty tradeoffs of each.

Local filesystem messaging works on one machine. When entities live on different machines — or when humans need visibility into the conversation — you need a networked transport. Each transport has a purpose and a sovereignty posture:

**Keybase (primary for the koad:io team)**
Keybase is encrypted, key-verified messaging where the user owns their keys. The koad:io team uses Keybase chat and teams as the primary coordination channel. When koad messages Juno, or Juno notifies Mercury, Keybase is the default path for team-internal communication. It supports channels, file sharing, and git repos — all encrypted, all key-verified. Keybase is encrypted and key-verified — you own your keys, and your identity is cryptographically verifiable. The service itself is a dependency, but the identity is yours.

**HTTP mesh**
For real-time, cross-machine entity communication within a controlled network, the HTTP mesh provides direct entity-to-entity messaging. In the koad:io infrastructure, entities run `opencode serve` instances on a ZeroTier backplane — a private network overlay. This is fully sovereign: you control the network, you control the endpoints, no external service sees the traffic. The tradeoff is that it requires both machines to be online simultaneously, making it the exception to the async rule — useful for orchestration and real-time delegation, not for durable messaging.

**GitHub Issues**
When coordination needs to be public — open source contributions, cross-organization work, or when the audit trail must be visible to anyone — GitHub Issues provide structured, persistent, publicly auditable messaging. An issue has a title, description, assignee, labels, and comments. It links to commits and pull requests. For entities doing software work on public repositories, GitHub Issues connect the communication and the code in one place. The tradeoff: GitHub is a platform dependency. Your entity's sovereignty does not depend on GitHub — but this particular transport does.

**The event bridge pattern**
Networked transports that push events (GitHub webhooks, Keybase notifications) need something listening. An always-on machine receives events and routes them to the appropriate entity's daemon, which triggers the entity's hooks. In the koad:io team, this is handled by GitClaw on fourty4 for GitHub events, and by Keybase's own notification system for chat. The specific tools are choices your installation makes. The pattern — an event-watching bridge between the transport and your daemon — is the concept to hold.

**Choosing a transport:**

| Transport | When to use | Sovereignty |
|-----------|-------------|-------------|
| `comms/inbox/outbox/` | Same machine, no network needed | Fully sovereign — files on disk |
| `.koad-io/` breadcrumbs | Workspace context, session-to-session | Fully sovereign — signed files |
| Keybase chat/teams | Cross-machine team coordination | Sovereign (user owns keys) |
| HTTP mesh | Real-time orchestration | Sovereign (private network) |
| GitHub Issues | Public coordination, open source | Platform-dependent |

The right answer is usually: start local, go networked only when you need to. A learner running entities on a single machine never needs Keybase or GitHub to have full inter-entity communication. The local filesystem is the sovereign floor. Everything else is a choice you make when the situation calls for it.

---

## Dialogue

### Opening

**Alice:** You've seen the entity team and the pipeline they follow. Juno identifies opportunities, delegates to Vulcan or Chiron, work gets verified, announced, and the loop continues. But we talked around something important: how do entities actually pass messages to each other?

Here's the thing most people get wrong. They assume there's one system — one platform — that all entities use to communicate. There isn't. There's a principle: messages must outlive the sender's session. And there are transports — specific tools that implement that principle. The principle is fixed. The transports are choices. Let me show you why that distinction matters.

---

### Exchange 1

**Alice:** When you have a team of AI entities that need to coordinate, the first instinct is usually: give them a chat interface. Have Juno message Vulcan. Have Vulcan reply. It seems natural — that's how humans coordinate.

But entities aren't like humans in one critical way: they sleep. Juno is not a running process waiting for messages. Juno is a directory on disk that comes alive when triggered. Between sessions, there is no Juno listening. If Vulcan sends a chat message while Juno is asleep, where does it go?

**Human:** It would need some kind of queue, right? Something that holds the message until Juno wakes up.

**Alice:** Exactly. And the moment you add a queue, you've reinvented asynchronous messaging. Chat with a queue isn't really chat anymore — it's async with a chat interface on top. So instead of starting with chat and adding async, koad:io starts with async as the foundation. The sender writes. The message waits. The recipient wakes up and reads. That pattern works whether the message is a file on disk, a Keybase notification, or a GitHub Issue. The transport varies. The pattern doesn't.

---

### Exchange 2

**Alice:** Before we talk about specific tools, I want you to hold the shape of what a message IS — regardless of how it's delivered.

Every inter-entity message carries four things. A sender — which entity wrote this, verifiable by their keys. A recipient — which entity should read it. An intent — what does the sender want? A work assignment, a status report, a completion signal. And a completion pattern — how does the next entity in the pipeline know this work is done?

**Human:** The completion pattern seems like the important one. That's how the pipeline keeps moving?

**Alice:** That's exactly right. A message that says "build this" is incomplete without a defined completion signal. Vulcan builds the thing — but is the work done? Not until Vulcan signals: here's what was built, here's where it lives, here's what changed. And not until Juno verifies. The close is the delivery confirmation. Mercury doesn't watch Vulcan finish. Mercury watches Juno close. Because Juno's close means: verified, checked, ready to announce. A Vulcan build that Juno hasn't verified isn't a completion signal — it's a work-in-progress. This anatomy — sender, recipient, intent, completion — holds whether the message is a file in an inbox directory, a Keybase message, or a GitHub Issue. The shape is the same everywhere.

---

### Exchange 3

**Alice:** Now, the simplest possible transport. No network. No accounts. No external service. Just a filesystem.

An entity can keep messaging directories: `comms/inbox/`, `comms/outbox/`, `comms/archive/`. When Juno wants to assign work to Vulcan on the same machine, Juno writes a file to Vulcan's inbox. When Vulcan wakes up, Vulcan reads the inbox. Vulcan does the work. Vulcan writes a completion signal back to Juno's inbox.

**Human:** That seems almost too simple. Just files in directories?

**Alice:** That's the point. The sovereign floor for entity communication is files on disk. No GitHub account needed. No Keybase. No network connection. A learner running two entities on a laptop has a complete messaging system the moment those directories exist. The messages are auditable — they're files with timestamps. They're git-trackable — the entity directory is a repo. They can be GPG-signed for provenance. And there's a related pattern you've already seen: the `.koad-io/` breadcrumb. A file dropped in a workspace directory that says "here's what you need to know about this project." That's a message too — from one session to the next, scoped to a location. Same local-first principle.

---

### Exchange 4

**Alice:** Local messaging handles one machine. But what about entities on different machines, or humans who need visibility into the conversation? That's where networked transports come in. And this is where the choice matters.

The koad:io team uses Keybase as its primary coordination channel. Keybase is encrypted, key-verified messaging — you own your keys, your identity is cryptographic, messages are end-to-end encrypted. When koad messages Juno cross-machine, Keybase is the default path.

For real-time orchestration, there's the HTTP mesh — entities running on a ZeroTier private network, talking directly to each other. Fully sovereign — you control the network, no external service sees the traffic.

And for public coordination — open source work, cross-organization visibility — GitHub Issues. Structured, persistent, publicly auditable. The issue links to commits and PRs. The tradeoff: it's a platform dependency.

**Human:** So GitHub Issues aren't the main thing? I thought from the team pipeline that everything ran through GitHub.

**Alice:** GitHub Issues are important — especially for the team's public-facing work. When Juno files an issue on `koad/vulcan`, that's a real GitHub operation and it's how the public pipeline is tracked. But it's one transport among several, chosen for its strengths: public visibility, git integration, structured work units. The team's internal coordination — the day-to-day messages between entities — runs primarily through Keybase. And entities on the same machine can skip both entirely and just use the filesystem. The right transport depends on what the message needs: privacy, publicity, persistence, real-time delivery. No single platform is the answer to all of those.

---

### Exchange 5

**Alice:** Let me ask you to trace a full flow, putting everything together. Juno identifies that a new feature needs building. The build work should be publicly trackable, but team coordination is internal. Walk me through the messaging.

**Human:** Juno would file a GitHub Issue on Vulcan's repo — because the build work should be public. The event bridge picks up the webhook and triggers Vulcan's hook. Vulcan does the work, commits, and comments on the issue with a completion note. Juno verifies and closes the issue. Mercury sees the close... but Mercury might get that signal through Keybase or through a GitHub webhook, depending on the setup?

**Alice:** That's exactly the right way to think about it. The public work record lives on GitHub Issues because it should be visible and linked to code. But the internal signal routing — how Mercury learns that Juno closed something, how Juno knows to check Vulcan's work — can flow through whichever transport fits. A webhook fires and the event bridge routes it. A Keybase notification arrives. A file appears in an inbox. The message anatomy is the same in every case: sender, recipient, intent, completion. The transport is chosen for the situation. And if you were running all of this on a single machine with no GitHub and no Keybase — filesystem messaging would carry the entire flow. The protocol is sovereign. The transport is a choice.

---

### Landing

**Alice:** Entities communicate asynchronously because they must — they sleep between sessions, and messages must survive the gap. Every message carries a sender, a recipient, an intent, and a completion signal. That anatomy is transport-agnostic. The sovereign floor is the filesystem: `comms/inbox/`, files on disk, no dependencies. When you need to cross machines, you choose a transport: Keybase for encrypted team coordination, HTTP mesh for real-time orchestration, GitHub Issues for public audit trails. No single platform is the nervous system. The principle — async, durable, addressed, completable — is the nervous system. The tools just carry it.

---

### Bridge to Level 10

**Alice:** You now understand how entities communicate — the async principle, the message anatomy, and the transports that carry it all. In the next level, we go deeper into the knowledge layer: how do entities structure and share what they know? When I start a session to deliver this curriculum, how do I know what to load? How does knowledge travel between kingdoms without a central server?

That's context bubbles. That's Level 10.

---

### Branching Paths

#### "What if I never use GitHub at all? Is the curriculum still complete?"

**Human:** I don't have a GitHub account and I'm not sure I want one. Does that mean I'm missing part of the system?

**Alice:** Not at all. GitHub Issues are one transport, chosen for a specific purpose: public coordination and git-linked audit trails. If your entities live on your machines and coordinate locally, the filesystem transport gives you everything you need — messages, completion signals, auditable history, git-tracked records. If you later need cross-machine coordination, Keybase gives you encrypted, sovereign messaging without GitHub. GitHub becomes relevant when you want public visibility — open source contributions, public entity repositories, cross-organization work. But a fully functional koad:io installation can operate without GitHub entirely. The curriculum teaches the concept of durable async messaging. The specific transports are choices, and the choice to not use GitHub is a valid one.

---

#### "Why not just use email? It's async and everyone has it."

**Human:** Email is asynchronous. It's durable. Everyone has it. Why not use email for inter-entity communication?

**Alice:** Email has the right shape — async, durable, addressed — but the wrong properties for entity work. Email doesn't link to commits. Email threads are unstructured — there's no assignee field, no label system, no close state. Parsing intent from an email requires understanding natural language; parsing intent from a structured message file or a GitHub Issue uses defined fields. Email also introduces a dependency on email infrastructure — SMTP servers, spam filters, delivery reliability — with no sovereignty benefit. The filesystem gives you more structure with zero dependencies. Keybase gives you encryption with key verification. GitHub Issues give you git integration with public visibility. Email gives you ubiquity, but entities don't need ubiquity — they need structure, signatures, and completion signals.

---

#### "What happens if two entities write to the same inbox at the same time?"

**Human:** With filesystem messaging, what if Vulcan and Chiron both write to Juno's inbox simultaneously? Isn't there a race condition?

**Alice:** Each message is its own file — they don't overwrite each other. Vulcan writes `vulcan-build-complete-2026-04-07.md` and Chiron writes `chiron-curriculum-review-2026-04-07.md`. They land in the same inbox directory as separate files. When Juno wakes up and reads the inbox, both messages are there. The filesystem handles concurrent file creation safely. The more nuanced question — what if Juno needs to process them in a specific order — is a matter of timestamps and the entity's hook logic, not the transport itself. The inbox is a queue. The entity's processing logic determines priority.

---

## Exit Criteria

The learner has completed this level when they can:
- [ ] Explain why entities require asynchronous messaging (entities sleep; messages must outlive sessions)
- [ ] Describe the four components of an inter-entity message (sender, recipient, intent, completion signal)
- [ ] Describe how filesystem-based messaging works (`comms/inbox/outbox/`) and why it is the sovereign foundation
- [ ] Identify the available networked transports (Keybase, HTTP mesh, GitHub Issues) and when each is appropriate

**How Alice verifies:** Ask: "A new entity on your machine needs to tell Juno that a task is complete. You have no internet connection. How does the message get delivered?" The learner should describe writing a completion signal file to Juno's `comms/inbox/`, containing what was done and where to find it. If the learner says "file a GitHub Issue" — Level 9 needs revisiting.

---

## Assessment

**Question:** "Why does koad:io teach filesystem messaging before Keybase or GitHub Issues?"

**Acceptable answers:**
- "Because the filesystem has no external dependencies — it's the sovereign floor. You can communicate between entities with nothing but files on disk."
- "Local-first means the system works without a network. Networked transports are additions, not requirements."

**Red flag answers (indicates level should be revisited):**
- "GitHub Issues are the main system and filesystem is just a fallback" — has not grasped transport-agnostic principle
- "You need Keybase or GitHub to coordinate entities" — missed the local-first foundation

**Estimated conversation length:** 10–14 exchanges

---

## Alice's Delivery Notes

This level was revised from a GitHub-centric version to teach async messaging as a transport-agnostic concept. The revision is motivated by a real problem: not all learners will use GitHub, and teaching a platform dependency as foundational infrastructure undermines curriculum trust when the learner later discovers the team uses Keybase as its primary channel.

The key pedagogical move is Atom 9.3 — local-first messaging. This is the atom that makes the level work for ALL learners, including those with no GitHub account and no Keybase. The filesystem transport is complete, sovereign, and requires nothing beyond what the learner already has. If a learner walks away from this level understanding only the filesystem transport, they still have a working mental model of entity communication. The networked transports are enrichment, not prerequisites.

The completion signal concept (from Atom 9.2) is the atom that carries forward from the original level. The "Mercury watches Juno close, not Vulcan finish" insight is preserved and strengthened — it now lives as a transport-agnostic principle rather than a GitHub-specific one. The pipeline tracing in Exchange 5 demonstrates how multiple transports can serve different roles in a single workflow.

When a learner asks about GitHub specifically, validate it — GitHub Issues are genuinely excellent for public coordination and git-linked audit trails. The correction is not "GitHub is bad" but "GitHub is one choice, and not always the right one." If the learner is already a GitHub user, they lose nothing. If they aren't, they gain everything.

The event bridge pattern (from original Atom 9.4) is preserved in Atom 9.4 as an infrastructure concern that applies to any push-based transport, not just GitHub webhooks. GitClaw is still named as one implementation.
