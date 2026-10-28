# [Feature] B — ค้นหาประกาศ

| | |
|---|---|
| **Spec** | [`docs/specs/B-search.md`](../blob/main/docs/specs/B-search.md) — รายละเอียดทั้งหมดอยู่ที่นี่ |
| **Branch** | `feature/search` |
| **Labels** | `type: feature` · `module: search` · `priority: high` |
| **ระดับ** | ง่าย · ประมาณ 30–45 นาที (รวม PR + Review) |

## User story

ในฐานะผู้อ่าน ฉันต้องการค้นหาประกาศด้วยคำค้น เพื่อหาประกาศที่ต้องการได้เร็วเมื่อมีประกาศจำนวนมาก

## วิธีทำ

1. Assign ตัวเอง → ย้ายการ์ดเป็น **In Progress** → `git switch main && git pull && git switch -c feature/search`
2. เปิด `docs/specs/B-search.md` อ่านให้ครบ แล้วคัดลอก **Prompt แนะนำ (หัวข้อ 9)** ไปสั่ง Cline / Kilo Code
3. อ่านแผนของ AI → อนุมัติ → อ่าน Diff ทุกไฟล์ก่อนกดยอมรับ (ห้ามเปิด Auto-approve)
4. ก่อนเปิด PR สั่ง `/check-before-pr.md` ใน Cline (หรือทำตาม `.clinerules/workflows/check-before-pr.md`)

## เสร็จเมื่อ

- [ ] Acceptance Criteria ในหัวข้อ 7 ของ spec ผ่านครบ (แนบผลใน PR)
- [ ] PR จาก `feature/search` เข้า `main` มี `Closes #<เลขการ์ดนี้>` และ CI เขียว
- [ ] เพื่อนในทีม Review และ Approve อย่างน้อย 1 คน
