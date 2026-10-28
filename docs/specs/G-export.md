# Spec G — ส่งออก CSV

| | |
|---|---|
| **Issue** | #<เลข — ใส่หลังสร้าง Issue> |
| **Branch** | `feature/export` |
| **เจ้าของ** | @<github-username> |
| **สถานะ spec** | อนุมัติแล้ว (ตัวอย่างจากผู้สอน) |

## 1. บริบท — ต่อยอดจากอะไร และทำไมต้องมี

- เจ้าหน้าที่ธุรการต้องทำรายงานประกาศใน Excel ทุกเดือน
- ต่อยอดจากรายการประกาศ (อ่านอย่างเดียว)
- ไฟล์ต้องเปิดใน Excel แล้วภาษาไทยไม่เพี้ยน

## 2. Prerequisites — ต้องพร้อมอะไรก่อนเริ่ม

- [ ] แตก branch `feature/export` จาก `main` ล่าสุด และ `npm install` แล้ว
- [ ] `npm test` ผ่านก่อนเริ่มแก้ (ถ้าไม่ผ่านตั้งแต่ต้น ให้แจ้งทีม อย่าแก้เอง)
- [ ] อ่าน `AGENTS.md` แล้ว

## 3. Contract — สิ่งที่คนอื่นจะพึ่งพา

### API
| Method | Path | Request | Response สำเร็จ | Error |
|---|---|---|---|---|
| GET | `/api/export.csv` | — | `200` ไฟล์ CSV คอลัมน์ `id,title,body,createdAt` (ใหม่สุดก่อน) | — |

### ข้อมูล
| ฟิลด์ | ชนิด | ค่าเริ่มต้นเมื่อไม่มี | เจ้าของ |
|---|---|---|---|
| — | — | — | ไม่เพิ่มฟิลด์ |

### หน้าเว็บ
- ลิงก์ `⬇️ ดาวน์โหลด CSV` ใน `ctx.toolbar` กดแล้วเบราว์เซอร์ดาวน์โหลดไฟล์ `announcements.csv`

## 4. ไฟล์ที่ต้องสร้าง / แก้

| ไฟล์ | สร้าง/แก้ | หน้าที่ |
|---|---|---|
| `src/features/export.js` | แก้ (มี stub อยู่แล้ว) | route ของฟีเจอร์ตาม Contract |
| `public/features/export.js` | แก้ (มี stub อยู่แล้ว) | สิ่งที่ผู้ใช้เห็นบนหน้าเว็บตามหัวข้อ 3 |
| `test/export.test.js` | สร้างใหม่ | test ตาม Acceptance Criteria (ใช้ `startTestServer` จาก `test/helpers.js`) |

**ไฟล์ร่วม: ไม่ต้องแก้** — ไฟล์ร่วมทั้งหมดตามรายการใน `AGENTS.md` (ช่องของฟีเจอร์นี้ลงทะเบียนไว้แล้วใน `src/features/index.js` และ `public/features/index.js`)

### จุดที่แก้ในไฟล์เดิม: `src/features/export.js` ฟังก์ชัน `register(router, { store })`

```js
// ก่อน
export function register(router, { store }) {
  // TODO(feature/export): เพิ่ม route ของฟีเจอร์ที่นี่
}
```

```js
// หลัง (โครง — ให้ AI เขียนรายละเอียดตาม Contract)
export function register(router, { store }) {
  router.get('/export.csv', (req, res) => {
    // สร้างบรรทัดหัวตาราง + 1 บรรทัดต่อประกาศ → ตั้ง header → ส่ง BOM + ข้อความ
  });
}
```

## 5. ข้อกำหนดสำคัญ — กฎที่ห้ามพลาด

- Header: `Content-Type: text/csv; charset=utf-8` และ `Content-Disposition: attachment; filename="announcements.csv"`
- ทุกช่องครอบด้วย `"..."` และเปลี่ยน `"` ในข้อความเป็น `""` (รองรับ `,` และขึ้นบรรทัดใหม่)
- **กัน CSV/Formula injection:** ข้อความที่ขึ้นต้นด้วย `=` `+` `-` `@` ต้องใส่ `'` นำหน้า ไม่อย่างนั้น Excel จะรันเป็นสูตร
- ขึ้นต้นไฟล์ด้วย BOM (`\uFEFF`) และขึ้นบรรทัดด้วย `\r\n` เพื่อให้ Excel อ่านภาษาไทยถูก
- แสดงข้อความจากผู้ใช้ด้วย `textContent` เท่านั้น ห้าม `innerHTML`

