# Spec A — แก้ไขประกาศ

| | |
|---|---|
| **Issue** | #<เลข — ใส่หลังสร้าง Issue> |
| **Branch** | `feature/edit` |
| **เจ้าของ** | @<github-username> |
| **สถานะ spec** | อนุมัติแล้ว (ตัวอย่างจากผู้สอน) |

## 1. บริบท — ต่อยอดจากอะไร และทำไมต้องมี

- ตอนนี้แก้ประกาศที่โพสต์ไปแล้วไม่ได้ ต้องลบแล้วสร้างใหม่ ทำให้ลำดับและเวลาโพสต์เปลี่ยน
- ต่อยอดจาก API หลัก `POST /api/announcements` และใช้กติกาตรวจข้อมูลชุดเดียวกัน (`validateAnnouncement`)
- เป็นฟีเจอร์พื้นฐานที่ผู้ใช้คาดหวังว่าต้องมี

## 2. Prerequisites — ต้องพร้อมอะไรก่อนเริ่ม

- [ ] แตก branch `feature/edit` จาก `main` ล่าสุด และ `npm install` แล้ว
- [ ] `npm test` ผ่านก่อนเริ่มแก้ (ถ้าไม่ผ่านตั้งแต่ต้น ให้แจ้งทีม อย่าแก้เอง)
- [ ] อ่าน `AGENTS.md` แล้ว

## 3. Contract — สิ่งที่คนอื่นจะพึ่งพา

### API
| Method | Path | Request | Response สำเร็จ | Error |
|---|---|---|---|---|
| PATCH | `/api/announcements/:id` | `{ "title"?: string, "body"?: string }` | `200` + ประกาศที่แก้แล้ว | `400` ข้อมูลผิด · `404` ไม่พบ |

### ข้อมูล
| ฟิลด์ | ชนิด | ค่าเริ่มต้นเมื่อไม่มี | เจ้าของ |
|---|---|---|---|
| `title`, `body` | string | ค่าเดิมของประกาศ (ฟิลด์ที่ไม่ส่งมา) | แกนหลัก |

### หน้าเว็บ
- ปุ่ม **แก้ไข** ในแถบปุ่มของทุกการ์ด
- กดแล้วถามหัวข้อใหม่และรายละเอียดใหม่ (ใช้ `prompt()` โดยใส่ค่าเดิมไว้ให้) — กดยกเลิกแล้วไม่เกิดอะไร
- บันทึกสำเร็จ → รายการโหลดใหม่ · ไม่สำเร็จ → แสดงข้อความ error ด้วย `ctx.notify()`

## 4. ไฟล์ที่ต้องสร้าง / แก้

| ไฟล์ | สร้าง/แก้ | หน้าที่ |
|---|---|---|
| `src/features/edit.js` | แก้ (มี stub อยู่แล้ว) | route ของฟีเจอร์ตาม Contract |
| `public/features/edit.js` | แก้ (มี stub อยู่แล้ว) | สิ่งที่ผู้ใช้เห็นบนหน้าเว็บตามหัวข้อ 3 |
| `test/edit.test.js` | สร้างใหม่ | test ตาม Acceptance Criteria (ใช้ `startTestServer` จาก `test/helpers.js`) |

**ไฟล์ร่วม: ไม่ต้องแก้** — ไฟล์ร่วมทั้งหมดตามรายการใน `AGENTS.md` (ช่องของฟีเจอร์นี้ลงทะเบียนไว้แล้วใน `src/features/index.js` และ `public/features/index.js`)

### จุดที่แก้ในไฟล์เดิม: `src/features/edit.js` ฟังก์ชัน `register(router, { store })`

```js
// ก่อน
export function register(router, { store }) {
  // TODO(feature/edit): เพิ่ม route ของฟีเจอร์ที่นี่
}
```

```js
// หลัง (โครง — ให้ AI เขียนรายละเอียดตาม Contract)
export function register(router, { store }) {
  router.patch('/announcements/:id', (req, res) => {
    // หา → รวมค่าที่ส่งมากับค่าเดิม → validateAnnouncement → store.update → ตอบ 200
  });
}
```

## 5. ข้อกำหนดสำคัญ — กฎที่ห้ามพลาด

- ต้องตรวจข้อมูลด้วย `validateAnnouncement` จาก `src/validation.js` — ห้ามเขียนกติกาตรวจใหม่เอง (กติกาต้องเหมือนตอนสร้าง)
- ฟิลด์ที่ไม่ได้ส่งมาต้องคงค่าเดิม (PATCH = แก้บางส่วน)
- แก้ได้เฉพาะ `title` และ `body` — ฟิลด์อื่นที่ส่งมา (เช่น `id`, `pinned`) ต้องไม่ถูกบันทึก
- แสดงข้อความจากผู้ใช้ด้วย `textContent` เท่านั้น ห้าม `innerHTML`
- error ตอบเป็น `{ "error": "ข้อความภาษาไทย" }` และแปลง id ด้วย `Number(req.params.id)`

