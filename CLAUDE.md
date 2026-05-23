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
- `walkthrough/` — reviewer wizard at https://zhlearn.ai.srmedia.ch/walkthrough/.
  Parses `DEMO-FLOW.md` from the upstream clone at runtime as SSOT.
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

## Conventions inherited from upstream

When the walkthrough chrome consumes upstream tokens
(`../colors_and_type.css`):

- Two-weight Inter only — Regular (400) + Black (900). Never introduce
  other weights even in this overlay's chrome.
- Square edges by default, one accent at a time.
- Achromatic foundation + a single `cv-*` accent — restraint over noise.
  See upstream `DESIGN.md` §9.

## Don't

- Don't duplicate upstream prototype files into this repo. The
  walkthrough iframe loads them from the same nginx root, no copy needed.
- Don't add a build step (Vite, Webpack, etc.). Plain HTML/CSS/JS keeps
  the bind-mount-edit-reload loop working with zero ceremony.
- Don't bake the wizard against a derived `demo-flow.json` — option (a)
  from `DEMO-FLOW.md §10.3` (parse markdown at runtime) is committed.
