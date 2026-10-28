import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from './helpers.js';

test('GET /api/categories ได้รายการหมวดหมู่', async () => {
  const srv = await startTestServer();
  const res = await srv.request('GET', '/api/categories');
  assert.equal(res.status, 200);
  assert.ok(res.data.includes('ด่วน'));
  await srv.close();
});

test('ตั้งหมวดหมู่ที่ถูกต้องได้', async () => {
  const srv = await startTestServer();
  const res = await srv.request('PUT', '/api/announcements/1/category', { category: 'ด่วน' });
  assert.equal(res.status, 200);
  assert.equal(res.data.category, 'ด่วน');
  await srv.close();
});

test('หมวดหมู่ที่ไม่มีในรายการ → 400 · ประกาศที่ไม่มีอยู่ → 404', async () => {
  const srv = await startTestServer();
  const bad = await srv.request('PUT', '/api/announcements/1/category', { category: 'อื่น ๆ' });
  assert.equal(bad.status, 400);
  const missing = await srv.request('PUT', '/api/announcements/9999/category', { category: 'ด่วน' });
  assert.equal(missing.status, 404);
  await srv.close();
});
