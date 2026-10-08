# Evidence map

Public replay source: sealed run `HARMONY-CLOUDFLARE-ATOMIC-AB-001 / 20261007T090013Z`. This repository contains only an allowlisted derivative in `public/demo-data.json`. The source evidence remains read-only. The SHA-256 of its `EVIDENCE-SHA256.txt` manifest is `b32ba7610317dc0bc070fe291e769db66b3eaea54c15955a6715547c4bfb9754`.

| Public claim | Exact source evidence file |
| --- | --- |
| Mission, S0, both Moks, TTL and max staleness, permitted file | `MOK-A.json`, `MOK-B.json` |
| A/B exact candidate OIDs, S0 parents, single changed file, validation, respective fork push and Rok summaries | `ROK-A.json`, `ROK-B.json`, `A-candidate-oid.txt`, `B-candidate-oid.txt`, `postflight-a-main.txt`, `postflight-b-main.txt` |
| Separate concurrent processes | `EXECUTION_RESULT.txt`, `PLAYER-A.events`, `PLAYER-B.events`, `verification.json` |
| Scene 03 server windows, 6,000 ms overlap, one-second timestamp resolution | `PLAYER-A.events`, `PLAYER-B.events`, `verification.json`, `EXECUTION_RESULT.txt` |
| Canonical remained S0 during play and challenge | `verification.json`, `postflight-canonical-main.txt`, `EXECUTION_RESULT.txt` |
| New bounded review Mok; read-only authority | `MOK-A-REVIEW.json`, `CHALLENGE.json` |
| B OID unchanged before and after review | `review-b-before-main.txt`, `review-b-after-main.txt`, `CHALLENGE.json` |
| Freshness/efficiency tradeoff, missing workload measurements, no autonomous winner | `CHALLENGE.json` |
| Historical human choice B and exact approved OID | `HUMAN-DECISION.json` |
| Separate Promoter, exact OID binding, canonical after promotion, post-action PASS, closed gate | `PROMOTION-RECEIPT.json`, `final-canonical-main.txt`, `FINAL-STATUS.txt` |
| Final Players WATCH; A's alternative preserved | `FINAL-STATUS.txt`, `HUMAN-DECISION.json`, `ROK-A.json` |

The interface copy defining Madang, Mok, Player, Rok, and the product thesis comes from the UI mission brief. It is explanatory product language, not a claim that additional runtime machinery executed in this run.
