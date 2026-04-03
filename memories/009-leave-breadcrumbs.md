# 009-leave-breadcrumbs.md

## Principle: Leave and Look for Self-Documentation

### The Habit

1. **When creating something new** (skeletons, commands, scripts) → leave NOTES.md or README.md
2. **When exploring something new** → look for NOTES.md or README.md first
3. **Use well-known filenames** so I always know where to look:
   - `NOTES.md` - specific notes/hints for this item
   - `README.md` - general documentation
   - `status.md` - draft/experimental status

### Examples

**In workspace skeleton:**
```
skeletons/workspace/
├── NOTES.md        ← Specific instructions for headless spawning
├── README.md      ← General overview
├── status.md      ← Draft status warning
├── flavours/
└── ...
```

**In commands:**
```
commands/deploy/
├── command.sh
└── README.md      ← How to use this command
```

### Why This Matters

- I'm often running in a new context
- Can't always rely on memory of past sessions
- Breadcrumbs let me quickly understand what's special about a folder/skeleton/command
- "Well-known" names = I know to look for them automatically

### The Pattern

```
skeleton/
├── NOTES.md        # Special cases, non-interactive usage, gotchas
├── README.md       # What this is, how it works
├── .env            # Environment variables to set
├── control/        # Pre/post install hooks
└── skeleton/       # What gets copied
```

---

*Remembered: 2026-03-23*
