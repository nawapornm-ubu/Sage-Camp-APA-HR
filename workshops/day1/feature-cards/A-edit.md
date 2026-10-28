# [Feature] A — แก้ไขประกาศ

| | |
|---|---|
| **Spec** | [`docs/specs/A-edit.md`](../blob/main/docs/specs/A-edit.md) — รายละเอียดทั้งหมดอยู่ที่นี่ |
| **Branch** | `feature/edit` |
| **Labels** | `type: feature` · `module: edit` · `priority: high` |
| **ระดับ** | ง่าย · ประมาณ 30–45 นาที (รวม PR + Review) |

## User story

ในฐานะเจ้าหน้าที่ ฉันต้องการแก้ไขหัวข้อหรือรายละเอียดของประกาศที่โพสต์ไปแล้ว เพื่อแก้คำผิดได้โดยไม่ต้องลบแล้วสร้างใหม่

## วิธีทำ

1. Assign ตัวเอง → ย้ายการ์ดเป็น **In Progress** → `git switch main && git pull && git switch -c feature/edit`
2. เปิด `docs/specs/A-edit.md` อ่านให้ครบ แล้วคัดลอก **Prompt แนะนำ (หัวข้อ 9)** ไปสั่ง Cline / Kilo Code
3. อ่านแผนของ AI → อนุมัติ → อ่าน Diff ทุกไฟล์ก่อนกดยอมรับ (ห้ามเปิด Auto-approve)
4. ก่อนเปิด PR สั่ง `/check-before-pr.md` ใน Cline (หรือทำตาม `.clinerules/workflows/check-before-pr.md`)

## เสร็จเมื่อ

- [ ] Acceptance Criteria ในหัวข้อ 7 ของ spec ผ่านครบ (แนบผลใน PR)
- [ ] PR จาก `feature/edit` เข้า `main` มี `Closes #<เลขการ์ดนี้>` และ CI เขียว
- [ ] เพื่อนในทีม Review และ Approve อย่างน้อย 1 คน
