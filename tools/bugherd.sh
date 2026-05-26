#!/usr/bin/env bash
# Bugherd helper for the ZHlearn overlay.
#
# Pulls tasks for project 522520 (zhlearn.ai.srmedia.ch) and emits
# ready-to-paste Claude Code prompts that follow the overlay's
# architecture rules (no upstream edits, scoped CSS, etc.).
#
# Auth: Bugherd API v2 uses Basic auth — API key as username, "x" as
# password. Get your key at https://www.bugherd.com/settings/api or
# Profile → API access.
#
# Usage:
#   export BUGHERD_API_KEY=...
#   ./tools/bugherd.sh list                # markdown table of open tasks
#   ./tools/bugherd.sh task <id>           # full task JSON for one task
#   ./tools/bugherd.sh prompt <id>         # claude-code prompt with that task
#   ./tools/bugherd.sh prompt <id> | xclip # → clipboard

set -euo pipefail

PROJECT_ID="${BUGHERD_PROJECT_ID:-522520}"
API_BASE="https://www.bugherd.com/api_v2"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE="${SCRIPT_DIR}/bugherd-fix-prompt.md"

if [[ -z "${BUGHERD_API_KEY:-}" ]]; then
  echo "Error: BUGHERD_API_KEY is not set." >&2
  echo "Get a key at https://www.bugherd.com/settings/api, then:" >&2
  echo "  export BUGHERD_API_KEY=your_key_here" >&2
  exit 2
fi

# Bugherd auth: key as user, "x" as password (per their docs).
CURL_AUTH=(-u "${BUGHERD_API_KEY}:x" -sf --max-time 20)

require_jq() {
  command -v jq >/dev/null 2>&1 || {
    echo "Error: jq not installed (apt-get install jq)" >&2; exit 2;
  }
}

cmd_list() {
  require_jq
  # Bugherd statuses: feedback (new), backlog, todo, doing, done, closed.
  # We want anything not yet done/closed.
  local raw
  raw="$(curl "${CURL_AUTH[@]}" "${API_BASE}/projects/${PROJECT_ID}/tasks.json?status=feedback,backlog,todo,doing")" \
    || { echo "API error fetching tasks (HTTP failure)" >&2; exit 1; }

  local count
  count="$(echo "$raw" | jq -r '.tasks | length')"
  if [[ "$count" -eq 0 ]]; then
    echo "No open tasks in project ${PROJECT_ID}."
    return 0
  fi

  echo "# Bugherd — project ${PROJECT_ID} · ${count} open task(s)"
  echo
  echo "| id | sev | status | URL | first comment |"
  echo "|----|-----|--------|-----|---------------|"
  echo "$raw" | jq -r '
    .tasks[] |
    [
      ("[BH-" + (.local_task_id | tostring) + "]"),
      (.severity // "—"),
      (.status // "—"),
      ("`" + (.site // .url // "—") + "`"),
      ((.description // "") | gsub("\n"; " ") | .[0:140])
    ] |
    "| " + join(" | ") + " |"
  '
}

cmd_task() {
  require_jq
  local id="$1"
  if [[ -z "${id:-}" ]]; then
    echo "Usage: $0 task <id>" >&2; exit 2
  fi
  curl "${CURL_AUTH[@]}" "${API_BASE}/projects/${PROJECT_ID}/tasks/${id}.json" | jq .
}

cmd_prompt() {
  require_jq
  local id="$1"
  if [[ -z "${id:-}" ]]; then
    echo "Usage: $0 prompt <id>" >&2; exit 2
  fi
  if [[ ! -f "$TEMPLATE" ]]; then
    echo "Error: template not found at $TEMPLATE" >&2; exit 1
  fi

  local raw
  raw="$(curl "${CURL_AUTH[@]}" "${API_BASE}/projects/${PROJECT_ID}/tasks/${id}.json")"

  local task_id page_url selector screenshot description severity status reporter
  task_id="$(echo "$raw" | jq -r '.task.local_task_id // .task.id')"
  page_url="$(echo "$raw" | jq -r '.task.site // .task.url // "(no URL)"')"
  selector="$(echo "$raw" | jq -r '.task.selector // "(no selector)"')"
  screenshot="$(echo "$raw" | jq -r '.task.screenshot_url // "(no screenshot)"')"
  description="$(echo "$raw" | jq -r '.task.description // "(no description)"')"
  severity="$(echo "$raw" | jq -r '.task.severity // "—"')"
  status="$(echo "$raw" | jq -r '.task.status // "—"')"
  reporter="$(echo "$raw" | jq -r '.task.requester_email // .task.requester // "—"')"

  # Comment thread (optional)
  local comments
  comments="$(echo "$raw" | jq -r '
    (.task.comments // []) |
    if length == 0 then "(no follow-up comments)"
    else map("- " + (.user.email // .user.display_name // "anonymous") + ": " + .text) | join("\n")
    end
  ')"

  # Fill the template via sed; use a delimiter unlikely to appear in URLs.
  sed \
    -e "s|{TASK_ID}|${task_id}|g" \
    -e "s|{PAGE_URL}|${page_url}|g" \
    -e "s|{SELECTOR}|${selector}|g" \
    -e "s|{SCREENSHOT_URL}|${screenshot}|g" \
    -e "s|{SEVERITY}|${severity}|g" \
    -e "s|{STATUS}|${status}|g" \
    -e "s|{REPORTER}|${reporter}|g" \
    "$TEMPLATE" |
  awk -v desc="$description" -v cmts="$comments" '
    /\{DESCRIPTION\}/ { gsub(/\{DESCRIPTION\}/, desc); print; next }
    /\{COMMENTS\}/    { gsub(/\{COMMENTS\}/, cmts);    print; next }
    { print }
  '
}

main() {
  local cmd="${1:-list}"
  shift || true
  case "$cmd" in
    list)   cmd_list "$@" ;;
    task)   cmd_task "$@" ;;
    prompt) cmd_prompt "$@" ;;
    help|-h|--help)
      sed -n '2,/^$/p' "$0" | sed 's|^# \{0,1\}||' ;;
    *)
      echo "Unknown command: $cmd" >&2
      echo "Usage: $0 {list|task <id>|prompt <id>}" >&2
      exit 2 ;;
  esac
}

main "$@"
