# Spec D — หมวดหมู่ประกาศ

| | |
|---|---|
| **Issue** | #<เลข — ใส่หลังสร้าง Issue> |
| **Branch** | `feature/category` |
| **เจ้าของ** | @<github-username> |
| **สถานะ spec** | อนุมัติแล้ว (ตัวอย่างจากผู้สอน) |

## 1. บริบท — ต่อยอดจากอะไร และทำไมต้องมี

- ผู้อ่านอยากเห็นเฉพาะประกาศด่วน หรือเฉพาะกิจกรรม
- ต่อยอดจากรายการประกาศ โดยเพิ่มฟิลด์ `category` ผ่าน `store.update`
- หมวดหมู่เป็นรายการคงที่ 3 ค่า เพื่อให้กรองได้แน่นอน

## 2. Prerequisites — ต้องพร้อมอะไรก่อนเริ่ม

- [ ] แตก branch `feature/category` จาก `main` ล่าสุด และ `npm install` แล้ว
- [ ] `npm test` ผ่านก่อนเริ่มแก้ (ถ้าไม่ผ่านตั้งแต่ต้น ให้แจ้งทีม อย่าแก้เอง)
- [ ] อ่าน `AGENTS.md` แล้ว
- [ ] ใช้ชื่อฟิลด์ `category` (string) ตาม `docs/memory/decisions.md` D-004

## 3. Contract — สิ่งที่คนอื่นจะพึ่งพา

### API
| Method | Path | Request | Response สำเร็จ | Error |
|---|---|---|---|---|
| GET | `/api/categories` | — | `200` + `["ทั่วไป","ด่วน","กิจกรรม"]` | — |
| PUT | `/api/announcements/:id/category` | `{ "category": "ด่วน" }` | `200` + ประกาศที่อัปเดต | `400` หมวดหมู่ไม่อยู่ในรายการ · `404` ไม่พบ |

### ข้อมูล
| ฟิลด์ | ชนิด | ค่าเริ่มต้นเมื่อไม่มี | เจ้าของ |
|---|---|---|---|
| `category` | string (หนึ่งใน 3 ค่า) | `"ทั่วไป"` | ฟีเจอร์ category |

### หน้าเว็บ
- ป้ายหมวดหมู่ (class `badge`) หน้าหัวข้อของทุกการ์ด — ไม่มีหมวด = "ทั่วไป"
- ตัวเลือก (select) ในแถบปุ่มของการ์ดสำหรับเปลี่ยนหมวดหมู่ เลือกแล้วบันทึกทันที
- ตัวกรอง "ทุกหมวดหมู่ / ทั่วไป / ด่วน / กิจกรรม" ใน `ctx.toolbar`
- รายการหมวดหมู่ในหน้าเว็บต้องโหลดจาก `GET /api/categories` (ห้ามเขียนซ้ำในหน้าเว็บ)

## 4. ไฟล์ที่ต้องสร้าง / แก้

| ไฟล์ | สร้าง/แก้ | หน้าที่ |
|---|---|---|
| `src/features/category.js` | แก้ (มี stub อยู่แล้ว) | route ของฟีเจอร์ตาม Contract |
| `public/features/category.js` | แก้ (มี stub อยู่แล้ว) | สิ่งที่ผู้ใช้เห็นบนหน้าเว็บตามหัวข้อ 3 |
| `test/category.test.js` | สร้างใหม่ | test ตาม Acceptance Criteria (ใช้ `startTestServer` จาก `test/helpers.js`) |

**ไฟล์ร่วม: ไม่ต้องแก้** — ไฟล์ร่วมทั้งหมดตามรายการใน `AGENTS.md` (ช่องของฟีเจอร์นี้ลงทะเบียนไว้แล้วใน `src/features/index.js` และ `public/features/index.js`)

### จุดที่แก้ในไฟล์เดิม: `src/features/category.js` ฟังก์ชัน `register(router, { store })`

```js
// ก่อน
export function register(router, { store }) {
  // TODO(feature/category): เพิ่ม route ของฟีเจอร์ที่นี่
}
```

```js
// หลัง (โครง — ให้ AI เขียนรายละเอียดตาม Contract)
export function register(router, { store }) {
  router.get('/categories', ...);
  router.put('/announcements/:id/category', (req, res) => {
    // หา → 404 · ตรวจว่าอยู่ใน CATEGORIES → 400 · store.update(id, { category })
  });
}
```

## 5. ข้อกำหนดสำคัญ — กฎที่ห้ามพลาด

- ตรวจค่า `category` กับรายการที่อนุญาต (whitelist) เท่านั้น — ค่าอื่นทั้งหมดตอบ 400
- เก็บรายการหมวดหมู่ไว้ที่เดียว (`CATEGORIES` ใน `src/features/category.js`)
- `init(ctx)` เป็น `async` ได้ (ต้องโหลดหมวดหมู่ก่อนสร้าง select)
- แสดงข้อความจากผู้ใช้ด้วย `textContent` เท่านั้น ห้าม `innerHTML`
- error ตอบเป็น `{ "error": "ข้อความภาษาไทย" }` และแปลง id ด้วย `Number(req.params.id)`

