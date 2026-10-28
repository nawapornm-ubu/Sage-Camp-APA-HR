import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from './helpers.js';

test('PATCH แก้หัวข้อได้ และฟิลด์ที่ไม่ส่งยังเป็นค่าเดิม', async () => {
  const srv = await startTestServer();
  const before = srv.store.get(1);
  const res = await srv.request('PATCH', '/api/announcements/1', { title: 'หัวข้อใหม่' });
  assert.equal(res.status, 200);
  assert.equal(res.data.title, 'หัวข้อใหม่');
  assert.equal(res.data.body, before.body);
  await srv.close();
});

test('PATCH หัวข้อว่าง → 400', async () => {
  const srv = await startTestServer();
  const res = await srv.request('PATCH', '/api/announcements/1', { title: '   ' });
  assert.equal(res.status, 400);
  await srv.close();
});

test('PATCH ประกาศที่ไม่มีอยู่ → 404', async () => {
  const srv = await startTestServer();
  const res = await srv.request('PATCH', '/api/announcements/9999', { title: 'x' });
  assert.equal(res.status, 404);
  await srv.close();
});
