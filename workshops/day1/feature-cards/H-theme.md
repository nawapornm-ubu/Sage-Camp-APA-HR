# [Feature] H — ธีมมืด/สว่าง + เวลาแบบสัมพัทธ์

| | |
|---|---|
| **Spec** | [`docs/specs/H-theme.md`](../blob/main/docs/specs/H-theme.md) — รายละเอียดทั้งหมดอยู่ที่นี่ |
| **Branch** | `feature/theme` |
| **Labels** | `type: feature` · `module: theme` · `priority: low` |
| **ระดับ** | ง่าย (หน้าเว็บอย่างเดียว) · ประมาณ 30–45 นาที (รวม PR + Review) |

## User story

ในฐานะผู้ใช้ ฉันต้องการสลับโหมดมืด/สว่าง และเห็นเวลาประกาศแบบ "5 นาทีที่แล้ว" เพื่อให้อ่านง่ายขึ้น

## วิธีทำ

1. Assign ตัวเอง → ย้ายการ์ดเป็น **In Progress** → `git switch main && git pull && git switch -c feature/theme`
2. เปิด `docs/specs/H-theme.md` อ่านให้ครบ แล้วคัดลอก **Prompt แนะนำ (หัวข้อ 9)** ไปสั่ง Cline / Kilo Code
3. อ่านแผนของ AI → อนุมัติ → อ่าน Diff ทุกไฟล์ก่อนกดยอมรับ (ห้ามเปิด Auto-approve)
4. ก่อนเปิด PR สั่ง `/check-before-pr.md` ใน Cline (หรือทำตาม `.clinerules/workflows/check-before-pr.md`)

## เสร็จเมื่อ

- [ ] Acceptance Criteria ในหัวข้อ 7 ของ spec ผ่านครบ (แนบผลใน PR)
- [ ] PR จาก `feature/theme` เข้า `main` มี `Closes #<เลขการ์ดนี้>` และ CI เขียว
- [ ] เพื่อนในทีม Review และ Approve อย่างน้อย 1 คน
