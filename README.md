# Harmony Madang Demo

> **Git manages versions. Harmony manages participation.**

A recorded, verified multi-agent coordination run built with **Cloudflare Workers + Artifacts**.

**Live Demo:**
https://harmony-madang-demo.yonghyun-kim7.workers.dev/

---

## What this demonstrates

Two Players enter one shared **Madang** from the same canonical baseline.

Each receives a different **Mok** — a bounded responsibility with its own objective and authority.

- **Player A · EFFICIENCY**
  - Cache TTL: 300s
  - Candidate: `66c4e76...`

- **Player B · FRESHNESS**
  - Cache TTL: 30s
  - Candidate: `40b8f51...`

Both execute concurrently from the same baseline.

**Recorded execution overlap: 6,000 ms**

Neither Player can write to the other's fork or directly mutate canonical state.

The coordination lifecycle is:

**WATCH → ENTER → PLAY → YIELD → ROK → CHALLENGE → HUMAN GATE → PROMOTION → POST-VERIFY → WATCH**

---

## Harmony primitives

### Madang

A shared arena for bounded participation and coordination.

### Mok

A bounded responsibility:

> **What is mine to do — now?**

### Player

A portable capability.

Capability does not imply global authority.

### Rok

The trace left behind:

- result
- reason
- evidence
- learning
- cost

**Players move. Moks change. Roks remain.**

---

## The verified run

Canonical baseline:

`0b5a28cd6fc4b30f91ef40888af485139894584e`

Player A candidate:

`66c4e76db7307f85bd679d1f023a8d8bf409cdfa`

Player B candidate:

`40b8f510a72c96dba7e199c700004da67778c0a0`

A structured Challenge exposed an unresolved tradeoff:

- A's 300s policy may reduce repeated origin work.
- B limits configured maximum staleness to 30 seconds.
[- The available evidence does not quantify the real workload tradeoff.](https://k-harmony.rapal.tech/)

Harmony therefore does not invent a winner.

The **Human Gate opens**.

The recorded human decision selected **Candidate B**:

`40b8f510a72c96dba7e199c700004da67778c0a0`

A separate Promoter then promoted that **exact approved OID**.

Post-action verification confirmed:

- Approved OID = `40b8f510a72c96dba7e199c700004da67778c0a0`
- Canonical OID = `40b8f510a72c96dba7e199c700004da67778c0a0`
- `POST_ACTION_VERIFY=PASS`
- `HUMAN_GATE=CLOSED`

The alternative A is not erased.

Its Rok remains as preserved experience.

---

## Why this is different

This is not simply:

> two agents race and one gets merged.

Harmony asks:

- Who should participate?
- Under what responsibility?
- With what authority?
- When should they yield?
- What evidence should remain?
- When must a human enter?

> **Don't scale the pull request. Scale participation.**

---

## Cloudflare architecture

**Cloudflare Artifacts**
- Canonical baseline
- Player A fork
- Player B fork

**Cloudflare Workers**
- execution and control surface

**Harmony**
- Madang
- Mok
- Player
- Rok
- Structured Challenge
- Human Gate
- Promoter
- Post-action verification

> **Artifacts stores the worlds. Harmony governs how those worlds compete, learn, and become real.**

---

## Recorded Verified Run

The public interface is a **read-only replay** of an actual recorded run.

It does not:

- run new agents
- choose a new winner
- issue write credentials
- mutate Cloudflare Artifacts
- modify canonical state

The replay uses sanitized evidence from the sealed run.

See:

- `EVIDENCE-MAP.md` — public claim to evidence mapping
- `BUILD-STATUS.md` — deployment verification
- `BRAND-PATCH-STATUS.md` — Harmony brand alignment

---

## Run locally

Requirements:

- Node.js
- Wrangler 4.x
- Python 3

Run:

    python3 scripts/build-data.py
    npx wrangler dev --local

The build script writes only allowlisted values into `public/demo-data.json`.

---

## Navigation

The replay supports:

- Previous / Next
- scene markers
- Left / Right arrow keys
- Play / Pause
- Reset
- reduced-motion mode

Scene 05 replays the historical Human Gate decision. It does **not** create a new decision.

---

## Product family

Official Harmony project:

https://github.com/harmony-rapal/harmony-runtime

Harmony Madang Demo:

https://github.com/harmony-rapal/harmony-madang-demo

---

## License

Apache License 2.0.

---

# HARMONY

**Coordination for an Agent Society**

Built on Cloudflare Workers + Artifacts.
