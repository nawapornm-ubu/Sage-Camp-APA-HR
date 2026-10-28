# [G3-C] FAQ (คำถามที่พบบ่อย) — services-faq

| | |
|---|---|
| **กลุ่ม / โมดูล** | กลุ่ม 3 Services & Contact · โมดูล C |
| **การ์ด** | `services-faq` — ใช้เป็นชื่อ branch · spec · handoff |
| **branch** | `feature/services-faq` (แตกจาก `feature/services`) → PR เข้า `feature/services` |
| **spec / handoff** | `docs/specs/services-faq.md` · `docs/handoff/services-faq.md` |
| **migration** | `152` (จองไว้ให้โมดูลนี้) · API `/api/services/faq` |
| **ไฟล์ของโมดูลนี้** | services/faq.js · dashboard/faq · sections/FaqSection.jsx |
| **Labels** | `type: feature` · `group: 3-services` |

## Loop ของการ์ดนี้

1. **Board:** Assign ตัวเอง → ย้ายเป็น **In Progress**
2. **Branch:** `git switch feature/services && git pull` → `git switch -c feature/services-faq`
3. **Design:** Kilo → `designer` → `/design.md` → spec สถานะ Draft + handoff รอบ 1 → คอมเมนต์ path ของ spec ในการ์ดนี้
4. **Design Gate:** ผู้สอนตรวจ → spec เป็น Approved
5. **Build:** `builder` → `/build.md` (DB+API → หน้าจอ → เทสต์) · commit เล็ก ๆ เช่น `feat(faq): add table and API (#<เลขการ์ดนี้>)`
6. **PR:** `feature/services-faq` → `feature/services` ใส่ `Part of #<เลขการ์ดนี้>` ในคำอธิบาย → ย้ายการ์ดเป็น **In Review**
7. **Review:** เพื่อนในกลุ่ม → กลุ่มคู่ → `reviewer` `/review.md` · แก้ 🔴 ให้หมด → merge เข้า branch กลุ่ม
8. **Done:** การ์ดปิดเองเมื่อ PR ของกลุ่ม (มี `Closes #<เลขการ์ดนี้>`) merge เข้า `main`

## เสร็จเมื่อ (Core Done — docs/features.md §5)

- [ ] เพิ่ม / แก้ / ลบ / ซ่อน / จัดลำดับ ได้จากหน้า Dashboard และเห็นผลบนหน้า Public
- [ ] ข้อมูลอยู่ใน Postgres และยังอยู่หลัง restart API · `npm run db:setup` รันซ้ำได้
- [ ] ตรวจเจ้าของ (`user_id` ใน WHERE) · validate ด้วย zod · parameterized query
- [ ] มี `apps/api/test/<โมดูล>.test.js` · `npm test` + `npm run build:web` ผ่าน
- [ ] PR ผ่านรีวิว 2 ชั้น + CI เขียว · handoff บันทึกผลรีวิวแล้ว
