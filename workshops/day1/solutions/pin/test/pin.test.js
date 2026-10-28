import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from './helpers.js';

test('กดปักหมุด → pinned: true · กดอีกครั้ง → pinned: false', async () => {
  const srv = await startTestServer();
  const first = await srv.request('POST', '/api/announcements/1/pin');
  assert.equal(first.status, 200);
  assert.equal(first.data.pinned, true);

  const second = await srv.request('POST', '/api/announcements/1/pin');
  assert.equal(second.data.pinned, false);
  await srv.close();
});

test('ปักหมุดประกาศที่ไม่มีอยู่ → 404', async () => {
  const srv = await startTestServer();
  const res = await srv.request('POST', '/api/announcements/9999/pin');
  assert.equal(res.status, 404);
  await srv.close();
});
