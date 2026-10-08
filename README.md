# Harmony Madang demo

A responsive, static replay of the sealed Harmony Cloudflare A/B proof. The public controls navigate recorded scenes and reveal the historical human decision. They do not call mutation endpoints.

## Run locally

```sh
python3 scripts/build-data.py
npx wrangler dev --local
```

The script checks the sealed evidence manifest SHA-256 and writes only allowlisted values to `public/demo-data.json`. Wrangler 4.148.0 was used to verify the `assets.directory` static asset configuration. No runtime Worker code, framework, database, or authentication is needed.

## Navigation

Use Previous/Next, the scene markers, Left/Right arrow keys, or Play/Pause. Reset returns to Scene 01. The Scene 05 button reveals the recorded decision B; it does not select a new candidate. CSS respects `prefers-reduced-motion`.

## Deploy

Run the data integrity and public asset scan, then `npx wrangler deploy`. The Worker name is `harmony-madang-demo`. See `EVIDENCE-MAP.md` for the claim-to-evidence mapping and `BUILD-STATUS.md` for deployment verification.
