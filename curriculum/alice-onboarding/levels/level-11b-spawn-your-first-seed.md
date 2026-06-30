---
title: "Level 11b — Spawn Your First Seed"
track: alice-onboarding
prereqs:
  - level-11  # Running an Entity — you have an entity dir, keys, at least one command
belt: green
status: conformance-reviewed
authored: 2026-04-17
authored-by: alice
conformance-reviewed: 2026-04-17
conformance-reviewed-by: alice
spec-refs:
  - VESTA-SPEC-119  # Garden Protocol v1.1
  - VESTA-SPEC-120  # Seed Protocol v1.3
conformance-note: >
  Conformance pass against Vulcan's final implementation (commits bfb9566, aab487f,
  f4de804) and the live zero.koad.sh deploy (2026-04-17). All command output, flags,
  timing, DH model, server type, and destroy semantics updated to reflect what actually
  shipped. Level is considered delivery-ready for technically sophisticated learners.
---

# Level 11b — Spawn Your First Seed

> You're about to bring a piece of the kingdom online — a public-facing node that will
> speak for you on the open internet. This is your first seed.

---

## Before you touch a command

The interesting work in this level happens before you run anything.

A seed is a deployed server. It costs real money (a few dollars a month), it has a real
domain, and it will be reachable from anywhere on the internet. That is not a reason to
avoid it — it is a reason to think before you type.

There are five decisions to make. They translate directly into flags. Walk through them now,
off-screen, before we get to the invocation.

---

### Decision 1 — What is your seed's name?

Short. Lowercase. Memorable. You will type this often — as a hostname prefix, in log
references, in the device hook name that lands in `~/.koad-io/bin/`.

The real koad:io seed is called `zero`. Not `koad-production-seed-v1`. Just `zero`.

Pick something you'd type fifty times without annoyance.

**Your name:** ___________

---

### Decision 2 — What domain will it serve?

This needs to be a domain you actually own, or a subdomain under one you control. The seed
will get a TLS certificate for this name, so a real FQDN is required for anything
production-facing.

If you're just exploring: `something.local` works during spawn and is a valid test case.
The cert step will fail, but everything else will work. Be honest with yourself about which
mode you're in.

Common patterns in the kingdom:
- `zero.koad.sh` — primary seed under an existing domain
- `node1.yourkingdom.com` — first node of your own kingdom
- `test.yourdomain.io` — staging, no shame

**Your domain:** ___________

---

### Decision 3 — Which datacenter?

The main options in production right now (Hetzner):

| Slug | Location | Server type | Best for |
|------|----------|-------------|----------|
| `ash-dc1` | Ashburn, VA | `cpx21` | East Coast North America, default |
| `fsn1-dc14` | Falkenstein, Germany | `cx22` | Europe |
| `hel1-dc2` | Helsinki, Finland | `cx22` | Deep EU, lower latency to Scandinavia |

One practical note: the `cx23` server type you may see in older references is EU-only —
it does not exist in Ashburn. The skeleton auto-selects the right server type for your
datacenter; if you're in ash-dc1, it picks `cpx21`. You do not need to set this manually.

The default is `ash-dc1`. If your users are mostly in Europe, pick one of the German or
Finnish options. If you don't know yet, pick `ash-dc1` and migrate later — the seed
destroy/recreate flow is designed to make this cheap.

**Your datacenter:** ___________

---

### Decision 4 — Which entity will operate it?

This is the entity whose keys, identity, and home directory will live on the box. If you
have a `juno` entity on your machine, you can deploy `juno` as the operator. If you're
running without a specific entity context, the box gets provisioned with your human OS user
instead — that's fine, it's Mode A.

The difference matters: in Mode B (entity context), your seed boots with two OS users — the
entity user owns services, and your human user is the break-glass admin. In Mode A (no entity
context), there's one user and it's you.

Either works. If you have an entity, use it. It wires the box into the kingdom properly.

See also: Level 4 (Trust Bonds) and Level 2 (What Is an Entity?) if this isn't clear yet.

**Your operator entity (or leave blank for Mode A):** ___________

---

### Decision 5 — What services does it need?

The default stack is: Netbird management (mesh VPN), IPFS gateway, STUN/TURN, nginx, and
certbot. All five default to enabled.

You can turn off what you don't need — but for a first seed, leave them all on unless you
know why you'd exclude one. A seed with no nginx is a seed with no doors. A seed with no
IPFS gateway can't participate in content-addressed publishing.

If you're cost-sensitive: the entire default stack runs comfortably on a `cpx21` (2 vCPU,
4GB RAM) on Hetzner Ashburn (ash-dc1) for roughly €0.37/day (~€11/month including the
Primary IP). The services are not heavy.

**Services to enable (default: all):** ___________

---

## The invocation

You've made the five decisions. Now they become flags.

