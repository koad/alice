---
name: learn
description: Create or edit agent skills in ~/.alice/skills/
license: MIT
compatibility: opencode v1.0+
metadata:
  version: "1.0.0"
  category: skill-management
---

## Purpose

This skill MUST be loaded any time you create, edit, or modify any skill in `.alice/skills/`. It is the single authority for how skills are structured, validated, and maintained.

## When to Load This Skill

- Creating a new skill
- Editing or updating an existing skill's SKILL.md
- Adding, removing, or modifying files within a skill's directory
- Reviewing or auditing a skill's structure

## Before Creating or Editing a Skill

1. Read the skill definition guide at `~/.alice/skills/learn/what-is-a-skill.mdx` to understand:
   - Required frontmatter fields (`name`, `description`)
   - Valid name requirements (lowercase alphanumeric with hyphens)
   - Where to place skill files
   - How discovery works

## Workflow

### Creating a New Skill

1. Ask the user what the new skill should do
2. Discuss and clarify the skill's purpose, name, and behavior
3. Propose a skill definition with:
   - Proper YAML frontmatter (name, description, license, compatibility)
   - Clear sections explaining what the skill does and when to use it
4. Get user confirmation before creating the file
5. Create the skill file at `.alice/skills/<skill-name>/SKILL.md`
6. Confirm the skill was created successfully

### Editing an Existing Skill

1. Load this skill (you're doing it now)
2. Read the target skill's current SKILL.md in full
3. Understand the existing structure, frontmatter, and sections before making changes
4. Make the requested changes while preserving:
   - Valid YAML frontmatter format
   - Existing sections not being changed
   - Consistent naming conventions and style
5. Verify the edited skill still conforms to the what-is-a-skill.mdx guide

## Naming Guidelines

Skill names must:
- Be 1-64 characters
- Be lowercase alphanumeric with single hyphen separators
- Not start or end with `-`
- Not contain consecutive `--`
- Match the directory name

Examples: `git-commit`, `learn`, `code-review`, `deploy-app`

## Understanding Yourself (Self-Reference)

When creating skills that configure or extend opencode, consult these bundled reference files in this skill's directory:

- **`~/.alice/skills/learn/definitions.md`** - Human-readable reference for the opencode config schema. Covers top-level properties (theme, model, agents, keybinds, etc.), TUI settings, server config, custom commands, skill paths, watcher ignore patterns, and agent configuration (model, prompt, steps, permissions). Read this first to understand what opencode can be configured to do.

- **`~/.alice/skills/learn/schema.json`** - The full JSON Schema (draft 2020-12) for opencode configuration. Use this for precise validation of config fields, understanding exact types, enums, defaults, and nested structures like `permission` rules (`ask`/`allow`/`deny` per tool), `AgentConfig` properties, and keybind definitions.

### When to use these files

1. **Creating config-related skills** - If a new skill needs to modify or generate `opencode.json` config, use `schema.json` to validate it.
2. **Creating agent/mode skills** - Understand the `agent` (or deprecated `mode`) config structure: model, prompt, steps, permissions, color, variant, etc.
3. **Permission-aware skills** - Reference the permission system (read, edit, bash, task, webfetch, etc.) with actions `ask`, `allow`, `deny` to set appropriate tool access.
4. **Keybind skills** - Use the schema to discover all available keybind actions and their defaults.
5. **Understanding capabilities** - When unsure what opencode supports, read `definitions.md` for a quick overview before diving into `schema.json` for specifics.

## Tips

- Keep descriptions specific (1-1024 characters)
- Include usage examples in the skill
- Add metadata like category, version, or workflow if relevant
- Ensure the skill follows the format in the what-is-a-skill.mdx guide
- When a skill needs to interact with opencode config, always validate against the bundled schema