## 6. ห้ามทำเกินสโคป — นิยามของคำว่า "พอ"

- ห้ามแก้ไฟล์นอกตารางหัวข้อ 4 (รวมถึง README, `package.json`, ไฟล์ของฟีเจอร์อื่น)
- ห้ามติดตั้ง package ใหม่ · ห้าม refactor / จัด format / เปลี่ยนชื่อสิ่งที่มีอยู่
- ห้ามเปลี่ยน response ของ API หลักที่มีอยู่
- ยังไม่ทำในรอบนี้: เพิ่ม/แก้/ลบหมวดหมู่ผ่าน API
- ยังไม่ทำในรอบนี้: เลือกหมวดหมู่ในฟอร์มสร้างประกาศ (ฟอร์มเป็นไฟล์ร่วม)
- ยังไม่ทำในรอบนี้: หลายหมวดหมู่ต่อประกาศ

## 7. Acceptance Criteria — นิยามของคำว่า "เสร็จ"

รัน `npm run dev` ไว้ในอีก Terminal **(เริ่มใหม่ก่อนตรวจ เพื่อให้ข้อมูลกลับเป็นตัวอย่าง 2 รายการ)** แล้วรันทีละข้อตามลำดับ
— ใน PowerShell ใช้ `curl.exe` หรือรันใน Git Bash

1. ได้รายการหมวดหมู่

   ```bash
   curl -s localhost:3000/api/categories
   ```
   ต้องเห็น: `["ทั่วไป","ด่วน","กิจกรรม"]`

2. ตั้งหมวดหมู่ได้ (\u0e14\u0e48\u0e27\u0e19 = "ด่วน" เขียนแบบ escape เพื่อให้ส่งภาษาไทยผ่าน Terminal ได้ทุกเครื่อง)

   ```bash
   curl -s -X PUT localhost:3000/api/announcements/1/category -H "content-type: application/json" -d '{"category":"\u0e14\u0e48\u0e27\u0e19"}'
   ```
   ต้องเห็น: `"category":"ด่วน"`

3. หมวดหมู่ที่ไม่อยู่ในรายการ → 400

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" -X PUT localhost:3000/api/announcements/1/category -H "content-type: application/json" -d '{"category":"other"}'
   ```
   ต้องเห็น: `400`

4. ไม่พบประกาศ → 404

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" -X PUT localhost:3000/api/announcements/9999/category -H "content-type: application/json" -d '{"category":"other"}'
   ```
   ต้องเห็น: `404`

5. test ของฟีเจอร์ผ่าน

   ```bash
   node --test test/category.test.js
   ```
   ต้องเห็น: `fail 0`

6. ตรวจบนหน้าเว็บ (ดูด้วยตา): เปลี่ยนการ์ดหนึ่งเป็น "ด่วน" → ป้ายเปลี่ยน · เลือกตัวกรอง "ด่วน" → เหลือเฉพาะการ์ดนั้น

7. ตรวจคุณภาพและขอบเขต

   ```bash
   npm run lint
   npm test
   git diff --name-only main...HEAD
   ```
   ต้องเห็น: `lint ผ่าน` · `fail 0` · รายชื่อไฟล์มีเฉพาะ `src/features/category.js` `public/features/category.js` `test/category.test.js`

## 8. คำถามที่ยังเปิด

- ถ้าเจอกรณีที่ spec ไม่ครอบคลุม → **หยุดและถามมนุษย์** แล้วบันทึกคำตอบที่นี่

**ตัดสินแล้ว**
- ประกาศเก่าที่ไม่มีหมวด ต้อง migrate ข้อมูลไหม? → ไม่ต้อง ถือเป็น "ทั่วไป" ตอนแสดงและตอนกรอง
- ไม่พบประกาศและหมวดหมู่ผิดพร้อมกัน ตอบอะไร? → 404 (ตรวจว่ามีประกาศก่อน)

## 9. Prompt แนะนำ (คัดลอกไปสั่ง Agent ได้ทันที)

```text
อ่าน AGENTS.md และ docs/specs/D-category.md ให้ครบก่อน
ทำตาม spec นี้เท่านั้น: แก้เฉพาะไฟล์ในหัวข้อ 4 และห้ามทำสิ่งในหัวข้อ 6
เสนอแผน (ไฟล์ที่จะแก้ + สิ่งที่จะทำ) ให้ฉันอนุมัติก่อนแก้ไฟล์
ถ้า spec ไม่ชัดหรือขัดกัน ให้หยุดถาม อย่าเดา
เสร็จแล้วรันคำสั่งใน Acceptance Criteria ทุกข้อ แล้วรายงานผลที่เห็นจริงทีละข้อ
```
