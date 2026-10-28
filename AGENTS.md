# AGENTS.md — practice-app (บอร์ดประกาศหน่วยงาน)

คู่มือสำหรับ AI Coding Agent (Cline, Kilo Code, Claude Code ฯลฯ) และนักพัฒนาที่ทำงานใน repo นี้ — **อ่านไฟล์นี้ก่อนเริ่มงานทุกครั้ง**

## โปรเจกต์นี้คืออะไร

เว็บบอร์ดประกาศของหน่วยงาน: ดู / เพิ่ม / ลบประกาศ และเพิ่มความสามารถทีละฟีเจอร์ผ่านโครงสร้าง "feature slot"

| ส่วน | เทคโนโลยี | ที่อยู่ |
|---|---|---|
| Backend | Node.js 20 + Express 4 (ES Modules) | `src/` |
| หน้าเว็บ | HTML + JavaScript ล้วน (ES Modules, ไม่มี build step) | `public/` |
| ข้อมูล | memory หรือไฟล์ JSON (`DATA_FILE`) — ไม่มีฐานข้อมูล | `src/store.js` |
| Test | `node:test` + `fetch` (ไม่มี dependency เพิ่ม) | `test/` |
| Deploy | Docker (`docker-compose.yml`) · PM2 (`ecosystem.config.cjs`) | ราก repo |

## คำสั่ง

```bash
npm install          # ติดตั้ง dependencies
npm run dev          # รันที่ http://localhost:3000 (รีสตาร์ทเองเมื่อแก้โค้ด)
npm run lint         # ตรวจ syntax ทุกไฟล์ .js — ต้องเห็น "lint ผ่าน"
npm test             # รัน test ทั้งหมด — ต้องเห็น "fail 0"
```

`curl` ในเอกสารนี้ใช้ได้ใน Git Bash / macOS / Linux — ใน Windows PowerShell ให้พิมพ์ `curl.exe` แทน `curl`

## โครงสร้างและความเป็นเจ้าของไฟล์

ฟีเจอร์ทุกตัวมี "ช่อง" ของตัวเองที่ลงทะเบียนไว้แล้ว — **งานของฟีเจอร์ต้องอยู่ในไฟล์ของฟีเจอร์นั้นเท่านั้น**

| ไฟล์ของฟีเจอร์ `<name>` | หน้าที่ |
|---|---|
| `src/features/<name>.js` | `export function register(router, { store })` — เพิ่ม route (router mount ที่ `/api` แล้ว) |
| `public/features/<name>.js` | `export function init(ctx)` — เพิ่มปุ่ม/ตัวกรอง/การแสดงผล (`ctx` อธิบายไว้หัวไฟล์ `public/app.js`) |
| `test/<name>.test.js` | test ของฟีเจอร์ ใช้ `startTestServer()` จาก `test/helpers.js` |

ฟีเจอร์ที่มีช่องอยู่: `edit` `search` `pin` `category` `stats` `ack` `export` `theme` — สเปกของแต่ละตัวอยู่ใน `docs/specs/`

**ไฟล์ร่วม — ห้ามแก้ เว้นแต่ spec ระบุไว้ชัดเจนและมนุษย์อนุมัติ:**
`src/app.js` · `src/store.js` · `src/validation.js` · `src/config.js` · `src/server.js` · `src/features/index.js` · `public/app.js` · `public/features/index.js` · `public/index.html` · `test/helpers.js` · `package.json` · `package-lock.json` · `Dockerfile` · `docker-compose.yml` · `ecosystem.config.cjs` · `.github/`

## API ที่มีให้ใช้ในโค้ดฟีเจอร์

- `store.list()` · `store.get(id)` · `store.create({ title, body })` · `store.update(id, patch)` · `store.remove(id)`
  - `store.update` ใช้เพิ่มฟิลด์ของฟีเจอร์ได้ทันที เช่น `{ pinned: true }` — ห้ามแก้ `id` และ `createdAt`
- `validateAnnouncement(input)` จาก `src/validation.js` — กติกาเดียวกับตอนสร้างประกาศ
- ฟิลด์ที่ฟีเจอร์ต่าง ๆ ตกลงกันไว้: `pinned` (boolean, ฟีเจอร์ pin) · `category` (string, ฟีเจอร์ category) · `acks` (number, ฟีเจอร์ ack) — ห้ามเปลี่ยนชื่อ

## วิธีทำงาน (ต้องทำตามลำดับ)