## 6. ห้ามทำเกินสโคป — นิยามของคำว่า "พอ"

- ห้ามแก้ไฟล์นอกตารางหัวข้อ 4 (รวมถึง README, `package.json`, ไฟล์ของฟีเจอร์อื่น)
- ห้ามติดตั้ง package ใหม่ · ห้าม refactor / จัด format / เปลี่ยนชื่อสิ่งที่มีอยู่
- ห้ามเปลี่ยน response ของ API หลักที่มีอยู่
- ยังไม่ทำในรอบนี้: ไฟล์ .xlsx
- ยังไม่ทำในรอบนี้: เลือกช่วงวันที่ / ตัวกรองก่อนส่งออก
- ยังไม่ทำในรอบนี้: ส่งออกฟิลด์ของฟีเจอร์อื่น (pinned, category, acks)

## 7. Acceptance Criteria — นิยามของคำว่า "เสร็จ"

รัน `npm run dev` ไว้ในอีก Terminal **(เริ่มใหม่ก่อนตรวจ เพื่อให้ข้อมูลกลับเป็นตัวอย่าง 2 รายการ)** แล้วรันทีละข้อตามลำดับ
— ใน PowerShell ใช้ `curl.exe` หรือรันใน Git Bash

1. Header ถูกต้อง

   ```bash
   curl -s -D - -o /dev/null localhost:3000/api/export.csv | grep -i -E 'content-(type|disposition)'
   ```
   ต้องเห็น: `text/csv; charset=utf-8`

2. เป็นไฟล์แนบชื่อ announcements.csv

   ```bash
   curl -s -D - -o /dev/null localhost:3000/api/export.csv | grep -i disposition
   ```
   ต้องเห็น: `attachment; filename="announcements.csv"`

3. บรรทัดแรกเป็นหัวตาราง

   ```bash
   curl -s localhost:3000/api/export.csv | head -n 1
   ```
   ต้องเห็น: `id,title,body,createdAt`

4. กัน Formula injection

   ```bash
   curl -s -X POST localhost:3000/api/announcements -H "content-type: application/json" -d '{"title":"=1+1"}' > /dev/null && curl -s localhost:3000/api/export.csv | grep -c "'=1+1"
   ```
   ต้องเห็น: `1`

5. test ของฟีเจอร์ผ่าน (รวมกรณี `,` `"` และ `=`)

   ```bash
   node --test test/export.test.js
   ```
   ต้องเห็น: `fail 0`

6. ตรวจบนหน้าเว็บ (ดูด้วยตา): กดลิงก์ดาวน์โหลด → เปิดไฟล์ใน Excel → ภาษาไทยอ่านได้ และประกาศ `=1+1` แสดงเป็นข้อความ ไม่ใช่เลข 2

7. ตรวจคุณภาพและขอบเขต

   ```bash
   npm run lint
   npm test
   git diff --name-only main...HEAD
   ```
   ต้องเห็น: `lint ผ่าน` · `fail 0` · รายชื่อไฟล์มีเฉพาะ `src/features/export.js` `public/features/export.js` `test/export.test.js`

## 8. คำถามที่ยังเปิด

- ถ้าเจอกรณีที่ spec ไม่ครอบคลุม → **หยุดและถามมนุษย์** แล้วบันทึกคำตอบที่นี่

**ตัดสินแล้ว**
- ต้องส่งออกฟิลด์ pinned/category ไหม? → ไม่ในรอบนี้ (เป็นฟิลด์ของฟีเจอร์อื่น อาจยังไม่ merge)

## 9. Prompt แนะนำ (คัดลอกไปสั่ง Agent ได้ทันที)

```text
อ่าน AGENTS.md และ docs/specs/G-export.md ให้ครบก่อน
ทำตาม spec นี้เท่านั้น: แก้เฉพาะไฟล์ในหัวข้อ 4 และห้ามทำสิ่งในหัวข้อ 6
เสนอแผน (ไฟล์ที่จะแก้ + สิ่งที่จะทำ) ให้ฉันอนุมัติก่อนแก้ไฟล์
ถ้า spec ไม่ชัดหรือขัดกัน ให้หยุดถาม อย่าเดา
เสร็จแล้วรันคำสั่งใน Acceptance Criteria ทุกข้อ แล้วรายงานผลที่เห็นจริงทีละข้อ
```
