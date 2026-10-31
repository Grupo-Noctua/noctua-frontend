#!/usr/bin/env bash
set -euo pipefail

# Build and push script for noctua-frontend
# Usage:
#   export DOCKERHUB_USER=eduardofacini
#   export DOCKERHUB_REPO=elersonalves/noctua-frontend
#   export DOCKERHUB_TAG=latest
#   export DOCKERHUB_TOKEN=<your-token>  # recommended to set as env var
#   ./scripts/build_and_push.sh

: "Building image ${DOCKERHUB_REPO}:${DOCKERHUB_TAG}"

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT_DIR"

IMAGE="docker.io/${DOCKERHUB_REPO}:${DOCKERHUB_TAG:-latest}"

echo "Checking docker availability..."
if ! command -v docker >/dev/null 2>&1; then
  echo "docker not found in PATH. Install Docker and retry." >&2
  exit 2
fi

echo "Building frontend image..."
docker build -t "$IMAGE" .

echo "Logging in to Docker Hub as ${DOCKERHUB_USER:-<user>}..."
if [ -z "${DOCKERHUB_TOKEN:-}" ]; then
  echo "Please set DOCKERHUB_TOKEN environment variable with a Docker Hub token and retry." >&2
  exit 3
fi
echo "$DOCKERHUB_TOKEN" | docker login -u "${DOCKERHUB_USER:-}" --password-stdin docker.io

echo "Pushing image $IMAGE..."
docker push "$IMAGE"

echo "Retrieving pushed image digest..."
DIGEST=$(docker inspect --format='{{index .RepoDigests 0}}' "$IMAGE" || true)
echo "Pushed image: $IMAGE"
echo "RepoDigest: $DIGEST"

echo "Done. Update your infra application.local.json frontend_image to either the image tag ($IMAGE) or the digest ($DIGEST)."
