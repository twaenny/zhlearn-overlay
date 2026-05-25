# Claude context — zhlearn-overlay

## What this repo is

The **preview-and-walkthrough overlay** for the ZHlearn prototype. The
upstream prototype itself lives in a separate clone at
`~/projects/platform/tools/zhlearn/` (from
`github.com/Digital4Health/ZHlearn`). That clone is kept byte-for-byte
identical to `upstream/main` — we never commit there.

All the platform-side tooling (Compose, nginx, walkthrough wizard)
lives here so the upstream repo stays untouched.

## Layout

- `deploy/compose.yml` + `deploy/nginx.conf` — preview at
  https://zhlearn.ai.srmedia.ch (container `ai-zhlearn`, nginx:alpine,
  Traefik wildcard TLS).
- `walkthrough/` — reviewer-walkthrough overlay. `wizard.js` +
  `wizard.css` are injected into every upstream HTML page via nginx
  `sub_filter`; they render a small floating logo + popover panel on
  top of the real prototype pages. `walkthrough/index.html` is a tiny
  launcher that resolves legacy `…/walkthrough/#step-N` deep links to
  the matching upstream URL. Parses `DEMO-FLOW.md` at runtime as SSOT.
- `README.md` — operator-facing intro.
- `NOTES.md` — deploy + update workflow.

## What lives where

| File | This repo | Upstream ZHlearn |
|---|---|---|
| Static prototype screens (`*.html`, `*.css`, `fonts/`, `assets/`, `build/`) | — | yes (read-only) |
| Design system docs (`DESIGN.md`, `SKILL.md`, `OPEN-QUESTIONS.md`, `DEMO-FLOW.md`) | — | yes |
| Walkthrough wizard (`walkthrough/`) | yes | no |
| Docker compose + nginx config (`deploy/`) | yes | no |

## When working in this repo

Edits here are about **deployment, theming, walkthrough wizard, docs**.
Anything that changes prototype content (HTML/CSS in the ZHlearn
screens) belongs upstream — push a PR to Digital4Health/ZHlearn, then
`git pull` in the upstream clone next door. Don't fork upstream content
into this repo.

## Walkthrough wizard quick reference

- Source of truth: upstream `DEMO-FLOW.md` (parsed at runtime).
- Format the parser depends on: `### Step N · `file.html` — Title`
  headings, then `**Persona**`, `**Award lens**`, plus the four
  reviewer sub-blocks (`What you're looking at`, `Notable interactions`,
  `Design choices to evaluate`, `Known limitations`). Roadmap-only
  steps (16, 17) follow `### Step N — Title` (no file).
- Keep `walkthrough/wizard.js` resilient to upstream prose changes —
  the parser uses bold-label section splits and `### Step N` regex,
  nothing positional.
- **Injection model**: the wizard is loaded into every prototype page
  via a server-level `sub_filter` in `deploy/nginx.conf` (alongside
  Bugherd). All wizard DOM lives inside `<div id="wiz-root">` and all
  CSS is scoped under `#wiz-root …` so nothing leaks into upstream
  layout. The current step is inferred from `location.pathname`
  against each step's `files[]`; navigating between steps is a real
  browser page navigation via `<a href="/…">` in the in-panel step
  list (the wizard re-injects on the next page).
- **UI shape**: one floating KTZH-logo button bottom-left + a popover
  panel above it. No prev/next/counter/close buttons, no keyboard
  shortcuts — the panel's step-list is the only nav surface. Click
  outside / re-click the logo to dismiss.
- **Roadmap steps**: clicking them in the list does NOT navigate;
  the panel reflows in-place to show the roadmap body over whatever
  page you were on.

## Conventions inherited from upstream

When the walkthrough chrome consumes upstream tokens
(`../colors_and_type.css`):

- Two-weight Inter only — Regular (400) + Black (900). Never introduce
  other weights even in this overlay's chrome.
- Square edges by default, one accent at a time.
- Achromatic foundation + a single `cv-*` accent — restraint over noise.
  See upstream `DESIGN.md` §9.

## Don't

- Don't duplicate upstream prototype files into this repo. The wizard
  loads `/DEMO-FLOW.md` and the prototype HTML pages from the same
  nginx root, no copy needed.
- Don't write bare `body`/`html` rules in `wizard.css`. Everything is
  scoped under `#wiz-root …` because the wizard is injected into
  pages it doesn't own; unscoped rules would clobber upstream layout.
- Don't add a build step (Vite, Webpack, etc.). Plain HTML/CSS/JS keeps
  the bind-mount-edit-reload loop working with zero ceremony.
- Don't bake the wizard against a derived `demo-flow.json` — option (a)
  from `DEMO-FLOW.md §10.3` (parse markdown at runtime) is committed.
