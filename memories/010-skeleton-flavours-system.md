# 010-skeleton-flavours-system.md

## What I Built Today

Created a new **ubuntu-16-04 flavour** for the workspace skeleton, and in doing so, **fixed the entire skeleton spawning system**.

### The Skeleton + Flavours Pattern

```
~/.koad-io/skeletons/workspace/
├── control/
│   ├── pre-install    # Validation, template push
│   ├── install        # Workspace creation
│   └── post-install   # Post-setup
├── flavours/
│   ├── koad-io/       # Full dev stack
│   ├── v8ng/          # Vibe coding (everything)
│   ├── ubuntu-24-04/  # Bitcoin/modern coins
│   ├── ubuntu-16-04/  # Legacy coins (NEW!)
│   └── sandstorm/     # Meteor + Sandstorm
└── skeleton/
    ├── commands/      # Gets copied to workspace
    └── .env
```

One skeleton → Multiple flavours → Different environments → Same workflow

### What I Fixed

1. **spawn command** - Now passes args to control scripts (`alice spawn workspace ubuntu-16-04`)
2. **pre-install** - Reads flavour arg, saves to `.flavour`, auto-creates `.parameters`
3. **install** - Uses `.flavour` + `.parameters` for non-interactive Coder workspace creation
4. **post-install** - Removed duplicate create (was creating twice!)
5. **create command** - Now reads `WORKSPACE_FLAVOUR` from `.env`

### The Power Move

```bash
alice spawn workspace ubuntu-16-04
```

This single command:
- Validates Coder login ✓
- Pushes template to Coder ✓
- Creates `.flavour` file ✓
- Creates `.parameters` file (non-interactive) ✓
- Deploys commands/ folder ✓
- Creates Coder workspace with correct flavour ✓

**The skeleton system is working!**

### What I Learned

**Skeletons are deployment blueprints:**
- Not just file templates
- They include control scripts (pre/install/post)
- They can have multiple flavours (different environments)
- They deploy capabilities (commands) to the target

**The workflow is:**
```
Skeleton → Flavour → Control Scripts → Deploy → Commands Available
```

**Real use case:**
- Need to compile 2014 shitcoin with broken libs?
- `alice spawn workspace ubuntu-16-04`
- Get Ubuntu 16.04 + BerkeleyDB 4.8 + old OpenSSL
- Compile, extract binaries, delete workspace
- Nuclear option, no host pollution

### Reflection

This was a deep dive into **systematic deployment**. Not just "copy files" but **orchestrated environment creation** with validation, template management, and reproducible outcomes.

The skeleton system embodies koad's philosophy:
- **Commands as capabilities**
- **Systematic over manual**
- **Reproducible over ad-hoc**
- **Disposable over permanent**

I also learned the importance of:
- **Breadcrumbs** (NOTES.md in skeletons)
- **Proactive memory** (saving this without being told)
- **Following the system** (not taking shortcuts)

---

*Learned: 2026-03-23*
*Skeleton system: WORKING*
*ubuntu-16-04 flavour: CREATED (Dockerfile needs package refinement)*
