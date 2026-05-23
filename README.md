# zhlearn-overlay

Deployment + reviewer-walkthrough overlay for the ZHlearn prototype.

The **upstream prototype** lives at
[`github.com/Digital4Health/ZHlearn`](https://github.com/Digital4Health/ZHlearn) —
static HTML/CSS mockup of the Kanton Zürich learning-platform UI. We
don't modify it. Instead, this repo sits **next to** the ZHlearn clone
and adds two things at deploy time:

1. A **Docker Compose preview** (`deploy/`) that serves the prototype
   at https://zhlearn.ai.srmedia.ch via Traefik + nginx + Let's Encrypt.
2. A **reviewer-walkthrough overlay** (`walkthrough/`) layered onto the
   nginx root at `/walkthrough/`, implementing the wizard contract from
   ZHlearn's `DEMO-FLOW.md` §10. Send reviewers (Chris et al.) the URL
   https://zhlearn.ai.srmedia.ch/walkthrough/.

## Why a separate repo

Two reasons:

1. The ZHlearn clone stays **byte-for-byte identical to `upstream/main`**.
   No local commits, no rebase choreography, no risk of accidentally
   pushing our preview tooling to Digital4Health.
2. **Open Design** (the `nexu-io/open-design` viewer, deployed at
   `design.ai.srmedia.ch`) syncs design projects from `.od/projects/`.
   Keeping the walkthrough wizard *outside* the ZHlearn project folder
   means Open Design never picks it up as a design screen — reviewers
   browsing the design portal see only the actual prototype pages, not
   the walkthrough chrome.

## Where this repo lives

Same content, two remotes — pull from either:

| Host | Clone URL |
|---|---|
| GitHub (public, primary) | `https://github.com/twaenny/zhlearn-overlay.git` |
| Forgejo (in-platform mirror) | `https://git.ai.srmedia.ch/twaenny/zhlearn-overlay.git` |

`git push` from the maintainer pushes to both. Anyone can clone from
either side and run the deploy — they're the same commits.

## Layout

```
zhlearn-overlay/
├── README.md          ← this file
├── CLAUDE.md          ← context for Claude Code sessions in this directory
├── NOTES.md           ← deploy notes + update workflow
├── deploy/
│   ├── compose.yml    ← nginx container + Traefik labels for zhlearn.ai.srmedia.ch
│   └── nginx.conf     ← gzip, no-store on HTML, immutable on fonts/images, friendly URLs
└── walkthrough/
    ├── index.html     ← wizard chrome
    ├── wizard.css     ← KTZH-styled, consumes upstream's colors_and_type.css
    └── wizard.js      ← parses DEMO-FLOW.md at runtime, navigates the 17 steps
```

## Prerequisites

This repo assumes the platform substrate at `*.ai.srmedia.ch` is up
(Traefik on the `ai-proxy` Docker network, wildcard cert resolver `le`).
It also assumes the ZHlearn upstream is cloned at the sibling path:

```sh
git clone https://github.com/Digital4Health/ZHlearn.git ~/projects/platform/tools/zhlearn
git clone https://github.com/twaenny/zhlearn-overlay.git  ~/projects/platform/tools/zhlearn-overlay
# (or the Forgejo mirror: https://git.ai.srmedia.ch/twaenny/zhlearn-overlay.git)
```

## Deploy

```sh
cd ~/projects/platform/tools/zhlearn-overlay/deploy
docker compose up -d
```

The compose mounts three things:

| Host path | Container path | Purpose |
|---|---|---|
| `…/zhlearn/`           | `/usr/share/nginx/html/`           | Upstream prototype — read-only |
| `…/zhlearn-overlay/walkthrough/` | `/usr/share/nginx/html/walkthrough/` | Walkthrough overlay |
| `…/zhlearn-overlay/deploy/nginx.conf` | `/etc/nginx/conf.d/default.conf` | nginx site config |

Bind-mounts are read-only — file edits + git checkouts in either repo
go live immediately without a container restart.

## Update workflow

Both repos are independent. Update either one at any time:

```sh
# Pull upstream prototype changes:
cd ~/projects/platform/tools/zhlearn
git pull --ff-only

# Pull preview tooling changes:
cd ~/projects/platform/tools/zhlearn-overlay
git pull --ff-only
```

The walkthrough automatically picks up new steps when `DEMO-FLOW.md`
gets new `### Step N` entries upstream — it parses the markdown at
runtime as the single source of truth (option **a** from §10.3 of
`DEMO-FLOW.md`).

## What's served

| URL                                                | Source |
|---|---|
| https://zhlearn.ai.srmedia.ch/                     | `…/zhlearn/index.html` (upstream launcher) |
| https://zhlearn.ai.srmedia.ch/lernplatz.html · etc.| `…/zhlearn/*.html` (upstream prototype screens) |
| https://zhlearn.ai.srmedia.ch/walkthrough/         | `…/zhlearn-overlay/walkthrough/index.html` (the wizard) |
| https://zhlearn.ai.srmedia.ch/healthz              | nginx — returns `ok` |

The walkthrough loads upstream screens into its iframe via paths like
`../lernplatz.html` — those resolve to the upstream-mounted root, so
the overlay never needs to copy or duplicate prototype content.

## Wizard behaviour (cheat sheet)

- 17 steps total (15 walkthrough + 2 roadmap-only).
- Keyboard: `←` / `→` (or `J` / `K`) navigate; `L` opens step list; `Esc` closes menu.
- Position persists in `localStorage` and the URL hash (`#step-3`) so links are shareable.
- Steps with two HTML files (Step 10) get file-toggle tabs in the iframe toolbar.
