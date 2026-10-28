# Spec E — สรุปสถิติ

| | |
|---|---|
| **Issue** | #<เลข — ใส่หลังสร้าง Issue> |
| **Branch** | `feature/stats` |
| **เจ้าของ** | @<github-username> |
| **สถานะ spec** | อนุมัติแล้ว (ตัวอย่างจากผู้สอน) |

## 1. บริบท — ต่อยอดจากอะไร และทำไมต้องมี

- หัวหน้างานอยากรู้ภาพรวมของบอร์ดโดยไม่ต้องนับเอง
- อ่านอย่างเดียว ต่อยอดจากรายการประกาศและฟิลด์ของฟีเจอร์ pin (C) และ ack (F)
- เป็นตัวอย่างการทำงานคู่ขนาน: ทำได้ทันทีโดยไม่ต้องรอ C และ F merge เพราะตกลงชื่อฟิลด์ไว้แล้ว

## 2. Prerequisites — ต้องพร้อมอะไรก่อนเริ่ม

- [ ] แตก branch `feature/stats` จาก `main` ล่าสุด และ `npm install` แล้ว
- [ ] `npm test` ผ่านก่อนเริ่มแก้ (ถ้าไม่ผ่านตั้งแต่ต้น ให้แจ้งทีม อย่าแก้เอง)
- [ ] อ่าน `AGENTS.md` แล้ว
- [ ] อ่านฟิลด์ `pinned` (boolean) และ `acks` (number) ตาม `docs/memory/decisions.md` D-004 — ถ้าไม่มีฟิลด์ให้นับเป็น 0

## 3. Contract — สิ่งที่คนอื่นจะพึ่งพา

### API
| Method | Path | Request | Response สำเร็จ | Error |
|---|---|---|---|---|
| GET | `/api/stats` | — | `200` + `{ "total", "pinned", "totalAcks", "latestTitle" }` | — |

### ข้อมูล
| ฟิลด์ | ชนิด | ค่าเริ่มต้นเมื่อไม่มี | เจ้าของ |
|---|---|---|---|
| `pinned` | boolean | `false` | ฟีเจอร์ pin (E อ่านอย่างเดียว) |
| `acks` | number | `0` | ฟีเจอร์ ack (E อ่านอย่างเดียว) |

### หน้าเว็บ
- กล่องสรุป (class `box`) ใน `ctx.panel` เช่น `📊 ประกาศทั้งหมด 3 · ปักหมุด 1 · รับทราบรวม 5 · ล่าสุด: ...`
- อัปเดตทุกครั้งที่รายการโหลดใหม่ (ใช้ `ctx.onReload`)

## 4. ไฟล์ที่ต้องสร้าง / แก้

| ไฟล์ | สร้าง/แก้ | หน้าที่ |
|---|---|---|
| `src/features/stats.js` | แก้ (มี stub อยู่แล้ว) | route ของฟีเจอร์ตาม Contract |
| `public/features/stats.js` | แก้ (มี stub อยู่แล้ว) | สิ่งที่ผู้ใช้เห็นบนหน้าเว็บตามหัวข้อ 3 |
| `test/stats.test.js` | สร้างใหม่ | test ตาม Acceptance Criteria (ใช้ `startTestServer` จาก `test/helpers.js`) |

**ไฟล์ร่วม: ไม่ต้องแก้** — ไฟล์ร่วมทั้งหมดตามรายการใน `AGENTS.md` (ช่องของฟีเจอร์นี้ลงทะเบียนไว้แล้วใน `src/features/index.js` และ `public/features/index.js`)

### จุดที่แก้ในไฟล์เดิม: `src/features/stats.js` ฟังก์ชัน `register(router, { store })`

```js
// ก่อน
export function register(router, { store }) {
  // TODO(feature/stats): เพิ่ม route ของฟีเจอร์ที่นี่
}
```

```js
// หลัง (โครง — ให้ AI เขียนรายละเอียดตาม Contract)
export function register(router, { store }) {
  router.get('/stats', (req, res) => {
    // นับจาก store.list() → { total, pinned, totalAcks, latestTitle }
  });
}
```

## 5. ข้อกำหนดสำคัญ — กฎที่ห้ามพลาด

