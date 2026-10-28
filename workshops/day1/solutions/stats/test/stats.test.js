import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from './helpers.js';

test('GET /api/stats นับจำนวนประกาศและบอกหัวข้อล่าสุด', async () => {
  const srv = await startTestServer();
  const before = await srv.request('GET', '/api/stats');
  assert.equal(before.status, 200);

  await srv.request('POST', '/api/announcements', { title: 'ประกาศใหม่ล่าสุด', body: '' });
  const after = await srv.request('GET', '/api/stats');
  assert.equal(after.data.total, before.data.total + 1);
  assert.equal(after.data.latestTitle, 'ประกาศใหม่ล่าสุด');
  await srv.close();
});

test('นับ pinned และ acks จากข้อมูลใน store', async () => {
  const srv = await startTestServer();
  srv.store.update(1, { pinned: true, acks: 3 });
  srv.store.update(2, { acks: 2 });
  const res = await srv.request('GET', '/api/stats');
  assert.equal(res.data.pinned, 1);
  assert.equal(res.data.totalAcks, 5);
  await srv.close();
});