## 6. ห้ามทำเกินสโคป — นิยามของคำว่า "พอ"

- ห้ามแก้ไฟล์นอกตารางหัวข้อ 4 (รวมถึง README, `package.json`, ไฟล์ของฟีเจอร์อื่น)
- ห้ามติดตั้ง package ใหม่ · ห้าม refactor / จัด format / เปลี่ยนชื่อสิ่งที่มีอยู่
- ห้ามเปลี่ยน response ของ API หลักที่มีอยู่
- ยังไม่ทำในรอบนี้: ประวัติการแก้ไข / ย้อนกลับ (undo)
- ยังไม่ทำในรอบนี้: ฟอร์มแก้ไขแบบ modal สวย ๆ (ใช้ `prompt()` พอ)
- ยังไม่ทำในรอบนี้: การยืนยันตัวตน / สิทธิ์ว่าใครแก้ได้

## 7. Acceptance Criteria — นิยามของคำว่า "เสร็จ"

รัน `npm run dev` ไว้ในอีก Terminal **(เริ่มใหม่ก่อนตรวจ เพื่อให้ข้อมูลกลับเป็นตัวอย่าง 2 รายการ)** แล้วรันทีละข้อตามลำดับ
— ใน PowerShell ใช้ `curl.exe` หรือรันใน Git Bash

1. แก้หัวข้อได้

   ```bash
   curl -s -X PATCH localhost:3000/api/announcements/1 -H "content-type: application/json" -d '{"title":"Updated title"}'
   ```
   ต้องเห็น: `"title":"Updated title"`

2. ฟิลด์ที่ไม่ได้ส่ง (body) ยังเป็นค่าเดิม

   ```bash
   curl -s localhost:3000/api/announcements/1
   ```
   ต้องเห็น: `"body":"แอปนี้ใช้ฝึก Git`

3. ส่งฟิลด์อื่นมาด้วยต้องไม่ถูกบันทึก

   ```bash
   curl -s -X PATCH localhost:3000/api/announcements/1 -H "content-type: application/json" -d '{"title":"Again","pinned":true}' | grep -c pinned
   ```
   ต้องเห็น: `0`

4. หัวข้อว่าง → 400

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" -X PATCH localhost:3000/api/announcements/1 -H "content-type: application/json" -d '{"title":"   "}'
   ```
   ต้องเห็น: `400`

5. ไม่พบประกาศ → 404

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" -X PATCH localhost:3000/api/announcements/9999 -H "content-type: application/json" -d '{"title":"x"}'
   ```
   ต้องเห็น: `404`

6. test ของฟีเจอร์ผ่าน (อย่างน้อย 3 test: แก้ได้ · 400 · 404)

   ```bash
   node --test test/edit.test.js
   ```
   ต้องเห็น: `fail 0`

7. ตรวจบนหน้าเว็บ (ดูด้วยตา): เปิด http://localhost:3000 → กด **แก้ไข** ที่การ์ดใดก็ได้ → เปลี่ยนหัวข้อ → การ์ดแสดงหัวข้อใหม่ทันที

8. ตรวจคุณภาพและขอบเขต

   ```bash
   npm run lint
   npm test
   git diff --name-only main...HEAD
   ```
   ต้องเห็น: `lint ผ่าน` · `fail 0` · รายชื่อไฟล์มีเฉพาะ `src/features/edit.js` `public/features/edit.js` `test/edit.test.js`

## 8. คำถามที่ยังเปิด

- ถ้าเจอกรณีที่ spec ไม่ครอบคลุม → **หยุดและถามมนุษย์** แล้วบันทึกคำตอบที่นี่

**ตัดสินแล้ว**
- ถ้าส่ง body มาอย่างเดียว ต้องตรวจ title ด้วยไหม? → ตรวจ (ใช้ title เดิมมาตรวจรวมกัน)

## 9. Prompt แนะนำ (คัดลอกไปสั่ง Agent ได้ทันที)

```text
อ่าน AGENTS.md และ docs/specs/A-edit.md ให้ครบก่อน
ทำตาม spec นี้เท่านั้น: แก้เฉพาะไฟล์ในหัวข้อ 4 และห้ามทำสิ่งในหัวข้อ 6
เสนอแผน (ไฟล์ที่จะแก้ + สิ่งที่จะทำ) ให้ฉันอนุมัติก่อนแก้ไฟล์
ถ้า spec ไม่ชัดหรือขัดกัน ให้หยุดถาม อย่าเดา
เสร็จแล้วรันคำสั่งใน Acceptance Criteria ทุกข้อ แล้วรายงานผลที่เห็นจริงทีละข้อ
```
