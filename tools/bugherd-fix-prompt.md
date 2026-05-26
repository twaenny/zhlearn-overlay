# Bug fix — ZHlearn overlay (BH-{TASK_ID})

## Architecture (read first, do NOT change)

- Static HTML prototype at https://zhlearn.ai.srmedia.ch
- Two sibling repos:
  - `~/projects/platform/tools/zhlearn/` — UPSTREAM CLONE, byte-for-byte
    identical to `Digital4Health/ZHlearn:main`. **NEVER edit, NEVER commit.**
  - `~/projects/platform/tools/zhlearn-overlay/` — where all fixes go.
- Wizard chrome is injected into every upstream HTML page via nginx
  `sub_filter` (`deploy/nginx.conf`). All wizard DOM lives inside
  `<div id="wiz-root">`; all CSS is scoped under `#wiz-root …`.
- Container is `ai-zhlearn`; bind-mounts pick up edits on the next page
  load. nginx config edits need `docker exec ai-zhlearn nginx -t && \
  docker exec ai-zhlearn nginx -s reload`.
- Read `zhlearn-overlay/CLAUDE.md` and `zhlearn-overlay/NOTES.md` for
  the full architecture rules and gotchas.

## Bug

- Bugherd task: **BH-{TASK_ID}**  ·  severity: {SEVERITY}  ·  status: {STATUS}
- Reporter: {REPORTER}
- Page URL: {PAGE_URL}
- CSS selector reported: `{SELECTOR}`
- Screenshot: {SCREENSHOT_URL}

### Reporter description
{DESCRIPTION}

### Follow-up comments
{COMMENTS}

## Constraints

- **Smallest possible diff.** No drive-by refactors. Touch only what
  this bug requires.
- **If the bug is in upstream HTML/CSS**, fix it via the overlay:
  - DOM injection in `walkthrough/wizard.js`
  - CSS rule scoped under `#wiz-root` in `walkthrough/wizard.css`
  - nginx `sub_filter` in `deploy/nginx.conf`
  - **Never** edit `/home/coder/projects/platform/tools/zhlearn/*`.
- Any new CSS class belongs under `#wiz-root` to avoid leaking into
  upstream pages.
- nginx config changes: `docker exec ai-zhlearn nginx -t` must pass.
- JS changes: `node --check walkthrough/wizard.js` must pass.
- The dead-link toast handler (`isDeadLink` / `showToast` in
  `wizard.js`) and the floating logo/panel chrome should NOT be touched
  unless the bug is in them directly.

## Done when

- Visible behavior matches what the reporter expected (per the
  screenshot / description / comments above).
- `git diff` shows the smallest possible change.
- Commit message starts with one of `fix(walkthrough): …` /
  `fix(deploy): …` / `style(walkthrough): …` and ends with `[BH-{TASK_ID}]`.
- Pushed to `origin main` (dual-pushes GitHub + Forgejo).
- Verified via `curl` (and ideally a real-browser hard-reload).

## Useful commands

```bash
# nginx
docker exec ai-zhlearn nginx -t
docker exec ai-zhlearn nginx -s reload

# JS syntax
node --check ~/projects/platform/tools/zhlearn-overlay/walkthrough/wizard.js

# serve a quick check
curl -sf https://zhlearn.ai.srmedia.ch{PAGE_URL_PATH} | grep -E '<wizard or relevant marker>'
```
