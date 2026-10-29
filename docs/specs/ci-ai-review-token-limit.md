# Spec CI — จำกัด output tokens ของ AI Review

| | |
|---|---|
| **Issue** | #3 |
| **Branch** | `feature/ci-ai-review-token-limit` |
| **เจ้าของ** | ยังไม่ระบุ |
| **สถานะ spec** | ร่าง |

## 1. บริบท — ต่อยอดจากอะไร และทำไมต้องมี

- GitHub Actions เรียก OpenRouter ผ่าน `scripts/ai-review-nawaporn.js` โดยไม่ส่ง `max_tokens`; โมเดลจึงขอ output ได้ถึง 64,000 tokens และอาจถูกปฏิเสธด้วย HTTP 402 เมื่อเครดิตที่เหลือรองรับไม่พอ
- ต้องจำกัด output token ให้เหมาะกับการสรุป review และปรับค่าได้โดยไม่แก้โค้ดทุกครั้ง
- หากไม่แก้ การ review อาจล้มเหลวแม้เครดิตยังพอสำหรับคำตอบที่สั้นกว่า

## 2. Prerequisites — ต้องพร้อมอะไรก่อนเริ่ม

- [ ] แตก branch `feature/ci-ai-review-token-limit` จาก `main` ล่าสุด และติดตั้ง dependencies เดิมแล้ว
- [ ] `npm test` ผ่านก่อนเริ่มแก้ (ถ้าไม่ผ่าน ให้แจ้งทีม)
- [ ] อ่าน `AGENTS.md` และ `docs/memory/decisions.md` แล้ว
- [ ] ผู้ดูแลอนุมัติการแก้ workflow ใต้ `.github/` ตามข้อกำหนดไฟล์ร่วมใน `AGENTS.md`

## 3. Contract — สิ่งที่คนอื่นจะพึ่งพา

### API

ไม่มี API ของแอปเปลี่ยนแปลง; OpenRouter chat-completions request จะมี `max_tokens` เป็นจำนวนเต็มบวก

### ข้อมูล (ฟิลด์ที่เพิ่ม/อ่าน)

| ค่า | ชนิด | ค่าเริ่มต้นเมื่อไม่มี | ผู้กำหนด |
|---|---|---|---|
| `OPENROUTER_MAX_TOKENS` | จำนวนเต็มบวก | `4096` (ค่าที่เสนอ รออนุมัติ) | GitHub Actions variable / environment ของสคริปต์ |

ค่าดังกล่าวถูกส่งเป็น `max_tokens` ใน body ของ OpenRouter; ค่าไม่ถูกต้องหรือไม่เป็นจำนวนเต็มบวกต้องแจ้งข้อผิดพลาดชัดเจนและหยุดก่อนส่ง request

### หน้าเว็บ

ไม่มี

## 4. ไฟล์ที่ต้องสร้าง / แก้

| ไฟล์ | สร้าง/แก้ | หน้าที่ |
|---|---|---|
| `scripts/ai-review-nawaporn.js` | แก้ | อ่านค่า token limit, ตรวจค่า และแนบ `max_tokens` ใน request |
| `.github/workflows/ai-nawaporn.yml` | แก้ — ต้องให้ผู้ดูแลอนุมัติ | ส่งค่ากำหนด `OPENROUTER_MAX_TOKENS` ให้สคริปต์ โดยมี fallback ที่สอดคล้องกับค่าเริ่มต้น |
| `scripts/ai-review-config.js` | สร้าง | ฟังก์ชันเล็ก ๆ สำหรับอ่าน/ตรวจค่า token limit เพื่อทดสอบได้โดยไม่เรียกเครือข่าย |
| `test/ci-ai-review-token-limit.test.js` | สร้าง | ทดสอบค่าเริ่มต้น, ค่าที่กำหนดเอง และค่าที่ไม่ถูกต้อง |

### จุดที่แก้ในไฟล์เดิม (ก่อน → หลัง)

`scripts/ai-review-nawaporn.js` — body ของคำขอ OpenRouter:

```js
// ก่อน
{ model, temperature, messages }
```

```js
// หลัง (โครง)
{ model, temperature, max_tokens: configuredLimit, messages }
```

