import test from 'node:test'; import assert from 'node:assert/strict';
import { summarize } from '../performance_testing/analyze_results.js';
import { readCsv } from '../scripts/lib.js';

test('template has only PENDING rows and no seconds (nothing fabricated)', () => {
  const { data } = readCsv('performance_testing/results_template.csv');
  assert.equal(data.length, 48);
  assert.ok(data.every((r) => r.status === 'PENDING' && r.seconds === ''));
  assert.ok(summarize(data).every((s) => s.n === 0 && s.mean === null));
});
test('summarize computes correct stats on a known example (illustrative data, not real measurements)', () => {
  const rows = [['T1', 'f', 'A', 2], ['T1', 'f', 'A', 4], ['T1', 'f', 'A', 6], ['T1', 'f', 'B', 3], ['T1', 'f', 'B', 3], ['T1', 'f', 'B', 3]]
    .map(([test_id, factor, level, s]) => ({ test_id, factor, level, seconds: String(s), status: 'MEASURED' }));
  const [a, b] = summarize(rows);
  assert.equal(a.mean, 4); assert.equal(a.median, 4); assert.equal(a.sd, 2); assert.equal(b.pctVsBaseline, -25);
});
test('unmeasured or invalid rows are ignored', () => {
  const [g] = summarize([{ test_id: 'T', factor: 'f', level: 'L', seconds: '5', status: 'PENDING' }, { test_id: 'T', factor: 'f', level: 'L', seconds: 'abc', status: 'MEASURED' }]);
  assert.equal(g.n, 0); assert.equal(g.pending, 2);
});
