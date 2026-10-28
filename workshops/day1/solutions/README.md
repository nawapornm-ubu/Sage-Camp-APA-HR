# เฉลยฟีเจอร์ Day 1 (สำหรับผู้สอน/TA เท่านั้น)

> ⚠️ **โฟลเดอร์นี้มากับ repo ทีม (ผ่าน Template) — ให้ผู้เรียนทำเองก่อน** ผู้สอน/TA เดินดูและใช้เฉลยช่วยทีมที่ติดเกิน 10 นาที

แต่ละโฟลเดอร์มีโครงสร้างเหมือนราก practice-app — วางทับแล้วใช้ได้ทันที:

```bash
cp -r workshops/day1/solutions/pin/. <repo-ทีม>/     # วางเฉลยฟีเจอร์ C ทับ stub
```

| โฟลเดอร์ | ไฟล์ที่มี | จำนวน test |
|---|---|---|
| `edit/` | `src/features/edit.js` · `public/features/edit.js` · `test/edit.test.js` | 3 |
| `search/` | `src/features/search.js` · `public/features/search.js` · `test/search.test.js` | 3 |
| `pin/` | `src/features/pin.js` · `public/features/pin.js` · `test/pin.test.js` | 2 |
| `category/` | `src/features/category.js` · `public/features/category.js` · `test/category.test.js` | 3 |
| `stats/` | `src/features/stats.js` · `public/features/stats.js` · `test/stats.test.js` | 2 |
| `ack/` | `src/features/ack.js` · `public/features/ack.js` · `test/ack.test.js` | 2 |
| `export/` | `src/features/export.js` · `public/features/export.js` · `test/export.test.js` | 3 |
| `theme/` | `public/features/theme.js` · `test/theme.test.js` | 1 |

ตรวจแล้ว (21 ต.ค. 2569): วางเฉลยทีละฟีเจอร์ → `lint` + `test` ผ่านทุกตัว และวางครบ 8 ฟีเจอร์พร้อมกัน → 25 tests ผ่าน (ตรวจซ้ำ 26 ต.ค. หลังจำกัด `npm test` ให้รันเฉพาะ `test/*.test.js` — เฉลยในโฟลเดอร์นี้จึงไม่ถูกรันปนเมื่ออยู่ใน repo ทีม) หน้าเว็บทำงานครบ ไม่มี error ใน console และคำสั่ง Acceptance Criteria ทั้ง 34 ข้อใน `practice-app/docs/specs/` ผ่านกับเฉลย (เปิด server ใหม่ต่อ spec)

## ใช้ช่วยทีมที่ติดอย่างไร

1. ให้ทีมเปิด Diff ของตัวเองเทียบกับเฉลยใน VS Code (คลิกขวา → *Select for Compare* → *Compare with Selected*) — ดีกว่าคัดลอกทั้งไฟล์
2. ถ้าเหลือเวลาน้อยกว่า 10 นาทีก่อน WS4.1 ให้คัดลอกเฉพาะไฟล์ test มาก่อน แล้วให้ AI แก้โค้ดจนผ่าน test (ฝึก "ให้ test นำทาง")
3. บันทึกจุดที่ติดลงแบบบันทึกการซ้อม เพื่อปรับการ์ดก่อนวันจริง