1. อ่าน `docs/specs/<โมดูล>-<name>.md` ของงานนี้ให้ครบ — ถ้าไม่มี spec **อย่าเริ่มเขียนโค้ด** ให้ทำตาม workflow `new-spec` แล้วรอมนุษย์อนุมัติ
2. อ่าน `docs/memory/decisions.md` — อย่าเสนอสิ่งที่ขัดกับการตัดสินใจที่บันทึกไว้ (เช่น เปลี่ยนไปใช้ฐานข้อมูล หรือ framework หน้าเว็บ)
3. เสนอแผน: ไฟล์ที่จะแก้ + สิ่งที่จะทำในแต่ละไฟล์ → **รอมนุษย์อนุมัติก่อนแก้ไฟล์**
4. แก้ทีละไฟล์ตามแผน
5. ทำ Acceptance Criteria ใน spec ให้ครบทุกข้อ และรายงานผลของแต่ละคำสั่งที่รัน
6. ก่อนเปิด PR ทำตาม workflow `check-before-pr`

**ถ้า spec ไม่ชัด ขัดกันเอง หรือดูเหมือนต้องแก้ไฟล์ร่วม → หยุดแล้วถามมนุษย์ อย่าเดา**

## กติกาที่ห้ามพลาด

- **ห้ามเปิด อ่าน หรือคัดลอกไฟล์ใน `workshops/`** (เอกสารอบรมและเฉลยของผู้สอน) — เขียนโค้ดจาก spec ใน `docs/specs/` เท่านั้น
- **ห้ามติดตั้ง package ใหม่** หรือแก้ `package.json` / `package-lock.json`
- **ห้ามอ่าน แสดง หรือ commit ไฟล์ `.env`** และห้ามเขียนค่าลับ (API Key, รหัสผ่าน) ลงโค้ดหรือเอกสาร
- หน้าเว็บ: แสดงข้อความจากผู้ใช้ด้วย `textContent` เท่านั้น — **ห้ามใช้ `innerHTML`** กับข้อมูลที่มาจาก API (กัน XSS)
- Backend: แปลง `req.params.id` ด้วย `Number()` ตรวจข้อมูลทุกช่องที่รับจากผู้ใช้ และตอบ error เป็น `{ "error": "ข้อความภาษาไทย" }` พร้อม status ที่ถูกต้อง (400 ข้อมูลผิด · 404 ไม่พบ) — ห้ามส่ง stack trace
- ห้ามสร้าง RegExp จากข้อความที่ผู้ใช้พิมพ์ (ใช้ `includes` แทน)
- ทุกฟีเจอร์ต้องมี test ของตัวเอง และห้ามแก้หรือลบ test ที่มีอยู่เพื่อให้ผ่าน
- ห้าม refactor / จัด format / เปลี่ยนชื่อสิ่งที่อยู่นอกขอบเขตของ spec — แม้จะ "ดีขึ้น" ก็ตาม

## นิยามของคำว่า "เสร็จ"

- Acceptance Criteria ใน spec ผ่านครบทุกข้อ (รันคำสั่งจริงและเห็นผลตามที่ระบุ)
- `npm run lint` → `lint ผ่าน` และ `npm test` → `fail 0`
- `git diff --name-only main...HEAD` แสดงเฉพาะไฟล์ที่ spec อนุญาต
- PR มี `Closes #<เลข Issue>` และ CI เขียว

## Git

- 1 ฟีเจอร์ = 1 branch ชื่อ `feature/<name>` แตกจาก `main` ล่าสุด
- commit message: `feat(<name>): <สรุปสั้น ๆ> (#<เลข Issue>)`
- ห้าม push เข้า `main` ตรง ๆ — ทุกอย่างผ่าน Pull Request

## Workflows (ขั้นตอนงานซ้ำ)

อยู่ใน `.clinerules/workflows/` — ใน Cline เรียกด้วย `/check-before-pr.md`, `/deploy.md`, `/new-spec.md` · Agent อื่นให้เปิดอ่านแล้วทำตามลำดับขั้น

| Workflow | ใช้เมื่อ |
|---|---|
| `check-before-pr.md` | ก่อนเปิด Pull Request ทุกครั้ง |
| `deploy.md` | นำเวอร์ชันที่ออก Release แล้วขึ้นใช้งานด้วย Docker หรือ PM2 |
| `new-spec.md` | มีงานใหม่ที่ยังไม่มี spec |

## สถานะงานและการตัดสินใจ

- สถานะของแต่ละฟีเจอร์ (ยังไม่ทำ / กำลังทำ / เสร็จ) ดูที่ **GitHub Projects Board** ของทีม — ไม่ได้เก็บในไฟล์
- เหตุผลของการออกแบบอยู่ที่ `docs/memory/decisions.md` — การตัดสินใจใหม่ให้เพิ่มต่อท้ายผ่าน PR
