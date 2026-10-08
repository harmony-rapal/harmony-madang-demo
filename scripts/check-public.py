#!/usr/bin/env python3
"""Fail closed on sensitive content in the exact deployed asset directory."""
import json
import re
from pathlib import Path

root = Path('public')
data = json.loads((root / 'demo-data.json').read_text())
allowed_hex = {
    data['evidence_manifest_sha256'], data['canonical_initial_oid'],
    data['players']['A']['candidate_oid'], data['players']['B']['candidate_oid'],
}
patterns = {
    'email address': r'[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}',
    'bearer credential': r'Bearer\s+',
    'plaintext marker': r'plaintext',
    'local source path': r'/home/rapal',
    'credential or account identifier marker': r'(api[_-]?token|secret[_-]?key|private[_-]?key|wrangler/config|account[_-]?id)',
}
errors = []
for path in root.rglob('*'):
    if not path.is_file():
        continue
    content = path.read_text()
    for label, pattern in patterns.items():
        if re.search(pattern, content, re.I):
            errors.append(f'{path}: {label}')
    for value in re.findall(r'\b[a-fA-F0-9]{32,}\b', content):
        if value not in allowed_hex:
            errors.append(f'{path}: unrecognized hex value')
    for value in re.findall(r'\b[A-Za-z0-9_-]{48,}\b', content):
        if value not in allowed_hex and value != data['mission_id']:
            errors.append(f'{path}: long token-like value')
if errors:
    print('PUBLIC SECRET SCAN: FAIL')
    print('\n'.join(errors))
    raise SystemExit(1)
print('PUBLIC SECRET SCAN: PASS')
