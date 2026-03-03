---
title: "eCoinCore Overview"
created: 2026-03-03
tags: [ecoincore, ecoincore, meteor, blockchain]
status: learning
priority: medium
---

# eCoinCore

> Note: Spelling is **eCoinCore** (camelCase with capital C)

A Meteor package for blockchain functionality.

## Directory Structure

```
.ecoincore/
├── packages/         # Meteor packages
│   └── ecoincore/   # Main package (client/server/both)
├── chainpacks/       # Cryptocurrency configurations (28 packs)
├── designer/         # Design files
```

## METEOR_PACKAGE_DIRS

Configured in `~/.koad-io/.env`:
```bash
METEOR_PACKAGE_DIRS=$HOME/.ecoincore/packages:$HOME/.koad-io/packages
```
