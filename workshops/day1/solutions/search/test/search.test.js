import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from './helpers.js';

test('ค้นหาจากหัวข้อหรือรายละเอียดได้ (ไม่สนตัวพิมพ์เล็ก/ใหญ่)', async () => {
  const srv = await startTestServer();
  await srv.request('POST', '/api/announcements', { title: 'ประชุม Kickoff', body: 'ห้อง 301' });
  const res = await srv.request('GET', '/api/search?q=kickoff');
  assert.equal(res.status, 200);
  assert.equal(res.data.length, 1);
  assert.equal(res.data[0].title, 'ประชุม Kickoff');

  const byBody = await srv.request('GET', `/api/search?q=${encodeURIComponent('ห้อง 301')}`);
  assert.equal(byBody.data.length, 1);
  await srv.close();
});

test('ไม่ใส่คำค้น → ได้ทุกรายการ', async () => {
  const srv = await startTestServer();
  const all = await srv.request('GET', '/api/announcements');
  const res = await srv.request('GET', '/api/search');
  assert.equal(res.data.length, all.data.length);
  await srv.close();
});

test('ไม่พบ → ได้ array ว่าง', async () => {
  const srv = await startTestServer();
  const res = await srv.request('GET', '/api/search?q=zzzz-not-found');
  assert.deepEqual(res.data, []);
  await srv.close();
});
