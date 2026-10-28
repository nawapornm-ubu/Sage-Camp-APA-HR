import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { createStore } from '../src/store.js';

let server;
let baseUrl;

before(async () => {
  const app = createApp({
    store: createStore(),
    config: { version: '0.0.0-test', runtime: 'test', appTitle: 'ทดสอบ' },
  });
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

const post = (body) =>
  fetch(`${baseUrl}/api/announcements`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

test('GET /api/health ตอบ status ok พร้อม version และ runtime', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.status, 'ok');
  assert.equal(data.version, '0.0.0-test');
  assert.equal(data.runtime, 'test');
});

test('GET /api/announcements ได้รายการเริ่มต้น', async () => {
  const res = await fetch(`${baseUrl}/api/announcements`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data));
  assert.ok(data.length >= 2);
});

test('POST /api/announcements สร้างประกาศได้', async () => {
  const res = await post({ title: '  ประชุมทีม  ', body: 'บ่ายสองโมง' });
  assert.equal(res.status, 201);
  const item = await res.json();
  assert.equal(item.title, 'ประชุมทีม');
  assert.ok(item.id);

  const got = await fetch(`${baseUrl}/api/announcements/${item.id}`);
  assert.equal(got.status, 200);
});

test('POST /api/announcements ไม่มี title → 400', async () => {
  const res = await post({ body: 'ไม่มีหัวข้อ' });
  assert.equal(res.status, 400);
});

test('POST JSON ผิดรูปแบบ → 400', async () => {
  const res = await fetch(`${baseUrl}/api/announcements`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{ไม่ใช่ json',
  });
  assert.equal(res.status, 400);
});

test('DELETE ประกาศที่ไม่มีอยู่ → 404', async () => {
  const res = await fetch(`${baseUrl}/api/announcements/9999`, { method: 'DELETE' });
  assert.equal(res.status, 404);
});
