#!/usr/bin/env bash
#
# Cut a release.
#
#   ./scripts/release.sh 1.1.0
#
# Bumps package.json, commits, tags, and pushes. The Release workflow then
# publishes the GitHub Release using this version's CHANGELOG.md section as the
# body — so write those notes BEFORE running this.

set -euo pipefail

VERSION="${1:-}"
if [ -z "$VERSION" ]; then
  echo "usage: ./scripts/release.sh <version>   (e.g. 1.1.0)" >&2
  exit 1
fi

VERSION="${VERSION#v}"
TAG="v$VERSION"

if ! printf '%s' "$VERSION" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  echo "error: '$VERSION' is not a MAJOR.MINOR.PATCH version." >&2
  exit 1
fi

cd "$(git rev-parse --show-toplevel)"

BRANCH="$(git branch --show-current)"
if [ "$BRANCH" != "main" ]; then
  echo "error: on branch '$BRANCH'; releases are cut from main." >&2
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "error: working tree has uncommitted changes. Commit or stash first." >&2
  exit 1
fi

if git rev-parse -q --verify "refs/tags/$TAG" >/dev/null; then
  echo "error: tag $TAG already exists." >&2
  exit 1
fi

# Commit+tag happen before the push, so a diverged main would strand them
# locally. Catch that up front instead.
git fetch origin main --quiet
if UPSTREAM="$(git rev-parse -q --verify '@{u}' 2>/dev/null)"; then
  if [ "$UPSTREAM" != "$(git rev-parse @)" ] && ! git merge-base --is-ancestor "$UPSTREAM" HEAD; then
    echo "error: main is behind or has diverged from origin/main. Pull first." >&2
    exit 1
  fi
fi

# The workflow reads notes from CHANGELOG.md, so refuse to ship an empty section.
NOTES="$(awk -v hdr="## [$VERSION]" '
  index($0, hdr) == 1     { found = 1; next }
  found && /^## \[/       { exit }
  found && /^\[[^]]+\]: / { exit }
  found                   { print }
' CHANGELOG.md)"

if ! printf '%s' "$NOTES" | grep -q '[^[:space:]]'; then
  echo "error: CHANGELOG.md has no non-empty '## [$VERSION]' section." >&2
  echo "       Write the release notes first, then re-run this script." >&2
  exit 1
fi

echo "Releasing $TAG. Notes:"
echo "---"
printf '%s\n' "$NOTES"
echo "---"
printf 'Proceed? [y/N] '
read -r REPLY
case "$REPLY" in
  [yY]) ;;
  *) echo "Aborted."; exit 1 ;;
esac

npm version "$VERSION" --no-git-tag-version >/dev/null
git add package.json package-lock.json CHANGELOG.md
git commit -m "Release $TAG"
git tag -a "$TAG" -m "$TAG"
git push origin main
git push origin "$TAG"

echo
echo "Pushed $TAG."
echo "Release:  https://github.com/moiz994/moizalam-portfolio/releases/tag/$TAG"
echo "Workflow: https://github.com/moiz994/moizalam-portfolio/actions/workflows/release.yml"
