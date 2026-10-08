#!/usr/bin/env python3
"""Build the public, allowlisted replay data from the sealed evidence."""
import hashlib
import json
from pathlib import Path

SOURCE = Path('/home/rapal/harmony-cf-ab-control/evidence/HARMONY-CLOUDFLARE-ATOMIC-AB-001/20261007T090013Z')
EXPECTED_MANIFEST = 'b32ba7610317dc0bc070fe291e769db66b3eaea54c15955a6715547c4bfb9754'
if hashlib.sha256((SOURCE / 'EVIDENCE-SHA256.txt').read_bytes()).hexdigest() != EXPECTED_MANIFEST:
    raise SystemExit('Evidence manifest hash mismatch')

def read(name):
    return json.loads((SOURCE / name).read_text())

mok_a, mok_b = read('MOK-A.json'), read('MOK-B.json')
rok_a, rok_b = read('ROK-A.json'), read('ROK-B.json')
verification, challenge = read('verification.json'), read('CHALLENGE.json')
decision, promotion = read('HUMAN-DECISION.json'), read('PROMOTION-RECEIPT.json')

data = {
    'mission_id': mok_a['mission_id'],
    'run_id': '20261007T090013Z',
    'evidence_manifest_sha256': EXPECTED_MANIFEST,
    'canonical_initial_oid': mok_a['base_oid'],
    'players': {
        'A': {
            'mok': mok_a['objective'],
            'ttl_seconds': mok_a['cache_ttl_seconds'],
            'max_staleness_seconds': mok_a['max_staleness_seconds'],
            'base_oid': mok_a['base_oid'],
            'candidate_oid': rok_a['candidate_oid'],
            'changed_files': rok_a['changed_files'],
            'validation': 'PASS',
            'execution': {
                'enter_server_date': rok_a['execution']['enter_server_date'],
                'yield_server_date': rok_a['execution']['yield_server_date'],
            },
            'rok_summary': 'Efficiency candidate validated; alternative preserved.'
        },
        'B': {
            'mok': mok_b['objective'],
            'ttl_seconds': mok_b['cache_ttl_seconds'],
            'max_staleness_seconds': mok_b['max_staleness_seconds'],
            'base_oid': mok_b['base_oid'],
            'candidate_oid': rok_b['candidate_oid'],
            'changed_files': rok_b['changed_files'],
            'validation': 'PASS',
            'execution': {
                'enter_server_date': rok_b['execution']['enter_server_date'],
                'yield_server_date': rok_b['execution']['yield_server_date'],
            },
            'rok_summary': 'Freshness candidate validated.'
        }
    },
    'execution': {
        'overlap_ms': verification['overlap_ms'],
        'timestamp_source': 'Cloudflare Worker HTTP Date headers',
        'timestamp_resolution_ms': verification['server_timestamp_resolution_ms'],
        'separate_concurrent_processes': True,
        'forks_only': True,
    },
    'challenge': {
        'reviewer': challenge['challenger'],
        'reviewed_player': challenge['challenged_player'],
        'new_mok': 'Bounded structured challenge of Player B freshness candidate',
        'authority': 'Read-only review of B; no write authority over B or canonical',
        'review_window': challenge['review_server_window'],
        'review_checks': challenge['result']['review_checks'],
        'b_oid_unchanged': not challenge['result']['fork_b_modified_by_review'],
        'efficiency': challenge['tradeoff']['efficiency'],
        'freshness': challenge['tradeoff']['freshness'],
        'uncertainty': challenge['tradeoff']['uncertainty'],
        'question': challenge['challenge_question'],
        'disposition': challenge['result']['disposition'],
        'winner_selected': challenge['result']['winner_selected'],
    },
    'human_decision': {
        'type': decision['decision_type'],
        'selected_candidate': decision['selected_candidate'],
        'approved_oid': decision['approved_oid'],
        'reason': decision['reason'],
        'decision_utc': decision['decision_utc'],
    },
    'promotion': {
        'role': promotion['promoter_role'],
        'canonical_before': promotion['canonical_before'],
        'approved_oid': promotion['approved_oid'],
        'canonical_after': promotion['canonical_after'],
        'exact_oid_binding': promotion['exact_oid_binding'],
        'post_action_verify': promotion['post_action_verify'],
        'human_gate': promotion['human_gate'],
        'verified_utc': promotion['verified_utc'],
    },
    'final_canonical_oid': promotion['canonical_after'],
    'final_player_states': {'A': 'WATCH', 'B': 'WATCH'},
}
assert data['players']['A']['base_oid'] == data['players']['B']['base_oid'] == data['canonical_initial_oid']
assert data['human_decision']['approved_oid'] == data['promotion']['canonical_after'] == data['final_canonical_oid']
assert data['execution']['overlap_ms'] == 6000
Path('public/demo-data.json').write_text(json.dumps(data, indent=2) + '\n')