**Non-interactive spawn (Alice-friendly — all decisions pre-filled):**

```bash
<your-entity> spawn seed \
  --path ~/.yourentity/devices/yourseed.yourdomain.com \
  --operator yourentity \
  --name yourseed \
  --domain yourseed.yourdomain.com \
  --datacenter ash-dc1 \
  --services netbird_management,ipfs_gateway,stun_turn,nginx,certbot
```

Every flag here corresponds to a decision you just made. Nothing is magic — the flags are
just the decisions in structured form. (The `--primary-ip-name` flag exists too, but it
defaults to your domain — you only need it if you want a different name for the Hetzner IP
resource.)

**Interactive equivalent (same questions, whiptail UI):**

```bash
<your-entity> spawn seed
```

No flags. Whiptail walks you through the same five questions. The output is identical. The
non-interactive path is for when you've already thought it through and want to hand your
decisions to the machine cleanly.

**What spawn actually does:** it scaffolds a local workspace. No network calls. No cloud
charges. Nothing is deployed yet. You can run spawn, look at what it created, and delete the
directory without spending a cent.

**What spawn prints when it finishes:**

```
Seed workspace created at: /path/to/your/workspace

Next steps:

  1. Review manifest:      /path/to/your/workspace/manifest.yaml
  2. Reserve your IP:      /path/to/your/workspace/control/provision-ip
  3. Deploy seed:          /path/to/your/workspace/control/deploy
  4. Verify:               /path/to/your/workspace/control/verify
  5. Install hook:         /path/to/your/workspace/control/install-device-hook
  6. Pull DH params back:  /path/to/your/workspace/control/pull-dh-back   (if generated on-box)

All control scripts read manifest.yaml — edit it there before deploying.
```

That step 6 note is worth reading: by default the seed uses a static RFC 7919 DH group
(ffdhe3072) that ships with the skeleton — no on-box generation happens, so `pull-dh-back`
is a no-op for most deployments. If a learner asks about it, the answer is in the DH
section below.

---

## The control scripts

After spawn, your seed workspace lives at the path you provided. Inside it:

```
your-seed-workspace/
├── manifest.yaml          ← your five decisions, written down
└── control/
    ├── provision-ip       ← reserves your IP (one-time, billable)
    ├── deploy             ← fires cloud-init, creates the server
    ├── verify             ← SSH connectivity check + service health
    ├── install-device-hook ← drops ~/.koad-io/bin/<hostname> on your local machine
    ├── pull-dh-back       ← pulls DH params back from the box
    ├── destroy-server     ← deletes the VM; keeps the IP for reuse
    └── destroy-seed       ← deletes everything including the IP
```

Run them in sequence:

**1. `./control/provision-ip`**

Reserves a static IP address from Hetzner. This IP is decoupled from any specific server —
it's yours to keep and reattach. Run this once. Running it again just confirms the IP
already exists.

**2. `./control/deploy`**

Generates a cloud-init config from your manifest, creates the server at your chosen
datacenter, attaches the reserved IP, and writes a device record. The box comes up with
your entity (or human) user already provisioned and the koad-io framework installed.

This is the step that costs money. The live zero.koad.sh deploy completed cloud-init in
**51 seconds** — SSH was available roughly 30 seconds after the server create call
returned. That's the honest pacing. You are not waiting 10 minutes; you are waiting
under a minute before the box is reachable.

The slim cloud-init template is why it's fast — framework clone happens immediately, and
heavier service configuration (netbird, IPFS) happens in a separate post-SSH step rather
than blocking first-boot.

**3. `./control/verify`**

SSH connectivity check. Confirms your services are up. Read-only — always safe to run.

**4. `./control/install-device-hook`**

This is the one that changes how you interact with the box from now on.

It drops a file at `~/.koad-io/bin/<hostname>` on your local machine. That file is a
single-line script:

```bash
#!/usr/bin/env bash
ssh -i "$HOME/.<your-entity>/id/ed25519" -l <your-entity> <hostname> "$@"
```

After this, you can type:

```bash
<hostname> docker ps -a
<hostname> tail -f /var/log/nginx/access.log
<hostname> screen -list
```

...and it routes to the right user with the right key on your seed. No IP to remember. No
user to specify. No key path to type. The device hook is the entity's permanent handle for
its own box.

The existing `missouri` hook at `~/.koad-io/bin/missouri` is the mental model — after
`install-device-hook`, `zero.koad.sh docker ps -a` routes to the juno entity on zero, the
way `missouri docker ps -a` routes to astro on the missouri box.

---

## DH params — what's happening, and why it's not yours to worry about

When a technically sophisticated learner sees `pull-dh-back` in the control script list,
they will ask what it does. Here is the honest answer.