`.github/workflows/ai-nawaporn.yml` — environment ของขั้นตอน review: เพิ่ม `OPENROUTER_MAX_TOKENS` จาก Actions variable พร้อม fallback ที่ตกลงแล้ว

## 5. ข้อกำหนดสำคัญ — กฎที่ห้ามพลาด

- ต้องส่ง `max_tokens` ใน request เพื่อไม่ให้ OpenRouter ใช้เพดานสูงตามค่าเริ่มต้นของโมเดล.
- ตรวจ configuration ให้เป็นจำนวนเต็มบวกก่อนเรียก OpenRouter; ห้ามส่ง `NaN`, ศูนย์, ค่าลบ, หรือข้อความดิบเป็นเพดาน.
- ห้ามแสดง API key, GitHub token, headers หรือ secrets ใน log/error.
- คงรูปแบบ review, โมเดล, diff input limit, และการโพสต์คอมเมนต์เดิมไว้เหมือนเดิม.

## 6. ห้ามทำเกินสโคป — นิยามของคำว่า "พอ"

- ห้ามแก้ไฟล์นอกตารางหัวข้อ 4; การแก้ `.github/workflows/ai-nawaporn.yml` ต้องได้รับอนุมัติจากผู้ดูแลก่อน
- ห้ามติดตั้ง package ใหม่ · ห้าม refactor/จัด format ไฟล์อื่น
- ยังไม่ทำในรอบนี้: ลด `MAX_DIFF_CHARS` หรือย่อเนื้อหา prompt/input
- ยังไม่ทำในรอบนี้: เปลี่ยนโมเดล, เพิ่ม retry/fallback, หรือปรับสิทธิ์/วงเงินของ OpenRouter key

## 7. Acceptance Criteria — นิยามของคำว่า "เสร็จ"

1. การตั้งค่าเริ่มต้นและค่าที่กำหนดเองผ่าน test

   ```bash
   node --test test/ci-ai-review-token-limit.test.js
   ```
   ต้องเห็น: test ผ่านทั้งหมด (`fail 0`); ค่าเริ่มต้นเป็นค่าที่อนุมัติ และค่าที่กำหนดเองถูกแปลงเป็นจำนวนเต็ม

2. ค่าที่ไม่ถูกต้องถูกปฏิเสธ

   ```bash
   node --test test/ci-ai-review-token-limit.test.js
   ```
   ต้องเห็น: มี test ยืนยันว่าค่าว่าง/ไม่ใช่จำนวนเต็ม/ศูนย์/ค่าลบทำให้เกิดข้อผิดพลาด และไม่เรียก OpenRouter

3. ตรวจ syntax และ regression tests

   ```bash
   npm run lint
   npm test
   ```
   ต้องเห็น: `lint ผ่าน` และ `fail 0`

4. ตรวจขอบเขตไฟล์

   ```bash
   git diff --name-only main...HEAD
   ```
   ต้องเห็นเฉพาะ `scripts/ai-review-nawaporn.js`, `.github/workflows/ai-nawaporn.yml`, `scripts/ai-review-config.js`, `test/ci-ai-review-token-limit.test.js`

## 8. คำถามที่ยังเปิด

- ค่าเริ่มต้น `4096` token เหมาะสมหรือไม่ หรือผู้ดูแลต้องการค่าอื่น?
- Actions variable ควรใช้ชื่อ `OPENROUTER_MAX_TOKENS` ตามที่เสนอหรือไม่?
- ตัดสินแล้ว: ไม่มี

## 9. Prompt แนะนำ (คัดลอกไปสั่ง Agent ได้ทันที)

```text
อ่าน AGENTS.md และ docs/specs/ci-ai-review-token-limit.md ให้ครบก่อน
ทำตาม spec นี้เท่านั้น: แก้เฉพาะไฟล์ในหัวข้อ 4 และห้ามทำสิ่งในหัวข้อ 6
เสนอแผน (ไฟล์ที่จะแก้ + สิ่งที่จะทำ) ให้ฉันอนุมัติก่อนแก้ไฟล์
ถ้า spec ยังเป็นร่างหรือไม่ชัด ให้หยุดถาม อย่าเริ่มแก้โค้ด
เมื่อ spec ได้รับอนุมัติแล้ว ให้รันคำสั่งใน Acceptance Criteria และรายงานผลจริงทีละข้อ
```