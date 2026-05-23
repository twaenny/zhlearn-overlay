# Deploy notes

## URL

https://zhlearn.ai.srmedia.ch — public, no auth (add Authentik forward-auth
if the content becomes sensitive; cookbook lives in the operator notes).

## Container

`ai-zhlearn` on the `ai-proxy` Docker network. Image: `nginx:1.27-alpine`.
Three read-only bind-mounts:

| Container path | Host source |
|---|---|
| `/usr/share/nginx/html/` | `…/zhlearn/` (upstream clone) |
| `/usr/share/nginx/html/walkthrough/` | `…/zhlearn-overlay/walkthrough/` |
| `/etc/nginx/conf.d/default.conf` | `…/zhlearn-overlay/deploy/nginx.conf` |

## Bring up / tear down

```sh
cd ~/projects/platform/tools/zhlearn-overlay/deploy
docker compose up -d
docker compose down       # to stop
docker compose logs -f    # to tail
```

## What's editable live

Edits to either repo show up on the next page load — no container
restart needed. nginx serves HTML with `Cache-Control: no-store` and
CSS/JS with default short cache. Fonts/images are immutable + 30d cache.

The walkthrough wizard fetches `../DEMO-FLOW.md` with `cache: 'no-cache'`,
so prose updates upstream are picked up on the next reload too.

## Update workflow

Both repos are independent — pull either one without touching the other:

```sh
# Upstream prototype (Digital4Health/ZHlearn):
cd ~/projects/platform/tools/zhlearn
git pull --ff-only

# This overlay (twaenny/zhlearn-overlay on Forgejo):
cd ~/projects/platform/tools/zhlearn-overlay
git pull --ff-only
```

If `docker compose up -d` was never run after the host reboot, run it
once — the `restart: unless-stopped` policy then keeps the container
alive across reboots.

## Healthchecks

- `https://zhlearn.ai.srmedia.ch/healthz` → `ok`
- `docker inspect ai-zhlearn --format '{{.State.Status}}'` → `running`

## Traefik routing

A single router `zhlearn` (priority default) matches
`Host(`zhlearn.ai.srmedia.ch`)` on the websecure entrypoint with the
`le` resolver against the platform's `*.ai.srmedia.ch` wildcard cert.
No extra middleware in front; add `authentik-forward-auth@file` if a
gated subset of paths is needed later.
