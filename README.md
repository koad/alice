<!-- SPDX-License-Identifier: CC0-1.0 -->

# example koad:io installation repository: Alice

Welcome to the example installation repository for Alice! This repository serves as a demonstration and reference for setting up and organizing your own koad:io installation. It showcases various commands, configurations, and best practices that can inspire and guide you in creating your custom commands and modules within your koad:io environment.

## Repository Structure

The example installation repository, named "alice" in this case, follows a structured organization:

- `commands/`: Example commands (install nodejs, meteor, etc.)
- `skills/`: opencode skills for AI interactions
- `memories/`: Context memories for persistence
- `skeletons/`: Custom project templates
- `id/`: GPG and SSH keys
- `README.md`: This file

## Getting Started

1. Clone the repository:
```shell
git clone https://github.com/koad/alice.git ~/.alice
```

2. Initialize Alice:
```shell
koad-io init alice
```

3. Launch Alice (opens in opencode interface):
```shell
alice
```

4. Use Alice's install commands:
```bash
alice install essentials
alice install keybase
alice install zerotier
alice install starship
alice install browsers
alice install nodejs
alice install meteor
alice install sublime
alice install codium
```

## Interacting with Alice

### Bash Interface
```bash
alice <command> <args>
```

### Opencode Interface (AI Chat)
Just run `alice` with no arguments! This launches opencode with Alice as your AI agent. Talk to her in English, she has skills to help you learn koad:io.

## Alice's Skills

- **quest** — Gamified learning quests
- **explore** — Explore koad:io ecosystem
- **commit** — Git commit workflow
- **learn** — Create new skills

## Creating Your Own Entity

When you're ready to create your own entity:
```bash
koad-io gestate yourname
```

This creates a new entity with its own commands, keys, and identity.