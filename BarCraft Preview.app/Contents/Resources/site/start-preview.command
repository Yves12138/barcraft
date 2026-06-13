#!/bin/zsh
cd "$(dirname "$0")"
PORT=8765
URL="http://127.0.0.1:${PORT}/index.html"
LOG_FILE="/tmp/barcraft-preview.log"
echo "Starting BarCraft preview at ${URL}"
python3 -m http.server "${PORT}" --bind 127.0.0.1 >"${LOG_FILE}" 2>&1 &
SERVER_PID=$!
sleep 1

if ! kill -0 "${SERVER_PID}" 2>/dev/null; then
  echo ""
  echo "Preview server failed to start. Details:"
  cat "${LOG_FILE}"
  echo ""
  echo "Press Enter to close this window."
  read
  exit 1
fi

open -a "Safari" "${URL}" 2>/dev/null || open "${URL}" 2>/dev/null || true
echo ""
echo "Preview is running:"
echo "${URL}"
echo ""
echo "Keep this window open while previewing. Press Control-C to stop."
wait "${SERVER_PID}"