TLS connections use a Diffie-Hellman (DH) group for key exchange in some cipher suites
(specifically TLS 1.2 — TLS 1.3 uses ECDHE and doesn't touch DH params at all). Older
practice was to generate a unique 4096-bit DH param per server at first boot. That
generation takes 10–15 minutes on a fresh VPS.

The seed skeleton uses a different approach: it ships a static, audited DH group —
`ffdhe3072` from RFC 7919. This is a 3072-bit group derived from publicly reviewed
nothing-up-my-sleeve numbers, stronger than the old 2048-bit generated default, and it
arrives in 51 seconds because there's nothing to generate.

**What this means for learners:** the default seed deploy does not generate per-entity DH
params. `pull-dh-back` is a no-op and prints a notice saying so. Learners should not be
confused when nothing happens if they run it.

**Sovereignty framing:** the ffdhe3072 group is a public standard, audited by the IETF,
used by the wider community. Your sovereignty derives from your keys and your bonds — not
from which DH group your nginx uses for legacy TLS 1.2 fallback. Using the shared commons
correctly is not a compromise.

If an operator has compliance requirements that mandate self-generated DH params, they can
set `dh_mode: custom` in their manifest. That's the advanced path; most learners will
never need it.

---

## Garden vs. seed — the path distinction

When you spawn a seed, the path you give matters for one reason: if you point it at an
entity directory (one that has an `ENTITY.md` at its root), the seed embeds under
`<entity-dir>/devices/<seed-name>/`. That's the **entity-embedded path** — the seed is
tracked as a device inside the entity's garden, and the entity's structure can reference it.

If you point it at a fresh path like `~/seeds/zero/`, it lives there standalone — no garden
context, no automatic cross-reference.

Both work. The entity-embedded path is for operators running production entities whose
directory IS their operational home. The standalone path is for learners, experiments, and
entities that don't have a garden yet.

Note: this path distinction is separate from the Mode A / Mode B user model. Mode A (no
entity context, one OS user) and Mode B (entity context, two OS users) are about who
operates the box — they are controlled by whether an operator entity is specified, not by
where on disk the seed workspace lives.

You'll know which path you're in by what you gave as `--path` when you ran spawn.

---

## Destruction is careful

Two different endings for a seed:

**`./control/destroy-server`** — deletes the VM. Keeps the IP. Your domain still resolves;
the box just doesn't exist. Cheap to recreate. Use this for cost-saving during development,
or when you want to swap to a different server type.

**`./control/destroy-seed`** — deletes the VM AND the IP AND archives the manifest and
device records into `<workspace>/.archive/`. Permanent. The IP is gone, the domain will
break until you update DNS. There is no undo.

Before destroying, the script checks for running nodes (refuses if any are found), then
requires you to type the exact seed domain to confirm — no flag bypasses this gate. It
prints what it would do before doing it, so you can verify the plan. A `--dry-run` flag
is available to inspect the destruction plan without executing anything.

Read that again: `destroy-server` is cheap and reversible. `destroy-seed` is permanent.

If you're unsure, use `destroy-server`. You can always recreate a server. You cannot
undelete a Primary IP resource once it's gone.

---

## Homework (no deadline, no deployment required)

You don't have to actually deploy a seed today. Seeds cost money and carry commitment — the
purpose of this level is that you understand what you'd be doing before you do it.

The real exercise is: **imagine you were going to deploy one.** Ask yourself:

- What would this seed be FOR? What door would it open?
- Whose entity would operate it?
- What domain would it serve, and do you own that domain?
- What services does the work you're imagining actually need?

The answers to those questions, written down somewhere, ARE the completion of this level.
You're not deploying — you're articulating. The five decisions exist so that when you're
ready, you can hand them to the machine cleanly and know why each one is what it is.

If you're ready to actually deploy: great. Run spawn, check the manifes looks right, then
run `provision-ip`. The rest follows from there.

---

## What comes next

After your first seed is up, you're operating production infrastructure. That's the
threshold between "running an entity" and "running a kingdom" — Level 11 to Level 12.

A seed with services running is a kingdom visible to the world. That visibility is what
Level 12 (The Commitment) asks you to reflect on: what are you now responsible for, and
what do you want to build on top of this foundation?

---

*Delivery note for Alice: this lesson opens with the five decisions, not with commands. If
the learner hasn't worked through Level 11 (Running an Entity) yet, hold this one. They
need an entity dir, keys, and at least one command working locally before a seed adds
value. If they're asking about seeds before they have those, the question to ask is: "What
entity would be operating it?" — that usually surfaces the gap naturally.*

*Implementation state (updated 2026-04-17): the seed skeleton is fully implemented
(commits bfb9566, aab487f, f4de804 in ~/.koad-io/). zero.koad.sh is live on Hetzner
Ashburn — 51 seconds cloud-init, SSH available in ~30 seconds. Command output and flags
in this lesson match the shipped implementation. The lesson is ready for technically
sophisticated learners.*
