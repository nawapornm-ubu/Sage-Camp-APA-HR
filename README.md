# practice-app — บอร์ดประกาศหน่วยงาน (แอปฝึกหัด Day 1)

แอปเล็กที่สุดที่ยังเดินครบลูปของทีมได้: **Issue → Feature Branch → AI Coding → PR → CI → Merge → Release → Deploy (Docker / PM2)**
ใช้ stack เดียวกับ backend ของ UBU BioLink (Node.js 20 + Express) และแบ่งงานเป็น **8 ฟีเจอร์ = 8 Feature Branch** แบบเดียวกับวันที่ 2

> 📘 **เอกสาร Workshop ทั้ง 2 วันอยู่ที่ [workshops/README.md](workshops/README.md)** — เปิดไฟล์ของงานที่กำลังทำคู่กับสไลด์ · `workshops/day1/solutions/` คือเฉลยของผู้สอน ให้ทำเองก่อน

```
Browser ──► public/index.html + app.js ──fetch /api/*──► Express (src/app.js) ──► store (memory หรือไฟล์ JSON)
                 └─ public/features/<ฟีเจอร์>.js            └─ src/features/<ฟีเจอร์>.js
```

## เริ่มใช้งาน

ต้องมี Node.js 20.12 ขึ้นไป

```bash
npm install
cp .env.example .env     # (ไม่บังคับ) ปรับชื่อบอร์ดหรือพอร์ต
npm run dev              # http://localhost:3000 — แก้โค้ดแล้วรีสตาร์ทเอง
npm run lint             # ตรวจ syntax
npm test                 # รัน test ทั้งหมด
```

## การแบ่งฟีเจอร์ให้ทีม (1 ฟีเจอร์ = 1 Feature Branch)

ทุกฟีเจอร์มีไฟล์ของตัวเอง (stub เปล่าเตรียมไว้และลงทะเบียนแล้ว) → ทำพร้อมกันได้โดยโค้ดไม่ชนกัน

| โมดูล | ฟีเจอร์ | Branch | Backend | หน้าเว็บ | Test (สร้างใหม่) |
|---|---|---|---|---|---|
| **A** | แก้ไขประกาศ | `feature/edit` | `src/features/edit.js` | `public/features/edit.js` | `test/edit.test.js` |
| **B** | ค้นหาประกาศ | `feature/search` | `src/features/search.js` | `public/features/search.js` | `test/search.test.js` |
| **C** | ปักหมุดประกาศ | `feature/pin` | `src/features/pin.js` | `public/features/pin.js` | `test/pin.test.js` |
| **D** | หมวดหมู่ประกาศ | `feature/category` | `src/features/category.js` | `public/features/category.js` | `test/category.test.js` |
| **E** | สรุปสถิติ | `feature/stats` | `src/features/stats.js` | `public/features/stats.js` | `test/stats.test.js` |
| **F** | ปุ่มรับทราบ | `feature/ack` | `src/features/ack.js` | `public/features/ack.js` | `test/ack.test.js` |
| **G** | ส่งออก CSV | `feature/export` | `src/features/export.js` | `public/features/export.js` | `test/export.test.js` |
| **H** | ธีมมืด/สว่าง + เวลาแบบสัมพัทธ์ | `feature/theme` | — | `public/features/theme.js` | `test/theme.test.js` |

รายละเอียดของแต่ละฟีเจอร์อยู่ใน **spec** ที่ `docs/specs/<โมดูล>-<name>.md` (การ์ด Issue บน Board ลิงก์มาที่นี่)

## ไฟล์สำหรับทำงานกับ AI Coding Agent

| ไฟล์ | หน้าที่ |
|---|---|
| [`AGENTS.md`](AGENTS.md) | อ่านก่อนเริ่มงานทุกครั้ง — stack, คำสั่ง, ไฟล์ร่วม, กติกา, นิยามของคำว่า "เสร็จ" |
| [`docs/specs/`](docs/specs/) | spec ของแต่ละฟีเจอร์ + แม่แบบ `_TEMPLATE.md` |
| [`docs/memory/decisions.md`](docs/memory/decisions.md) | เหตุผลของการออกแบบ (เพิ่มต่อท้ายอย่างเดียว) — กติกาของโฟลเดอร์อยู่ใน [`docs/memory/README.md`](docs/memory/README.md) |
| [`.clinerules/workflows/`](.clinerules/workflows/) | `/check-before-pr.md` · `/deploy.md` · `/new-spec.md` — ขั้นตอนงานซ้ำใน Cline |

สถานะงานดูที่ Board ของทีม

