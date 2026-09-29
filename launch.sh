#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-4173}"

check_port() {
  if ss -tln 2>/dev/null | awk '{print $4}' | grep -qE "[:.]${PORT}$"; then
    echo "  ERROR: port ${PORT} is already in use — another launch.sh may be running." >&2
    echo "         Stop that instance first (Ctrl+C) or run with PORT=<other> ./launch.sh" >&2
    exit 1
  fi
}

cleanup() {
  echo ""
  echo "Shutting down..."
  kill "$SERVER_PID" 2>/dev/null
  wait "$SERVER_PID" 2>/dev/null
  echo "Done."
  exit 0
}
trap cleanup SIGINT SIGTERM

check_port

echo "  Building static export..."
npm run build >/dev/null

if command -v npx >/dev/null 2>&1 && [ -x "node_modules/.bin/serve" ]; then
  SERVE_BIN="node_modules/.bin/serve"
elif command -v npx >/dev/null 2>&1; then
  SERVE_BIN="npx serve"
else
  echo "  ERROR: 'serve' not available — run 'npm install serve' first." >&2
  exit 1
fi

echo "  Portfolio → http://localhost:${PORT}"
"$SERVE_BIN" "$ROOT/out" -l "${PORT}" &
SERVER_PID=$!

echo "Press Ctrl+C to stop."
wait "$SERVER_PID"