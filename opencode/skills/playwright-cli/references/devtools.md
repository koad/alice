# DevTools

Access browser developer tools for debugging, inspection, and analysis.

## Opening DevTools

```bash
# Open browser DevTools
playwright-cli show

# Alternative syntax
playwright-cli devtools-start
```

## Console Messages

View console output from the page:

```bash
# List all console messages (all levels)
playwright-cli console

# Filter by minimum log level
playwright-cli console error    # Show errors and above
playwright-cli console warning # Show warnings and above
playwright-cli console log     # Show all messages
```

Console levels (from least to most severe):
- `debug`
- `log`
- `info`
- `warning`
- `error`

## Network Inspector

View all network requests and responses:

```bash
# List all network requests since page load
playwright-cli network
```

The network output includes:
- Request URL
- HTTP method (GET, POST, etc.)
- Response status code
- Response type (document, xhr, fetch, etc.)
- Timing information

## Common Debugging Workflows

### Inspect JavaScript Errors

```bash
playwright-cli open --headed https://example.com
playwright-cli console error  # Check for console errors
playwright-cli network        # Check for failed requests
playwright-cli show           # Open DevTools to inspect
```

### Debug API Calls

```bash
playwright-cli open --headed https://example.com
playwright-cli console
playwright-cli network
# Perform actions that trigger API calls
# Watch console/network for request/response details
```

### Inspect Page State

```bash
playwright-cli open --headed https://example.com
playwright-cli show  # Open DevTools to:
                     # - Inspect DOM elements
                     # - View console logs
                     # - Monitor network activity
                     # - Debug JavaScript
```

## DevTools vs Tracing

| Feature | DevTools (`show`) | Tracing (`tracing-start`) |
|---------|-------------------|---------------------------|
| **Real-time** | Yes - live inspection | Captures for later review |
| **DOM access** | Full inspection | Snapshots only |
| **Console logs** | Live streaming | Captured snapshots |
| **Network** | Live monitoring | Recorded traces |
| **Screenshots** | Manual only | Automatic per action |
| **Use case** | Interactive debugging | Post-mortem analysis |

## Combining with Tracing

For comprehensive debugging:

```bash
# Start tracing to capture everything
playwright-cli tracing-start

# Open DevTools for real-time inspection
playwright-cli show

# Perform actions - trace captures them
playwright-cli click e5
playwright-cli fill e7 "test"

# Stop tracing when done
playwright-cli tracing-stop
```

## Tips

- Use `--headed` with DevTools for the best experience - watch automation while inspecting
- DevTools window syncs with browser state - select elements in DevTools to highlight in browser
- Keep DevTools open in a separate window for continuous monitoring during long automations
