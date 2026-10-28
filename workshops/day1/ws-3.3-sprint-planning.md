# WS3.3 — Sprint Planning จำลอง

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 3 |
| **เวลา** | 45 นาที (ทำต่อได้ช่วง WS4.1) |
| **รูปแบบ** | ทีม — แต่ละคนหยิบ 1 ฟีเจอร์ (การ์ด A–H) ทำใน Feature Branch ของตัวเองด้วย AI |
| **สไลด์** | หน้า 120–129 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | ฟีเจอร์ของทีมเดินครบ Backlog → Done ผ่าน `feature/<ชื่อ>` + PR และ Milestone `v0.0.1` แสดงความคืบหน้า |

## 🎯 เป้าหมาย

ฝึก **วงจรงานเต็มรอบ**: หยิบการ์ด → เปิด Feature Branch → ให้ AI ช่วยเขียนเฉพาะไฟล์ของฟีเจอร์ → ส่ง PR (`Closes #เลข`) → Review → Merge → การ์ดเป็น Done

ฝึกแบบเดียวกับวันที่ 2 (UBU BioLink แบ่ง 4 กลุ่ม × 4 โมดูล) แต่กับแอปเล็ก — **1 ฟีเจอร์ = 1 Feature Branch = ไฟล์ของตัวเอง** ไม่ต้องแตะไฟล์ร่วม

## 📋 ต้องมีก่อนเริ่ม

- Board จาก [WS3.2](ws-3.2-kanban-board.md)
- การ์ดฟีเจอร์ 8 ใบ (A–H) ใน Backlog ของทีม — ทีมเปิดเองใน [WS3.1 ขั้นที่ 6](ws-3.1-issue-templates-labels.md) (ขาดใบไหน แจ้งผู้สอน)
- Cline หรือ Kilo Code เชื่อม API Key แล้ว (Module 1) และอ่านหัวข้อ "การแบ่งฟีเจอร์ให้ทีม" ใน `README.md` ของ repo

## 👉 ขั้นตอน

### ขั้นที่ 1 — Planning (ทีมคุยกัน 5 นาที)

1. อ่านการ์ดใน Backlog ด้วยกัน — การ์ดไหน AC ชัดพอ ย้ายเป็น **Ready**
2. เลือกการ์ดสำหรับรอบนี้ตามจำนวนคน (ดูตาราง "แบ่งงานในทีม" ด้านล่าง) ติด Milestone `v0.0.1` (Issue → Milestone → New milestone → ตั้งชื่อ `v0.0.1`)
3. ตั้ง Priority / Size ให้การ์ดที่เลือก

### ขั้นที่ 2 — หยิบการ์ด

ทุกคนหยิบ **1 การ์ด** ที่ยังไม่มีเจ้าของ:

1. เปิด Issue → **Assignees → assign yourself**
2. ย้ายการ์ดเป็น **In Progress**

> 💡 ในวันจริง ผู้เรียน 20–30 คนหยิบการ์ดจาก Board เดียว ถ้าไม่ Assign จะมีคนทำซ้ำกัน

### ขั้นที่ 3 — เปิด Feature Branch และให้ AI ช่วยทำ (25–30 นาที)

```bash
git switch main && git pull
git switch -c feature/<ชื่อฟีเจอร์>     # เช่น feature/pin — ชื่อตามการ์ด
npm install
```

1. เปิด spec ของการ์ด `docs/specs/<โมดูล>-<ชื่อ>.md` (ลิงก์อยู่ในการ์ด) อ่านให้ครบ → คัดลอก **Prompt แนะนำ (หัวข้อ 9)** ไปวางใน Cline
   💡 AI จะอ่าน `AGENTS.md` และ spec เองตาม Prompt — ไม่ต้องคัดลอกเนื้อหา spec ไปวาง
2. ให้ AI **วางแผนก่อน** (Plan mode) → อ่านแผน: แก้เฉพาะไฟล์ของฟีเจอร์ไหม? → กดอนุมัติ
3. AI แก้ทีละไฟล์ → **อ่าน Diff ก่อนกด Save ทุกครั้ง** (ห้ามเปิด Auto-approve)
4. ให้ AI รันคำสั่งใน **Acceptance Criteria (หัวข้อ 7)** ทุกข้อและรายงานผล แล้วรันเองซ้ำอีกครั้ง + ลองใช้บนหน้าเว็บ:

