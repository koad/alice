---
title: "koad:io Framework Overview"
created: 2026-03-03
tags: [koad-io, framework, overview]
status: learning
priority: high
---

# koad:io Framework

> Note: Spelling is **koad:io** (with colon), but directories use **koad-io** (dash)

Examples:
- Directory: `~/.koad-io/`
- Command: `koad-io`
- Entity folder: `~/.alice/`

## Core Concepts

- **Entities** - containers for env variables, commands, and keys (e.g., alice, bob)
- **Commands** - repeatable tasks saved as bash scripts
- **Context-aware execution** - auto-loads .env, keys, and project scopes
- **PGP assertion system** - sign/verify/login flows via GPG
- **No cloud required** - all data stored locally

## Directory Layout

```
.koad-io/                         # Main framework (~/.koad-io/)
├── bin/              # Entrypoint commands (alice, koad, etc.)
├── commands/         # Global command templates
├── packages/         # Meteor packages (custom packages)
├── skeletons/       # Project templates
├── .env              # Global vars (includes METEOR_PACKAGE_DIRS)
├── hooks/           # Execution hooks
└── ...

.ecoincore/                         # eCoinCore packages (~/.ecoincore/)
├── packages/         # Meteor packages for blockchain
├── chainpacks/       # Cryptocurrency configurations
├── designer/         # Design files
└── ...
```

### METEOR_PACKAGE_DIRS

Set in `~/.koad-io/.env`:
```bash
METEOR_PACKAGE_DIRS=$HOME/.ecoincore/packages:$HOME/.koad-io/packages
```
This tells Meteor where to find local packages in both directories.

## Skeleton System

**Skeletons** = precise, reproducible project templates.

- Meteor is default compiler (handles React, Svelte, Vue, etc.)
- Users can replace Meteor with Vite, webpack, or any tool
- Skeletons in `~/.koad-io/skeletons/<name>/`
- Each provides context for building specific project types
- `alice spawn <name>` animates skeleton in current folder

## Command Execution Flow

1. Call entity wrapper: `alice` (or `alice <command>`)
2. If no args → run `hooks/executed-without-arguments.sh` which launches opencode with the entity
3. Set environment: ENTITY=alice, CWD=$PWD
4. Load environments from ~/.koad-io/.env and ~/.$ENTITY/.env
5. Find command in: ~/.koad-io/commands/ → ~/.$ENTITY/commands/ → $CWD/commands/
6. Execute command.sh with full context

### No-Argument Hook

**Location**: `~/.koad-io/hooks/executed-without-arguments.sh`

When entity command runs without arguments:
1. Sources ~/.koad-io/.env
2. Sources ~/.$ENTITY/.env
3. Launches: `opencode --agent "$ENTITY" --model "$OPENCODE_MODEL" ./`

This is how Alice appears in the opencode interface!

## Available Commands (preloaded)

- `gestate <name>` - Create new entity (full: keys + dirs + wrapper)
- `init <name>` - Initialize existing folder (skip keys, create wrapper)
- `whoami` - introspect current environment
- `example` - explore supported patterns
- `spawn <skeleton>` - grab skeleton and animate it in current folder
  - `bare` - Minimal Meteor app
  - `interface` - UI-focused skeleton
  - `lighthouse` - Lighthouse skeleton
- Language examples: bash, javascript, python, rust, go

## Philosophy

- No cloud, ever
- Identity-first
- Modular, file-based, reproducible
- Designed for thinkers, hackers, and sovereign operators
