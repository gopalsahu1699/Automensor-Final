# Task: Fix logo visibility with white background

## Problem
The Automensor logo is blue and black, which is hard to see on dark backgrounds. OpenCode already tried CSS filters (brightness + drop-shadow) but it's not clean enough. The user wants a white background behind the logo so it's clearly visible.

## What to do

### 1. Navbar logo (both instances) — components/Navbar.jsx

There are TWO logo instances:
- Line ~67: Sidebar logo (inside mobile sidebar)
- Line ~132: Main navbar logo

For BOTH logos:
- Revert back to `logo.png` (not logo2.png) — just use the original
- Remove the `logo-filter` class
- Instead, wrap each `<Image>` in a `<div>` with a white background:
  ```jsx
  <div className="bg-white rounded-lg p-2">
    <Image src="/images/logo.png" ... />
  </div>
  ```
- Adjust the div size to fit the logo nicely — maybe `p-1.5` or `p-2` padding, `rounded-lg`

### 2. Footer logo — components/Footer.tsx

- Revert from `logo2.png` back to `logo.png`
- Remove `logo-filter` class
- Wrap the `<img>` in a div with white background:
  ```jsx
  <div className="bg-white rounded-lg p-2 inline-block">
    <img src="/images/logo.png" className="h-10" ... />
  </div>
  ```
- Use `inline-block` so it doesn't stretch full width

### 3. Clean up
- Remove the `.logo-filter` class from `app/globals.css` (it's no longer needed)
- Run `npx tsc --noEmit` to verify
- Do NOT git push
