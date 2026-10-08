const $ = (selector) => document.querySelector(selector);
const short = (oid) => oid.slice(0, 8);
const dateTime = (value) => new Date(value).toISOString().slice(11, 19) + ' UTC';
const state = { scene: 0, playing: false, timer: null, decisionShown: false, data: null };
const names = ['MADANG OPEN', 'MOK ASSIGNED', 'PLAY', 'ROK + CHALLENGE', 'HUMAN GATE', 'PROMOTION + VERIFY'];
const phases = ['WATCH', 'ENTER', 'PLAY', 'YIELD', 'YIELD', 'RETURN'];

function player(letter, status, extra = '') {
  const d = state.data.players[letter];
  return `<div class="player-row player-${letter.toLowerCase()}"><div class="player-symbol">${letter}</div><div class="player-name"><strong>PLAYER ${letter}</strong><small>${d.mok} CAPABILITY</small></div><div class="player-status">${status}</div>${extra}</div>`;
}
function canonical(label = 'CANONICAL · S0', oid = state.data.canonical_initial_oid) {
  return `<div class="canonical"><span class="eyebrow">${label}</span><strong>${short(oid)}</strong><small>EXACT OID RECORDED</small></div>`;
}
function policy(letter) {
  const d = state.data.players[letter];
  return `<div class="policy-card policy-${letter.toLowerCase()}"><div class="policy-top"><span class="letter">${letter}</span><span class="eyebrow">MOK-${letter} · ${d.mok}</span></div><strong>${d.ttl_seconds}<small>s</small></strong><p>TTL <span class="sep">/</span> MAX STALENESS ${d.max_staleness_seconds}s</p><div class="policy-foot">SCOPE <span>cache-policy.json only</span></div></div>`;
}
function challengeSummary() {
  return `<div class="tradeoff-grid"><div><span class="eyebrow">FRESHNESS</span><p>B bounds configured maximum staleness to <b>30 seconds.</b></p></div><div><span class="eyebrow">EFFICIENCY</span><p>A's 300-second policy may reduce repeated origin work.</p></div><div><span class="eyebrow">UNCERTAINTY</span><p>No workload measurements quantify the tradeoff.</p></div></div>`;
}
function sceneOne() {
  return `<div class="scene-heading"><span class="eyebrow">01 / THE ARENA</span><h3>Participation begins<br>with a shared state.</h3></div><div class="opening-layout"><div class="arena"><span class="orbit orbit-one"></span><span class="orbit orbit-two"></span>${canonical()}</div><div class="opening-players">${player('A','WATCH')}${player('B','WATCH')}</div></div><blockquote>“What if agents don't need another GitHub?<br>What if they need a different way to participate?”</blockquote>`;
}
function sceneTwo() {
  return `<div class="scene-heading"><span class="eyebrow">02 / BOUNDED RESPONSIBILITY</span><h3>Same baseline.<br>Different Moks.</h3><p>Each Player enters with a specific responsibility, time bound, and file scope.</p></div><div class="two-column">${policy('A')}${policy('B')}</div><div class="scene-strip"><span>PLAYER A <b>WATCH → ENTER</b></span><span>PLAYER B <b>WATCH → ENTER</b></span><span>SHARED BASELINE <b>${short(state.data.canonical_initial_oid)}</b></span></div><p class="scene-note">A Mok answers: “What is mine to do — now?” Capability does not grant global project authority.</p>`;
}
function sceneThree() {
  const a = state.data.players.A, b = state.data.players.B;
  return `<div class="scene-heading"><span class="eyebrow">03 / CONCURRENT PLAY</span><h3>Two processes.<br>One exact starting point.</h3></div><div class="overlap-metric"><strong>6,000<span>ms</span></strong><div><span class="eyebrow">EXECUTION OVERLAP</span><p>Verified from Cloudflare server timestamps</p></div></div><div class="timeline"><div class="timeline-scale"><span>09:01:22</span><span>09:01:23</span><span>09:01:24</span><span>09:01:25</span><span>09:01:26</span><span>09:01:27</span><span>09:01:28</span><span>09:01:29</span></div><div class="timeline-row"><span>A <small>EFFICIENCY</small></span><div class="timeline-track"><i class="bar bar-a"></i></div><b>7s</b></div><div class="timeline-row"><span>B <small>FRESHNESS</small></span><div class="timeline-track"><i class="bar bar-b"></i></div><b>6s</b></div><div class="timeline-overlap">SHARED WINDOW · 09:01:22–09:01:28 UTC</div></div><div class="candidate-pair"><div><span>A · TTL 300s</span><strong>${short(a.base_oid)} <i>→</i> ${short(a.candidate_oid)}</strong></div><div><span>B · TTL 30s</span><strong>${short(b.base_oid)} <i>→</i> ${short(b.candidate_oid)}</strong></div></div><p class="fine-print">Recorded Worker HTTP Date headers have one-second resolution. Both candidates changed only cache-policy.json, passed validation, and were pushed to their own Artifacts forks.</p>`;
}
function rok(letter) {
  const d = state.data.players[letter];
  return `<div class="rok-card"><div><span class="eyebrow">ROK ${letter} · ${d.mok} CANDIDATE</span><strong>${short(d.candidate_oid)}<span>…</span></strong></div><span class="pass">YIELD · VALIDATED</span><p>${d.rok_summary}</p></div>`;
}
function sceneFour() {
  const c = state.data.challenge;
  return `<div class="scene-heading"><span class="eyebrow">04 / YIELD + REVIEW</span><h3>Work yields.<br>Evidence remains.</h3></div><div class="rok-pair">${rok('A')}${rok('B')}</div><div class="review-line"><span class="review-node">A <small>NEW REVIEW MOK</small></span><span class="review-arrow">→</span><span class="review-action">READ-ONLY REVIEW</span><span class="review-arrow">→</span><span class="review-node">B <small>OID UNCHANGED</small></span></div><p class="authority-note">A re-entered under a new bounded Mok. Review checks passed; A had no write authority over B or canonical.</p>${challengeSummary()}<div class="challenge-question"><span class="eyebrow">STRUCTURED CHALLENGE · PASS</span><p>“Is the 30-second freshness bound worth the potential increase in origin work?”</p><strong>TRADEOFF FOR HUMAN DECISION</strong></div>`;
}
function candidateChoice(letter) {
  const d = state.data.players[letter];
  return `<div class="choice ${letter === 'B' && state.decisionShown ? 'selected' : ''}"><div class="choice-top"><span>${letter} · ${d.mok}</span><span>${letter === 'B' && state.decisionShown ? 'HISTORICALLY SELECTED' : 'CANDIDATE'}</span></div><strong>${d.ttl_seconds}<small> seconds</small></strong><code>${short(d.candidate_oid)}…</code></div>`;
}
function sceneFive() {
  const decision = state.data.human_decision;
  return `<div class="scene-heading gate-heading"><span class="eyebrow">05 / POLICY REACHES ITS LIMIT</span><h3>HUMAN GATE <span>· OPEN</span></h3><p>Validated alternatives remain unresolved. The recorded challenge asks for judgment.</p></div><div class="choice-pair">${candidateChoice('A')}${candidateChoice('B')}</div><div class="gate-challenge"><span class="eyebrow">THE QUESTION</span><p>Is the 30-second freshness bound worth the potential increase in origin work?</p><small>No workload measurements quantify this tradeoff.</small></div>${state.decisionShown ? `<div class="decision-result"><span class="eyebrow">AUTHORIZED HUMAN DECISION · ${dateTime(decision.decision_utc)}</span><div><strong>CANDIDATE B</strong><span>EXACT APPROVED OID</span></div><code>${decision.approved_oid}</code><p>Human authority selects a candidate. It does not make the decision automatically true.</p></div>` : `<button type="button" id="decision-button" class="decision-button">REPLAY HUMAN DECISION <span>→</span></button>`}<p class="fine-print">This control reveals the historical choice. It performs no Cloudflare or repository action.</p>`;
}
function sceneSix() {
  const d = state.data;
  return `<div class="scene-heading"><span class="eyebrow">06 / EXACT PROMOTION</span><h3>Authority acts.<br>Verification closes the gate.</h3></div><div class="promoter-banner"><div><span class="eyebrow">SEPARATE CAPABILITY</span><strong>PROMOTER</strong></div><span>BUILDER A ≠ PROMOTER<br>BUILDER B ≠ PROMOTER</span></div><div class="promotion-flow"><div><span>CANONICAL · BEFORE</span><strong>${short(d.canonical_initial_oid)}</strong></div><b>→</b><div class="promoted"><span>CANONICAL · AFTER</span><strong>${short(d.final_canonical_oid)}</strong></div></div><p class="exact-binding">Exact approved OID only · ${d.promotion.approved_oid}</p><div class="verify-grid"><div><span>POST-ACTION VERIFY</span><strong class="pass">PASS</strong></div><div><span>APPROVED</span><strong>${short(d.human_decision.approved_oid)}</strong></div><div><span>CANONICAL</span><strong>${short(d.final_canonical_oid)}</strong></div></div><div class="final-state"><span>HUMAN GATE · CLOSED</span><span>PLAYER A · WATCH</span><span>PLAYER B · WATCH</span></div><div class="ending"><p>A's Rok · PRESERVED <span>/</span> B's Rok · CANONICAL RESULT</p><h4>Players move.<br>Moks change.<br>Roks remain.</h4><div><strong>HARMONY</strong><span>Coordination for an Agent Society</span><small>Built on Cloudflare Workers + Artifacts</small></div></div>`;
}
const renderers = [sceneOne, sceneTwo, sceneThree, sceneFour, sceneFive, sceneSix];
function render() {
  $('#scene-content').innerHTML = renderers[state.scene]();
  $('#scene-kicker').textContent = `SCENE ${String(state.scene + 1).padStart(2, '0')} / ${names[state.scene]}`;
  $('#scene-number').textContent = String(state.scene + 1).padStart(2, '0');
  $('#scene-time').textContent = state.scene === 2 ? '07 OCT 2026 · UTC' : 'RECORDED EVIDENCE';
  document.querySelectorAll('.lifecycle span').forEach((el, i) => el.classList.toggle('active', i === state.scene || (state.scene === 5 && i === 4)));
  $('#prev').disabled = state.scene === 0;
  $('#next').disabled = state.scene === 5;
  $('#play').innerHTML = state.playing ? 'Ⅱ <span>PAUSE REPLAY</span>' : '▶ <span>PLAY REPLAY</span>';
  $('#play').setAttribute('aria-label', state.playing ? 'Pause replay' : 'Play replay');
  $('#scene-dots').innerHTML = names.map((name, i) => `<button type="button" data-scene="${i}" class="${i === state.scene ? 'current' : ''}" aria-label="Scene ${i + 1}: ${name}" ${i === state.scene ? 'aria-current="step"' : ''}></button>`).join('');
  $('#decision-button')?.addEventListener('click', () => { state.decisionShown = true; render(); });
}
function stop() { state.playing = false; clearTimeout(state.timer); state.timer = null; }
function schedule() {
  if (!state.playing) return;
  state.timer = setTimeout(() => {
    if (state.scene === 4 && !state.decisionShown) { state.decisionShown = true; render(); schedule(); return; }
    if (state.scene === 5) { stop(); render(); return; }
    state.scene += 1; render(); schedule();
  }, state.scene === 4 && !state.decisionShown ? 6500 : 7000);
}
function go(index) { stop(); state.scene = Math.max(0, Math.min(5, index)); render(); }
$('#prev').addEventListener('click', () => go(state.scene - 1));
$('#next').addEventListener('click', () => go(state.scene + 1));
$('#reset').addEventListener('click', () => { state.decisionShown = false; go(0); });
$('#play').addEventListener('click', () => { if (state.playing) { stop(); render(); } else { if (state.scene === 5) { state.scene = 0; state.decisionShown = false; } state.playing = true; render(); schedule(); } });
$('#scene-dots').addEventListener('click', (event) => { const button = event.target.closest('[data-scene]'); if (button) go(Number(button.dataset.scene)); });
document.addEventListener('keydown', (event) => { if (event.altKey || event.ctrlKey || event.metaKey || ['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return; if (event.key === 'ArrowRight') { event.preventDefault(); go(state.scene + 1); } if (event.key === 'ArrowLeft') { event.preventDefault(); go(state.scene - 1); } });
fetch('/demo-data.json').then((response) => { if (!response.ok) throw new Error('Data unavailable'); return response.json(); }).then((data) => { state.data = data; $('#run-id').textContent = `RUN ${data.run_id}`; render(); }).catch(() => { $('#scene-content').innerHTML = '<div class="load-error">Replay data could not be loaded.</div>'; });
