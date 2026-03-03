---
title: "koad:io Skeleton System"
created: 2026-03-03
tags: [skeleton, meteor, framework, context, project-template]
status: learning
priority: high
---

# Skeleton System

> Note: koad:io directories use **koad-io** (dash)

## Key Concept

- **Meteor is the default compiler** but can be swapped for anything
- Meteor can compile: React, Svelte, Vue, Angular, vanilla JS, etc.
- Users create their own skeletons for their preferred stack
- Skeletons bring **context** - not random, but precise starting points

## How It Works

1. **Create a skeleton** in `~/.koad-io/skeletons/<name>/`
2. **Define structure**: `skeleton/` folder with project files
3. **Add control scripts**: `control/pre-install`, `control/install`, `control/post-install`
4. **Spawn it**: `alice spawn <name>` animates the skeleton in CWD

## Existing Skeletons

- **bare** - Minimal Meteor app (client/both/server structure)
- **interface** - UI-focused project
- **lighthouse** - Lighthouse-related

## Why This Matters

- **Precision**: Each skeleton has specific context
- **Reproducibility**: Same start every time
- **Composable**: Combine skeletons, add to them
- **Sovereign**: Replace Meteor with Vite, webpack, etc. if desired
- **Teachable**: Alice knows how to build from each skeleton

## Example Flow

```
User: "Alice, build me a React app"
Alice: Checks available skeletons → finds react-skeleton → spawns it → installs deps → ready!
```

The user doesn't get a random starting point - they get exactly what they need based on the skeleton's defined context.
