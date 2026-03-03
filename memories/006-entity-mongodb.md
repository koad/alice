---
title: "Entity MongoDB & Centralized Apps"
created: 2026-03-03
tags: [mongodb, meteor, accounts, oauth, centralized, apps]
status: learning
priority: high
---

# Entity MongoDB & Centralized Apps

When an entity has MongoDB, koad:io becomes a powerful centralized platform.

## Two Modes

### With MongoDB (Centralized)
- Entity has MongoDB environment variable set
- All Meteor apps share **same database**
- Single source of truth for data
- Apps can communicate/share data
- Meteor Accounts for shared login

### Without MongoDB (Isolated)
- No MongoDB env var set
- Each Meteor app creates **minimongo** in `.local/meteor/`
- Each app is **isolated** - has its own spawned database
- No shared data between apps
- Standalone operation

## Environment Variables

Set in entity's `.env`:
```bash
MONGO_URL=mongodb://localhost:3001/mydb
```

Or leave unset for isolated minimongo per app.