**ไฟล์ร่วม (แก้ผ่านการตกลงในทีมเท่านั้น):** `src/app.js`, `src/store.js`, `src/validation.js`, `src/features/index.js`, `public/app.js`, `public/features/index.js`, `public/index.html`, `test/helpers.js`, `package.json`

### เขียนฟีเจอร์ฝั่ง Backend

```js
// src/features/<ฟีเจอร์>.js — router ถูก mount ที่ /api แล้ว
export function register(router, { store }) {
  router.post('/announcements/:id/pin', (req, res) => { /* ... */ });
}
```

`store` มีให้ใช้: `list()` · `get(id)` · `create({ title, body })` · `update(id, patch)` · `remove(id)` — ใช้ `update` เพิ่มฟิลด์ของฟีเจอร์ได้เลย เช่น `store.update(id, { pinned: true })`

### เขียนฟีเจอร์ฝั่งหน้าเว็บ

```js
// public/features/<ฟีเจอร์>.js
export function init(ctx) {
  ctx.addItemHook((item, { actions }) => { /* เพิ่มปุ่มในการ์ด */ });
}
```

เครื่องมือใน `ctx`: `api` · `reload` · `render` · `getItems` · `addItemHook` · `addFilter` · `addSorter` · `onReload` · `toolbar` · `panel` · `header` · `notify` (คำอธิบายเต็มอยู่หัวไฟล์ `public/app.js`)

### เขียน Test ของฟีเจอร์

```js
// test/<ฟีเจอร์>.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from './helpers.js';

test('ปักหมุดได้', async () => {
  const srv = await startTestServer();
  const res = await srv.request('POST', '/api/announcements/1/pin');
  assert.equal(res.status, 200);
  await srv.close();
});
```

## ขั้นตอนทำงานด้วย Git

ทุกฟีเจอร์ทำจาก `main` ผ่าน feature branch และส่ง Pull Request กลับเข้า `main` — ห้าม commit หรือ push ตรงเข้า `main`

```bash
git switch main
git pull
git switch -c feature/pin                 # ชื่อ branch ตามตารางด้านบน
# ... ให้ AI ช่วยแก้เฉพาะไฟล์ของฟีเจอร์ตัวเอง แล้วอ่าน Diff ก่อนกดยอมรับ ...
npm run lint && npm test
git add src/features/pin.js public/features/pin.js test/pin.test.js
git commit -m "feat(pin): ปักหมุดประกาศ (#<เลข Issue>)"
git push -u origin feature/pin
gh pr create --base main --fill --body "Closes #<เลข Issue>"
```

ผู้ Review ตรวจ **Files changed** ว่าแก้เฉพาะไฟล์ของฟีเจอร์ และรอ CI เขียวก่อน merge

## API หลัก (มีอยู่แล้ว)

| Method | Path | หน้าที่ |
|---|---|---|
| GET | `/api/health` | สถานะ + `version` (จาก package.json) + `runtime` (local / docker / pm2) |
| GET | `/api/config` | ชื่อบอร์ด เวอร์ชัน และ runtime สำหรับหน้าเว็บ |
| GET | `/api/announcements` | รายการประกาศ (ใหม่สุดก่อน) |
| GET | `/api/announcements/:id` | ประกาศ 1 รายการ |
| POST | `/api/announcements` | สร้างประกาศ `{ "title": "...", "body": "..." }` — title 1–120 ตัวอักษร |
| DELETE | `/api/announcements/:id` | ลบประกาศ |

## ตัวแปรสภาพแวดล้อม

| ตัวแปร | ค่าเริ่มต้น | ความหมาย |
|---|---|---|
| `PORT` | `3000` | พอร์ตที่แอปฟัง |
| `APP_TITLE` | `บอร์ดประกาศหน่วยงาน` | ชื่อบนหัวเว็บ |
| `DEPLOY_TARGET` | `local` | แสดงที่ `/api/health` เพื่อบอกว่ากำลังดูแอปที่รันด้วยอะไร |
| `DATA_FILE` | (ว่าง) | ว่าง = เก็บใน memory (หายเมื่อรีสตาร์ท) · ใส่ path = บันทึกลงไฟล์ JSON |

ค่าใน environment จริง (Docker / PM2) มีผลเหนือไฟล์ `.env` เสมอ

## Deploy

```bash
# แบบที่ 1: Docker → http://localhost:8080
docker compose up -d --build

# แบบที่ 2: PM2 → http://localhost:3000
npm ci --omit=dev
pm2 start ecosystem.config.cjs
```

ขั้นตอนเต็ม (ตรวจ Tag → deploy → smoke test → rollback) อยู่ใน [`.clinerules/workflows/deploy.md`](.clinerules/workflows/deploy.md) — ใน Cline สั่ง `/deploy.md` ได้เลย
