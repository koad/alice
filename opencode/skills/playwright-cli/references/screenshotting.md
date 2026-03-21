# Screenshotting

Take screenshots of pages or elements for visual testing, bug reports, or documentation.

## Clean Screenshots (Remove Blocking Elements)

Before taking screenshots, intelligently scan the page and remove blocking/nuisance elements like cookie banners, modals, overlays, and consent dialogs:

```bash
# Scan page DOM and remove blocking elements
playwright-cli run-code "async page => {
  const isBlocking = (el) => {
    const styles = window.getComputedStyle(el);
    if (styles.position === 'fixed' || styles.position === 'sticky') {
      const text = (el.textContent || '').toLowerCase();
      if (/cookie|consent|gdpr|privacy|accept|decline|agree|policy|modal|dialog|overlay|newsletter|signup|subscribe|notification/i.test(text)) {
        return true;
      }
      const cls = (el.className || '') + (el.id || '');
      if (/cookie|consent|gdpr|privacy|modal|overlay|popup|banner|newsletter|notify|agree|accept|decline/i.test(cls)) {
        return true;
      }
    }
    if (el.hasAttribute('aria-modal') || el.getAttribute('role') === 'dialog') return true;
    return false;
  };

  const removeBlocking = (root = document.body) => {
    Array.from(root.querySelectorAll('*')).forEach(el => {
      if (isBlocking(el)) el.remove();
    });
    // Also remove overlays and backdrops
    document.querySelectorAll('[class*=\"backdrop\"], [class*=\"遮罩\"], .modal-backdrop, .overlay-backdrop').forEach(el => el.remove());
  };

  removeBlocking();
}"
playwright-cli screenshot --filename=clean-screenshot.png
```

This intelligently detects blocking elements by checking:
- Fixed/sticky positioned elements covering the viewport
- Text content containing cookie, consent, GDPR, privacy, modal, overlay, newsletter keywords
- CSS class names with blocking indicators
- `aria-modal` and `role="dialog"` attributes
- Backdrop elements

## Basic Screenshots

```bash
# Screenshot of current viewport
playwright-cli screenshot

# Screenshot with custom filename
playwright-cli screenshot --filename=page.png

# Screenshot of entire page (full page scroll)
playwright-cli screenshot --full-page
```

## Element Screenshots

Take screenshots of specific elements using element refs from the snapshot:

```bash
# Screenshot a specific element (use ref from snapshot)
playwright-cli screenshot e5

# Element screenshot with custom filename
playwright-cli screenshot e5 --filename=element.png
```

## Screenshot Options

### Full Page vs Viewport

| Command | Description |
|---------|-------------|
| `playwright-cli screenshot` | Viewport only (default) |
| `playwright-cli screenshot --full-page` | Entire scrollable page |

### Common Options

```bash
# Disable CSS animations
playwright-cli screenshot --animations=disabled

# Mask specific elements (hides dynamic content)
playwright-cli screenshot --mask=".overlay,.modal"

# Mask all images
playwright-cli screenshot --mask-images

# Hide cursor
playwright-cli screenshot --hide-cursor

# JPEG format with quality (1-100)
playwright-cli screenshot --format=jpeg --quality=80

# PNG format (default)
playwright-cli screenshot --format=png

# Add delay before screenshot (for animations/loading)
playwright-cli screenshot --delay=1000

# Clip/Screenshot specific region
playwright-cli screenshot --clip-x=0 --clip-y=0 --clip-width=800 --clip-height=600
```

## Custom Paths

```bash
# Save to specific directory
playwright-cli screenshot --path=./screenshots/page.png

# Include timestamp in filename
playwright-cli screenshot --filename=screenshot-$(date +%Y%m%d-%H%M%S).png
```

## PDF Generation

Generate PDF instead of image:

```bash
# Basic PDF
playwright-cli pdf --filename=page.pdf

# PDF with custom page size
playwright-cli pdf --filename=page.pdf --format=A4
playwright-cli pdf --filename=page.pdf --format=Letter

# PDF with margins
playwright-cli pdf --filename=page.pdf --margin-top=1in --margin-bottom=1in

# PDF with header/footer
playwright-cli pdf --filename=page.pdf --display-header-footer --header-template="Page <span class='pageNumber'></span>"
```

## Workflow Examples

### Bug Report Screenshot

```bash
playwright-cli open --headed https://example.com/bug-page
# Intelligently remove blocking elements
playwright-cli run-code "async page => {
  const isBlocking = (el) => {
    const styles = window.getComputedStyle(el);
    if (styles.position === 'fixed' || styles.position === 'sticky') {
      const text = (el.textContent || '').toLowerCase();
      if (/cookie|consent|gdpr|privacy|accept|decline|agree|policy|modal|dialog|overlay|newsletter|signup|subscribe|notification/i.test(text)) return true;
      const cls = (el.className || '') + (el.id || '');
      if (/cookie|consent|gdpr|privacy|modal|overlay|popup|banner|newsletter|notify|agree|accept|decline/i.test(cls)) return true;
    }
    if (el.hasAttribute('aria-modal') || el.getAttribute('role') === 'dialog') return true;
    return false;
  };
  document.querySelectorAll('*').forEach(el => { if (isBlocking(el)) el.remove(); });
}"
playwright-cli screenshot --full-page --filename=bug-full-page.png
# After code changes...
playwright-cli screenshot --full-page --hide-cursor --filename=bug-after-click.png
# Browser stays open for further investigation
```

