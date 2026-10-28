import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from './helpers.js';

test('GET /api/export.csv ได้ไฟล์ CSV พร้อมหัวตาราง', async () => {
  const srv = await startTestServer();
  const res = await srv.request('GET', '/api/export.csv');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/csv/);
  assert.match(res.headers.get('content-disposition'), /attachment/);
  const lines = res.data.replace(/^﻿/, '').split('\r\n');
  assert.equal(lines[0], 'id,title,body,createdAt');
  assert.equal(lines.length, srv.store.list().length + 1);
  await srv.close();
});

test('ข้อความที่มี , และ " ถูก escape ถูกต้อง', async () => {
  const srv = await startTestServer();
  await srv.request('POST', '/api/announcements', { title: 'ห้อง A, B', body: 'เรียกว่า "ห้องใหญ่"' });
  const res = await srv.request('GET', '/api/export.csv');
  assert.ok(res.data.includes('"ห้อง A, B"'));
  assert.ok(res.data.includes('"เรียกว่า ""ห้องใหญ่"""'));
  await srv.close();
});

test('ข้อความที่ขึ้นต้นด้วย = ถูกใส่ \' นำหน้า (กัน Excel รันสูตร)', async () => {
  const srv = await startTestServer();
  await srv.request('POST', '/api/announcements', { title: '=HYPERLINK("http://evil.example")', body: '' });
  const res = await srv.request('GET', '/api/export.csv');
  assert.ok(res.data.includes(`"'=HYPERLINK(""http://evil.example"")"`));
  await srv.close();
});