```bash
npm run lint && npm test
npm run dev        # เปิด http://localhost:3000 ลองกดฟีเจอร์ของตัวเอง
```

5. commit เฉพาะไฟล์ของฟีเจอร์ (ตรวจด้วย `git status` ว่าไม่มีไฟล์ร่วมหลุดมา):

```bash
git status
git add src/features/<ชื่อ>.js public/features/<ชื่อ>.js test/<ชื่อ>.test.js
git commit -m "feat(<ชื่อ>): <สรุปสั้น ๆ> (#<N>)"
git push -u origin feature/<ชื่อฟีเจอร์>
```

🔧 **ถ้า `git status` เห็นไฟล์ร่วม** (เช่น `src/app.js`) ถูกแก้ → `git restore src/app.js` แล้วบอก AI ว่า "ห้ามแก้ไฟล์ร่วม ให้ทำในไฟล์ของฟีเจอร์เท่านั้น"

### ขั้นที่ 4 — เปิด PR ผูกกับ Issue

```bash
gh pr create --base main --title "feat(<ชื่อ>): <สรุปสั้น ๆ>" --body "Closes #<N>"
```

- ตรวจว่าหน้า PR ขึ้นลิงก์ไปที่ Issue ที่ด้านขวา (Development)
- ย้ายการ์ดเป็น **In Review**

> **ผูก PR กับ Issue (สไลด์หน้า 100)** — ผูกได้ 3 วิธี: ① เขียน `Closes #<N>` ในคำอธิบาย PR (`Fixes` / `Resolves` ใช้แทนได้ · หลายใบเขียนทีละบรรทัด) ② ลืมเขียน → แถบขวาของ PR **Development → ⚙ → เลือก Issue** ③ เริ่มจากหน้า Issue **Development → Create a branch** แล้ว PR จากกิ่งนั้นผูกเอง
>
> | เขียน | ผล |
> |---|---|
> | `Closes #12` | ผูก + **ปิด Issue เมื่อ merge** → การ์ดไป Done |
> | `Part of #12` | ลิงก์ไปหา Issue แต่ไม่ปิด (ใช้กับ PR ย่อย — วันที่ 2) |
> | `#12` | อ้างถึงเฉย ๆ ไม่ปิด |
> | commit `… (#12)` | commit โผล่ในหน้า Issue ไม่ปิด |
>
> ⚠️ Issue ปิดเองเฉพาะเมื่อ PR merge เข้า **`main` (default branch)** — PR เข้ากิ่งอื่นใส่ `Closes` ก็ยังไม่ปิด

### ขั้นที่ 5 — เพื่อน Review และ Merge

เพื่อนในทีม (คนละคนกับเจ้าของ PR) อ่าน **Files changed** → ตรวจว่าแก้เฉพาะไฟล์ของฟีเจอร์ → ถาม 1 คำถาม → Approve → **Squash and merge**

> ถ้ายังไม่ได้ตั้ง CI (ทำใน WS4.1) ให้ผู้ Review ดึง branch มารัน `npm test` เองก่อน Approve

✅ **ต้องเห็น:** Issue ปิดเอง และการ์ดไป **Done**

### ขั้นที่ 6 — Stand-up 2 นาที (GitHub Discussions)

เปิดแท็บ **Discussions** (ถ้ายังไม่เปิด: Settings → General → Features → ติ๊ก Discussions) แล้วโพสต์ 1 หัวข้อ:

```markdown
**Stand-up ทีม <N>**
- เสร็จแล้ว: ...
- กำลังทำ: ...
- ติดอะไร: ...
```

## 📋 การ์ดฟีเจอร์ 8 ใบ (A–H)

| โมดูล | ฟีเจอร์ | Branch | ระดับ |
|---|---|---|---|
| A | แก้ไขประกาศ | `feature/edit` | ง่าย |
| B | ค้นหาประกาศ | `feature/search` | ง่าย |
| C | ปักหมุดประกาศ | `feature/pin` | ง่าย |
| D | หมวดหมู่ประกาศ | `feature/category` | กลาง |
| E | สรุปสถิติ | `feature/stats` | ง่าย |
| F | ปุ่มรับทราบ | `feature/ack` | ง่าย |
| G | ส่งออก CSV | `feature/export` | กลาง |
| H | ธีมมืด/สว่าง + เวลาแบบสัมพัทธ์ | `feature/theme` | ง่าย (หน้าเว็บอย่างเดียว) |