### Visual Regression Test

```bash
playwright-cli open --headed https://example.com
# Intelligently remove blocking elements before baseline
playwright-cli run-code "async page => {
  const isBlocking = (el) => {
    const styles = window.getComputedStyle(el);
    if (styles.position === 'fixed' || styles.position === 'sticky') {
      const text = (el.textContent || '').toLowerCase();
      if (/cookie|consent|gdpr|privacy|accept|decline|agree|policy|modal|dialog|overlay|newsletter|signup|subscribe|notification/i.test(text)) return true;
      const cls = (el.className || '') + (el.id || '');
      if (/cookie|consent|gdpr|privacy|modal|overlay|popup|banner|newsletter|notify|agree|accept|decline/i.test(cls)) return true;
    }
    if (el.hasAttribute('aria-modal') || el.getAttribute('role') === 'dialog') return true;
    return false;
  };
  document.querySelectorAll('*').forEach(el => { if (isBlocking(el)) el.remove(); });
}"
playwright-cli screenshot --full-page --animations=disabled --filename=baseline.png
# After code changes...
playwright-cli screenshot --full-page --animations=disabled --filename=current.png
# Browser stays open for comparison
```

### Dashboard Overview

```bash
playwright-cli open --headed https://example.com/dashboard
# Intelligently remove blocking elements
playwright-cli run-code "async page => {
  const isBlocking = (el) => {
    const styles = window.getComputedStyle(el);
    if (styles.position === 'fixed' || styles.position === 'sticky') {
      const text = (el.textContent || '').toLowerCase();
      if (/cookie|consent|gdpr|privacy|accept|decline|agree|policy|modal|dialog|overlay|newsletter|signup|subscribe|notification/i.test(text)) return true;
      const cls = (el.className || '') + (el.id || '');
      if (/cookie|consent|gdpr|privacy|modal|overlay|popup|banner|newsletter|notify|agree|accept|decline/i.test(cls)) return true;
    }
    if (el.hasAttribute('aria-modal') || el.getAttribute('role') === 'dialog') return true;
    return false;
  };
  document.querySelectorAll('*').forEach(el => { if (isBlocking(el)) el.remove(); });
}"
playwright-cli resize 1920 1080
playwright-cli screenshot --full-page --hide-cursor --filename=dashboard-1920.png
playwright-cli resize 375 812  # iPhone size
playwright-cli screenshot --full-page --hide-cursor --filename=dashboard-mobile.png
# Browser stays open
```

### Element Comparison

```bash
playwright-cli open --headed https://example.com
playwright-cli snapshot
# Intelligently remove blocking elements
playwright-cli run-code "async page => {
  const isBlocking = (el) => {
    const styles = window.getComputedStyle(el);
    if (styles.position === 'fixed' || styles.position === 'sticky') {
      const text = (el.textContent || '').toLowerCase();
      if (/cookie|consent|gdpr|privacy|accept|decline|agree|policy|modal|dialog|overlay|newsletter|signup|subscribe|notification/i.test(text)) return true;
      const cls = (el.className || '') + (el.id || '');
      if (/cookie|consent|gdpr|privacy|modal|overlay|popup|banner|newsletter|notify|agree|accept|decline/i.test(cls)) return true;
    }
    if (el.hasAttribute('aria-modal') || el.getAttribute('role') === 'dialog') return true;
    return false;
  };
  document.querySelectorAll('*').forEach(el => { if (isBlocking(el)) el.remove(); });
}"
playwright-cli screenshot e5 --filename=element-before.png
playwright-cli click e6
playwright-cli screenshot e5 --filename=element-after.png
# Browser stays open
```

### Visual Regression Test

```bash
playwright-cli open --headed https://example.com
playwright-cli screenshot --full-page --animations=disabled --filename=baseline.png
# After code changes...
playwright-cli screenshot --full-page --animations=disabled --filename=current.png
playwright-cli close
```

### Dashboard Overview

```bash
playwright-cli open --headed https://example.com/dashboard
playwright-cli resize 1920 1080
playwright-cli screenshot --full-page --hide-cursor --filename=dashboard-1920.png
playwright-cli resize 375 812  # iPhone size
playwright-cli screenshot --full-page --hide-cursor --filename=dashboard-mobile.png
playwright-cli close
```

### Element Comparison

```bash
playwright-cli open --headed https://example.com
playwright-cli snapshot
playwright-cli screenshot e5 --filename=element-before.png
playwright-cli click e6
playwright-cli screenshot e5 --filename=element-after.png
playwright-cli close
```

## Screenshot File Location

Screenshots are saved to:
- Current directory (when using `--filename=`)
- `.playwright-cli/screenshots/` (when no path specified)
- Custom path (when using `--path=`)

Check where screenshots are saved:
```bash
ls -la .playwright-cli/screenshots/
```

## Tips

- **Smart scanning** - The DOM scanner intelligently identifies blocking elements by position, text content, and ARIA attributes - no need to guess selectors
- **Always clean first** - Run the blocking element removal before any screenshot for clean captures
- **Viewport matters** - Resize browser to target viewport before screenshot for consistent results
- **Animations off** - Use `--animations=disabled` for static, reproducible screenshots
- **Full page vs viewport** - Full page captures scrollable content; viewport is faster for above-the-fold shots
