#!/usr/bin/env bash
# Build tm-app image and (re)start tm-app-server container on port 5000.
set -euo pipefail

cd "$(dirname "$0")"

IMAGE=tm-app:latest
CONTAINER=tm-app-server
PORT=5000

echo "▸ docker build $IMAGE"
docker build -t "$IMAGE" .

echo "▸ stop/remove existing $CONTAINER (if any)"
docker rm -f "$CONTAINER" 2>/dev/null || true

echo "▸ start $CONTAINER on host port $PORT"
docker run -d \
  --name "$CONTAINER" \
  --restart unless-stopped \
  -p "${PORT}:3000" \
  "$IMAGE"

sleep 3
docker ps --filter "name=^/${CONTAINER}\$" --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
echo "✔ deployed: http://localhost:${PORT}"
