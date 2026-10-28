import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from './helpers.js';

test('กดรับทราบ 2 ครั้ง → acks เพิ่มเป็น 2', async () => {
  const srv = await startTestServer();
  const first = await srv.request('POST', '/api/announcements/1/ack');
  assert.equal(first.status, 200);
  assert.equal(first.data.acks, 1);
  const second = await srv.request('POST', '/api/announcements/1/ack');
  assert.equal(second.data.acks, 2);
  await srv.close();
});

test('รับทราบประกาศที่ไม่มีอยู่ → 404', async () => {
  const srv = await startTestServer();
  const res = await srv.request('POST', '/api/announcements/9999/ack');
  assert.equal(res.status, 404);
  await srv.close();
});
