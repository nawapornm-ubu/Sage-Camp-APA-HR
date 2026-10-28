# [G4-A] Talks & Services (บริการวิชาการ/วิทยากร) — community-talks

| | |
|---|---|
| **กลุ่ม / โมดูล** | กลุ่ม 4 Activities & Community · โมดูล A |
| **การ์ด** | `community-talks` — ใช้เป็นชื่อ branch · spec · handoff |
| **branch** | `feature/community-talks` (แตกจาก `feature/community`) → PR เข้า `feature/community` |
| **spec / handoff** | `docs/specs/community-talks.md` · `docs/handoff/community-talks.md` |
| **migration** | `170` (จองไว้ให้โมดูลนี้) · API `/api/community/talks` |
| **ไฟล์ของโมดูลนี้** | community/talks.js · dashboard/talks · sections/TalkSection.jsx |
| **Labels** | `type: feature` · `group: 4-community` |

## Loop ของการ์ดนี้

1. **Board:** Assign ตัวเอง → ย้ายเป็น **In Progress**
2. **Branch:** `git switch feature/community && git pull` → `git switch -c feature/community-talks`
3. **Design:** Kilo → `designer` → `/design.md` → spec สถานะ Draft + handoff รอบ 1 → คอมเมนต์ path ของ spec ในการ์ดนี้
4. **Design Gate:** ผู้สอนตรวจ → spec เป็น Approved
5. **Build:** `builder` → `/build.md` (DB+API → หน้าจอ → เทสต์) · commit เล็ก ๆ เช่น `feat(talks): add table and API (#<เลขการ์ดนี้>)`
6. **PR:** `feature/community-talks` → `feature/community` ใส่ `Part of #<เลขการ์ดนี้>` ในคำอธิบาย → ย้ายการ์ดเป็น **In Review**
7. **Review:** เพื่อนในกลุ่ม → กลุ่มคู่ → `reviewer` `/review.md` · แก้ 🔴 ให้หมด → merge เข้า branch กลุ่ม
8. **Done:** การ์ดปิดเองเมื่อ PR ของกลุ่ม (มี `Closes #<เลขการ์ดนี้>`) merge เข้า `main`

## เสร็จเมื่อ (Core Done — docs/features.md §5)

- [ ] เพิ่ม / แก้ / ลบ / ซ่อน / จัดลำดับ ได้จากหน้า Dashboard และเห็นผลบนหน้า Public
- [ ] ข้อมูลอยู่ใน Postgres และยังอยู่หลัง restart API · `npm run db:setup` รันซ้ำได้
- [ ] ตรวจเจ้าของ (`user_id` ใน WHERE) · validate ด้วย zod · parameterized query
- [ ] มี `apps/api/test/<โมดูล>.test.js` · `npm test` + `npm run build:web` ผ่าน
- [ ] PR ผ่านรีวิว 2 ชั้น + CI เขียว · handoff บันทึกผลรีวิวแล้ว
