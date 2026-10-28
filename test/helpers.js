// ไฟล์ร่วม — ตัวช่วยเปิด server จำลองสำหรับ test ของทุกฟีเจอร์
// ใช้แบบนี้ใน test/<ฟีเจอร์>.test.js:
//
//   import { startTestServer } from './helpers.js';
//   const srv = await startTestServer();          // ได้ข้อมูลตัวอย่างใหม่ทุกครั้ง
//   const res = await srv.request('POST', '/api/announcements/1/pin');
//   assert.equal(res.status, 200);  // res.data = JSON (หรือข้อความ) ที่ได้กลับมา
//   await srv.close();
import { createApp } from '../src/app.js';
import { createStore } from '../src/store.js';

export async function startTestServer() {
  const store = createStore();
  const app = createApp({
    store,
    config: { version: '0.0.0-test', runtime: 'test', appTitle: 'ทดสอบ' },
  });
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  async function request(method, path, body) {
    const res = await fetch(baseUrl + path, {
      method,
      headers: body === undefined ? {} : { 'content-type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const type = res.headers.get('content-type') || '';
    const data = type.includes('application/json') ? await res.json() : await res.text();
    return { status: res.status, headers: res.headers, data };
  }

  return {
    store,
    baseUrl,
    request,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
