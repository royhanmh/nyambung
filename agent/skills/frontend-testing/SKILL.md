---
name: frontend-testing
description: "Test and verify web pages in the browser. Use when validating UI changes, checking console errors, taking screenshots, or confirming features work after edits."
---

# Frontend Testing

## When to Use

- After editing `index.html` to verify changes
- Checking responsive behavior, theming, or interactivity
- Capturing screenshots to show the user results

## Procedure

1. Open the page in the integrated browser (`open_browser_page` with the file URL or local server URL).
2. Take an accessibility snapshot (`read_page`) to inspect structure.
3. Interact as needed: click buttons, type into inputs, toggle themes.
4. Capture a screenshot to confirm visual state.
5. Report any console errors or broken behaviors found.

## Checklist

- [ ] Page loads without console errors
- [ ] All interactive elements respond
- [ ] Responsive at mobile + desktop widths
- [ ] Dark/light mode both render correctly
