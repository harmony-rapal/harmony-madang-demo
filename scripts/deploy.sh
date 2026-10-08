#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/build-data.py
node --check public/app.js
python3 scripts/check-public.py
npx --yes wrangler deploy --dry-run
npx --yes wrangler deploy
