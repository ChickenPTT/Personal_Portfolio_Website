#!/usr/bin/env bash
# Exports the Spring Boot site as static HTML for GitHub Pages.
# Usage: scripts/export-static.sh <base-path> [out-dir]
#   base-path: "/" for a user site, "/<repo>/" for a project site
set -euo pipefail
# Git Bash on Windows rewrites "/path" arguments; keep them as-is (no effect on Linux)
export MSYS_NO_PATHCONV=1

BASE="${1:-/}"
OUT="${2:-_site}"
PORT=8099
# context path without trailing slash ("" for root)
CTX="${BASE%/}"

WAR=$(ls target/*.war | head -n 1)
ARGS=(--server.port=$PORT)
[ -n "$CTX" ] && ARGS+=(--server.servlet.context-path="$CTX")
echo "Starting $WAR with context path '${CTX:-/}'"
java -jar "$WAR" "${ARGS[@]}" > export-app.log 2>&1 &
APP_PID=$!
trap 'kill $APP_PID 2>/dev/null || true' EXIT

URL="http://localhost:$PORT${CTX}"
for i in $(seq 1 60); do
  if curl -fs "$URL/" > /dev/null; then break; fi
  if [ "$i" = 60 ]; then echo "App did not start"; cat export-app.log; exit 1; fi
  sleep 2
done

rm -rf "$OUT"
mkdir -p "$OUT"

# Static assets (css, js, images, CV)
cp -r src/main/resources/static/. "$OUT/"

# Each page -> <page>/index.html so /about, /projects... work without a server
curl -fs "$URL/" -o "$OUT/index.html"
for page in about projects project-detail expertise gear; do
  mkdir -p "$OUT/$page"
  curl -fs "$URL/$page" -o "$OUT/$page/index.html"
done

# Old About URL
mkdir -p "$OUT/detail-profile"
cat > "$OUT/detail-profile/index.html" <<EOF
<!DOCTYPE html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${CTX}/about"><link rel="canonical" href="${CTX}/about">
EOF

cp "$OUT/index.html" "$OUT/404.html"
touch "$OUT/.nojekyll"   # serve folders as-is (no Jekyll processing)

echo "Static site written to $OUT:"
find "$OUT" -name "*.html" | sort