**แบ่งงานในทีม:** 4 คน → คนละ 2 ใบ (A+D · B+G · C+E · F+H) · 5 คน → A · B · C+E · D · F+H (G สำรอง) · 6 คน → A · B · C · D · F · H (E, G สำรอง)

ทีมเปิดการ์ดเองใน WS3.1 — ตัวอย่างการ์ดฉบับเต็มอยู่ที่ [feature-cards/](feature-cards/) · ทีมไหนเปิดไม่ครบ แจ้งผู้สอน

**ทางสำรอง (ผู้สอน)** ถ้าทีมเปิดไม่ครบ สร้างให้ด้วยสคริปต์ (รันจากรากรีโปหลักสูตร — สร้างครบ 8 ใบ ระวังซ้ำกับใบที่ทีมเปิดแล้ว):

```bash
bash workshops/scripts/seed-day1-features.sh <OWNER>/<REPO>
```

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] ทุกคนในทีมมีการ์ดที่ไปถึง **Done** (หรือเปิด PR แล้ว) อย่างน้อย 1 ใบ ผ่าน PR ที่ผูก `Closes #เลข`
- [ ] PR แต่ละใบแก้เฉพาะไฟล์ของฟีเจอร์ตัวเอง
- [ ] Milestone `v0.0.1` แสดงเปอร์เซ็นต์ความคืบหน้า
- [ ] ไม่มีสองคนทำการ์ดใบเดียวกัน (ทุกใบมี Assignee 1 คน)
- [ ] โพสต์ Stand-up ใน Discussions แล้ว

## 🔧 ปัญหาที่พบบ่อย

| อาการ | สาเหตุ | วิธีแก้ |
|---|---|---|
| Issue ไม่ปิดหลัง merge | ไม่ได้เขียน `Closes #เลข` ใน PR หรือ merge เข้ากิ่งที่ไม่ใช่ default | แก้คำอธิบาย PR ก่อน merge / ปิด Issue เอง |
| การ์ดไม่เลื่อนเป็น Done | Workflow ยังไม่เปิด | WS3.2 ขั้นที่ 4 |
| สองคนทำการ์ดเดียวกัน | ไม่ได้ Assign | ใช้ `gh issue edit <N> --add-assignee @me` ก่อนเริ่ม |
| PR conflict | AI แก้ไฟล์ร่วม (เช่น `src/app.js`) | `git restore <ไฟล์>` แล้วย้ายโค้ดไปไว้ในไฟล์ของฟีเจอร์ · ถ้าจำเป็นจริงใช้ทักษะจาก WS2.2 |
| หน้าเว็บไม่เห็นปุ่มใหม่ | เบราว์เซอร์ cache ไฟล์ JS เก่า | กด `Ctrl+Shift+R` และดู error ใน DevTools (F12 → Console) |

## 🧪 ท้าทายเพิ่ม

- แตกการ์ดใหญ่เป็น **Sub-issues** (เปิด Issue แม่ แล้วกด Create sub-issue) และดูว่า Board แสดงความคืบหน้าอย่างไร
- ใช้ `gh pr list --state merged` ดูงานที่ merge แล้วของทีม

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- รายละเอียดการเตรียม แผนซ้อม และความเสี่ยงอยู่ใน [features-backlog.md](features-backlog.md) · เฉลยสำหรับ TA อยู่ใน [solutions/](solutions/README.md) (ห้ามแจก)
- ฟีเจอร์ที่ยังไม่เสร็จตอน 14:30 ทำต่อได้ช่วง WS4.1 — PR ฟีเจอร์คือ PR ที่ CI จะตรวจจริง
- จุดสังเกต: ใครลืม Assign, ใครลืม `Closes #เลข` — ยกเป็นกรณีศึกษาหลัง Workshop (ไม่ประจาน)
- เวลาเหลือ → หยิบการ์ดสำรอง (E, G) หรือให้ทีมที่เสร็จก่อนสร้าง Sub-issues

**ต่อไป →** พักเบรก แล้วเข้า [WS4.1 สร้าง CI และตั้ง Required Check](ws-4.1-ci-required-check.md)
