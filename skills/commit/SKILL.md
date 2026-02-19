---
name: Commit to Git
description: Commits changes with one commit per concept/file/group/idea
license: MIT
compatibility: opencode v1.0+
metadata:
  version: "1.0.0"
  category: git
---

This skill commits changes in the current folder using one commit per concept/file/group/idea. It analyzes the git status and groups related files together based on their conceptual relationship.

## Usage

When the user asks to commit changes, use this skill.

## Workflow

1. Run `git status` to see all changed files
2. Run `git diff --name-only` to get the list of changed files
3. **Check for secrets/tokens** (before proceeding):
   - Run `git diff` on each file to inspect changes
   - Search for common secret patterns using grep:
     - API keys: `api[_-]?key`, `apikey`, `API_KEY`
     - Tokens: `token`, `secret`, `password`, `pwd`
     - Credentials: `credentials`, `auth`, `private[_-]?key`
     - Env files: `.env`, `env.js`, `config.js` with sensitive data
     - AWS keys, JWTs, OAuth, SSH keys
   - If any secrets are detected, **stop and ask for user confirmation** before committing
4. **Ensure `.env.example` exists when `.env` files are present**:
   - If any `.env` file (`.env`, `.env.local`, `.env.production`, etc.) is found in the working tree (staged, unstaged, or gitignored):
     - Scan the project for all environment variable references:
       - Grep source files for `process.env.`, `import.meta.env.`, `os.environ`, `os.Getenv`, `env::var`, `ENV[`, `$_ENV[`, `getenv(`, etc.
       - Parse every `.env*` file (except `.env.example`) for variable names
     - Build a deduplicated list of all env var names used
     - Check if a corresponding `.env.example` exists in the same directory
     - If `.env.example` is missing or incomplete:
       - Generate/update `.env.example` containing every discovered variable with empty or placeholder values (never real secrets)
       - Use descriptive placeholders: `your-api-key-here`, `your-database-url-here`, `true`, `3000`, etc.
       - Preserve any existing comments or grouping in `.env.example`
       - Stage the new/updated `.env.example` for commit
     - Ensure `.env` (and variants) are listed in `.gitignore`; add them if missing
5. **Check for files that should be in .gitignore**:
   - Review all changed files against common patterns:
     - Build outputs: `dist/`, `build/`, `out/`, `target/`, `.next/`, `.nuxt/`
     - Dependencies: `node_modules/`, `vendor/`, `venv/`, `.venv/`
     - Cache folders: `.cache/`, `.parcel-cache/`, `__pycache__/`, `.tox/`
     - IDE files: `.idea/`, `.vscode/`, `*.swp`, `*.swo`
     - OS files: `.DS_Store`, `Thumbs.db`
     - Logs: `*.log`, `logs/`
     - Test coverage: `coverage/`, `.nyc_output/`
     - Environment files: `.env.local`, `.env.*.local` (except `.env.example`)
   - If untracked files match these patterns:
     - Suggest adding them to `.gitignore` first
     - Ask user if they want to create/update `.gitignore` before committing
   - If already tracked files match these patterns:
     - Ask user if they want to remove from git tracking (`git rm --cached`)
6. Analyze and group files by conceptual relationship:
   - Files that are logically related (e.g., component + its tests)
   - Files that represent a single feature or fix
   - Related configuration files
   - Separate unrelated changes into different groups
7. For each group:
   - Add the files in the group: `git add <files>`
   - Create a commit with a descriptive message
   - The commit message should describe the concept/idea being committed
8. Run `git status` to verify all changes are committed

## Commit Message Guidelines

- Use clear, concise commit messages
- Start with a verb: "Add", "Fix", "Update", "Remove", "Refactor"
- Describe the concept/change in 1-2 sentences
- Example: "Add user authentication component" or "Fix login redirect bug"

## Notes

- If there are no changes to commit, inform the user
- If changes are already staged, use those directly
- Ask the user, if unsure about how to group certain files
- **Always check for secrets/tokens before committing** - if found, ask for confirmation
- Add sensitive files to `.gitignore` before committing if possible
