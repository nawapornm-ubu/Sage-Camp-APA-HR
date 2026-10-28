# [Feature] G — ส่งออก CSV

| | |
|---|---|
| **Spec** | [`docs/specs/G-export.md`](../blob/main/docs/specs/G-export.md) — รายละเอียดทั้งหมดอยู่ที่นี่ |
| **Branch** | `feature/export` |
| **Labels** | `type: feature` · `module: export` · `priority: low` |
| **ระดับ** | กลาง · ประมาณ 30–45 นาที (รวม PR + Review) |

## User story

ในฐานะเจ้าหน้าที่ธุรการ ฉันต้องการดาวน์โหลดประกาศทั้งหมดเป็นไฟล์ CSV เพื่อเปิดใน Excel และทำรายงาน

## วิธีทำ

1. Assign ตัวเอง → ย้ายการ์ดเป็น **In Progress** → `git switch main && git pull && git switch -c feature/export`
2. เปิด `docs/specs/G-export.md` อ่านให้ครบ แล้วคัดลอก **Prompt แนะนำ (หัวข้อ 9)** ไปสั่ง Cline / Kilo Code
3. อ่านแผนของ AI → อนุมัติ → อ่าน Diff ทุกไฟล์ก่อนกดยอมรับ (ห้ามเปิด Auto-approve)
4. ก่อนเปิด PR สั่ง `/check-before-pr.md` ใน Cline (หรือทำตาม `.clinerules/workflows/check-before-pr.md`)

## เสร็จเมื่อ

- [ ] Acceptance Criteria ในหัวข้อ 7 ของ spec ผ่านครบ (แนบผลใน PR)
- [ ] PR จาก `feature/export` เข้า `main` มี `Closes #<เลขการ์ดนี้>` และ CI เขียว
- [ ] เพื่อนในทีม Review และ Approve อย่างน้อย 1 คน