- อ่านอย่างเดียว — ห้ามเขียนข้อมูล
- `latestTitle` = หัวข้อของประกาศใหม่สุด (`store.list()[0]`) หรือ `null` ถ้าไม่มีประกาศ
- ห้าม import โค้ดจากไฟล์ของฟีเจอร์อื่น — อ่านจากฟิลด์ในข้อมูลเท่านั้น
- แสดงข้อความจากผู้ใช้ด้วย `textContent` เท่านั้น ห้าม `innerHTML`

## 6. ห้ามทำเกินสโคป — นิยามของคำว่า "พอ"

- ห้ามแก้ไฟล์นอกตารางหัวข้อ 4 (รวมถึง README, `package.json`, ไฟล์ของฟีเจอร์อื่น)
- ห้ามติดตั้ง package ใหม่ · ห้าม refactor / จัด format / เปลี่ยนชื่อสิ่งที่มีอยู่
- ห้ามเปลี่ยน response ของ API หลักที่มีอยู่
- ยังไม่ทำในรอบนี้: กราฟ / แผนภูมิ
- ยังไม่ทำในรอบนี้: สถิติย้อนหลังรายวัน
- ยังไม่ทำในรอบนี้: นับแยกตามหมวดหมู่

## 7. Acceptance Criteria — นิยามของคำว่า "เสร็จ"

รัน `npm run dev` ไว้ในอีก Terminal **(เริ่มใหม่ก่อนตรวจ เพื่อให้ข้อมูลกลับเป็นตัวอย่าง 2 รายการ)** แล้วรันทีละข้อตามลำดับ
— ใน PowerShell ใช้ `curl.exe` หรือรันใน Git Bash

1. เซิร์ฟเวอร์เพิ่งเริ่ม: นับได้ 2 รายการ และยังไม่มีปักหมุด/รับทราบ

   ```bash
   curl -s localhost:3000/api/stats
   ```
   ต้องเห็น: `"total":2,"pinned":0,"totalAcks":0`

2. เพิ่มประกาศใหม่แล้ว total และ latestTitle เปลี่ยน

   ```bash
   curl -s -X POST localhost:3000/api/announcements -H "content-type: application/json" -d '{"title":"Stats check"}' > /dev/null && curl -s localhost:3000/api/stats
   ```
   ต้องเห็น: `"total":3,"pinned":0,"totalAcks":0,"latestTitle":"Stats check"`

3. test ของฟีเจอร์ผ่าน (รวม test ที่ตั้ง pinned/acks ผ่าน srv.store.update)

   ```bash
   node --test test/stats.test.js
   ```
   ต้องเห็น: `fail 0`

4. ตรวจบนหน้าเว็บ (ดูด้วยตา): เปิดหน้าเว็บเห็นกล่อง 📊 · เพิ่มประกาศ → ตัวเลขเพิ่มทันที

5. ตรวจคุณภาพและขอบเขต

   ```bash
   npm run lint
   npm test
   git diff --name-only main...HEAD
   ```
   ต้องเห็น: `lint ผ่าน` · `fail 0` · รายชื่อไฟล์มีเฉพาะ `src/features/stats.js` `public/features/stats.js` `test/stats.test.js`

## 8. คำถามที่ยังเปิด

- ถ้าเจอกรณีที่ spec ไม่ครอบคลุม → **หยุดและถามมนุษย์** แล้วบันทึกคำตอบที่นี่

**ตัดสินแล้ว**
- ถ้า C/F ยังไม่ merge จะทดสอบ pinned/acks อย่างไร? → ใน test ตั้งค่าเองด้วย `srv.store.update(1, { pinned: true, acks: 3 })`

## 9. Prompt แนะนำ (คัดลอกไปสั่ง Agent ได้ทันที)

```text
อ่าน AGENTS.md และ docs/specs/E-stats.md ให้ครบก่อน
ทำตาม spec นี้เท่านั้น: แก้เฉพาะไฟล์ในหัวข้อ 4 และห้ามทำสิ่งในหัวข้อ 6
เสนอแผน (ไฟล์ที่จะแก้ + สิ่งที่จะทำ) ให้ฉันอนุมัติก่อนแก้ไฟล์
ถ้า spec ไม่ชัดหรือขัดกัน ให้หยุดถาม อย่าเดา
เสร็จแล้วรันคำสั่งใน Acceptance Criteria ทุกข้อ แล้วรายงานผลที่เห็นจริงทีละข้อ
```
