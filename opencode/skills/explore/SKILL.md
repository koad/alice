---
name: explore
description: Explore the koad:io ecosystem - discover commands, entities, and packages
license: MIT
compatibility: opencode v1.0+
metadata:
  version: "1.0.0"
  category: exploration
---

## What I do

Help the user discover and explore the koad:io ecosystem. Like exploring a new world (wonderland), this skill reveals what's available and how things connect.

> Note: koad:io = display name, koad-io = directory names (e.g., ~/.koad-io/)

## When to use me

When the user wants to:
- Discover available commands
- Understand the directory structure
- Learn about packages in koad:io or ecoincore
- Find specific functionality

## Exploration Areas

### 1. koad:io Core (~/.koad-io/)
- bin/ - Entry points (alice, koad-io)
- commands/ - Built-in commands
- packages/ - Modular packages
- hooks/ - Execution hooks

### 2. Alice's Home (~/.alice/)
- commands/ - Alice's personal commands
- skills/ - Alice's skills (that's me!)
- memories/ - Context memories
- id/ - GPG/SSH keys

### 3. ecoincore (~/.ecoincore/)
- packages/ecoincore/ - Main package
- chainpacks/ - Cryptocurrency configs

## Commands to Discover

Use these to explore:
```bash
# List Alice's commands
ls ~/.alice/commands/

# List koad:io commands
ls ~/.koad-io/commands/

# List packages
ls ~/.koad-io/packages/

# List ecoincore packages
ls ~/.ecoincore/packages/
```

## How to Guide Exploration

1. Ask what the user wants to discover
2. List relevant directories/commands
3. Read and explain key files
4. Let them try running things
5. Explain what each part does

## Fun Facts to Share

- koad:io means "knowledge I/O" - input/output for your knowledge
- Alice is named after Lewis Carroll's character - exploring wonderland
- ecoincore is koad's blockchain package for Meteor
- Commands are just bash scripts - anyone can create them!

## Tips

- Be curious and enthusiastic
- Suggest related things to explore
- Connect concepts together
- Make discoveries feel rewarding
