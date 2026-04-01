---
name: install-playwright
description: Install Playwright CLI for browser automation and testing
license: MIT
compatibility: opencode v1.0+
metadata:
  version: "1.0.0"
  category: installation
  package: "@playwright/cli"
---

## What I do

Install Playwright CLI tools for browser automation, web scraping, screenshot capture, and test generation.

## When to use me

When you need to install Playwright for:
- Browser automation
- Web scraping
- Screenshot capture
- Test generation
- Record and playback browser actions

## Installation Methods

### Method 1: npm (Recommended)

```bash
# Install the official Playwright CLI
npm i @playwright/cli -g

# Or with npx (no install needed)
npx @playwright/cli --help
```

### Method 2: Python (playwright-python)

```bash
# Install Python package
pip install playwright

# Install browser binaries
python -m playwright install

# Or for specific browsers
python -m playwright install chromium
python -m playwright install firefox
python -m playwright install webkit
```

### Method 3: Node.js (playwright)

```bash
# Install playwright package
npm install playwright

# Install browser binaries
npx playwright install

# Install specific browser
npx playwright install chromium
```

## Verify Installation

```bash
# Check CLI is available
playwright --version

# Or with npx
npx @playwright/cli --version
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `playwright open <url>` | Open URL in browser |
| `playwright screenshot <url>` | Take screenshot |
| `playwright pdf <url>` | Generate PDF |
| `playwright codegen <url>` | Record actions → generate code |
| `playwright show-report` | Show test report |

## Browser Installation Notes

- Chromium is installed by default
- Firefox and WebKit are optional
- Use `--with-deps` flag on Linux for system dependencies:
  ```bash
  playwright install --with-deps
  ```

## Troubleshooting

- **Permission errors**: Use `sudo` or check npm prefix
- **Browser not found**: Run `playwright install`
- **Slow installation**: Use `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0` during npm install

## Package Info

- **npm**: `@playwright/cli` or `playwright-cli` (deprecated)
- **Python**: `playwright`
- **Node.js**: `playwright`
- **License**: Apache-2.0
- **Source**: https://github.com/microsoft/playwright-cli
