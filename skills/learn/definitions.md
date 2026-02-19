# Config Schema Reference

Configuration schema for opencode (JSON Schema draft 2020-12).

## Top-Level Properties

| Property | Type | Description |
|----------|------|-------------|
| `theme` | string | Theme name for the interface |
| `logLevel` | string | Log level: DEBUG, INFO, WARN, ERROR |
| `model` | string | Model in format `provider/model` (e.g., `anthropic/claude-2`) |
| `small_model` | string | Small model for tasks like title generation |
| `default_agent` | string | Default agent to use (must be a primary agent) |
| `username` | string | Custom username to display in conversations |
| `share` | string | Sharing behavior: `manual`, `auto`, `disabled` |
| `autoupdate` | boolean/string | Auto-update setting (`true`, `false`, or `notify`) |
| `snapshot` | boolean | Enable snapshot functionality |
| `disabled_providers` | array | Providers to disable |
| `enabled_providers` | array | Only these providers will be enabled |

## Keybinds

The `keybinds` object contains keyboard shortcut configurations. Default leader key: `ctrl+x`.

### Session Keybinds
- `session_new` - Create new session (`<leader>n`)
- `session_list` - List all sessions (`<leader>l`)
- `session_timeline` - Show session timeline (`<leader>g`)
- `session_fork` - Fork session from message
- `session_rename` - Rename session (`ctrl+r`)
- `session_delete` - Delete session (`ctrl+d`)
- `session_interrupt` - Interrupt session (`escape`)
- `session_compact` - Compact session (`<leader>c`)
- `session_export` - Export session to editor (`<leader>x`)
- `session_share` / `session_unshare` - Share management

### Message Navigation
- `messages_page_up` / `messages_page_down` - Page navigation
- `messages_line_up` / `messages_line_down` - Line navigation
- `messages_first` / `messages_last` - Jump to first/last
- `messages_next` / `messages_previous` - Navigate messages
- `messages_copy` - Copy message (`<leader>y`)
- `messages_undo` / `messages_redo` - Undo/redo (`<leader>u`, `<leader>r`)

### Input Controls
- `input_submit` - Submit input (`return`)
- `input_newline` - Insert newline (`shift+return`)
- `input_clear` - Clear input (`ctrl+c`)
- `input_paste` - Paste from clipboard (`ctrl+v`)
- `input_undo` / `input_redo` - Input history

### Input Movement
- `input_move_left` / `input_move_right` - Cursor movement (`left`, `right`, `ctrl+b`, `ctrl+f`)
- `input_move_up` / `input_move_down` - Line navigation
- `input_word_forward` / `input_word_backward` - Word navigation (`alt+f`, `alt+b`)
- `input_line_home` / `input_line_end` - Line boundaries (`ctrl+a`, `ctrl+e`)
- `input_buffer_home` / `input_buffer_end` - Buffer boundaries (`home`, `end`)

### Input Deletion
- `input_backspace` / `input_delete` - Character deletion
- `input_delete_word_forward` / `input_delete_word_backward` - Word deletion
- `input_delete_line` - Delete line (`ctrl+shift+d`)
- `input_delete_to_line_end` / `input_delete_to_line_start` - Delete to line boundaries

### Model & Agent
- `model_list` - List models (`<leader>m`)
- `model_cycle_recent` - Cycle recent models (`f2`)
- `model_cycle_favorite` - Cycle favorite models
- `agent_list` - List agents (`<leader>a`)
- `agent_cycle` - Next agent (`tab`)

### General
- `sidebar_toggle` - Toggle sidebar (`<leader>b`)
- `theme_list` - List themes (`<leader>t`)
- `editor_open` - Open external editor (`<leader>e`)
- `command_list` - List commands (`ctrl+p`)
- `tips_toggle` - Toggle tips (`<leader>h`)

## TUI Settings (`tui`)

| Property | Type | Description |
|----------|------|-------------|
| `scroll_speed` | number | TUI scroll speed (min: 0.001) |
| `scroll_acceleration.enabled` | boolean | Enable scroll acceleration |
| `diff_style` | string | Diff rendering: `auto` or `stacked` |

## Server Configuration (`server`)

| Property | Type | Description |
|----------|------|-------------|
| `port` | integer | Port to listen on |
| `hostname` | string | Hostname to listen on |
| `mdns` | boolean | Enable mDNS service discovery |
| `mdnsDomain` | string | Custom mDNS domain (default: opencode.local) |
| `cors` | array | Additional CORS domains |

## Command Configuration (`command`)

Custom commands with properties:
- `template` (required) - Command template string
- `description` - Command description
- `agent` - Agent to use
- `model` - Model to use
- `subtask` - Enable subtask mode

## Skills (`skills`)

| Property | Type | Description |
|----------|------|-------------|
| `paths` | array | Additional skill folder paths |
| `urls` | array | URLs to fetch skills from |

## Watcher (`watcher`)

| Property | Type | Description |
|----------|------|-------------|
| `ignore` | array | File patterns to ignore |

## Agent Configuration (`mode`)

Each agent (build, plan, etc.) supports:
- `model` - Model for this agent
- `variant` - Model variant
- `temperature` / `top_p` - Sampling parameters
- `prompt` - Custom prompt
- `steps` - Max agentic iterations
- `disable` - Disable this agent
- `color` - Agent color (hex or theme color)
- `permission` - Permission rules (read, edit, glob, grep, list, bash, task, webfetch, websearch, codesearch, etc.)

Permission actions: `ask`, `allow`, `deny`
