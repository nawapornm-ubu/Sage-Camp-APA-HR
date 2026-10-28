# WS3.2 — สร้าง Kanban Board ของทีม (GitHub Projects)

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 3 |
| **เวลา** | 20 นาที |
| **รูปแบบ** | ทีม — **Module Lead เป็นคนตั้งค่า** (ต้องเป็น Admin ของ project) คนอื่นดูบนจอตัวเองและตรวจ |
| **สไลด์** | หน้า 109–115 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | Board 5 คอลัมน์ พร้อม Fields และ workflow ที่เลื่อนการ์ดเมื่อมีเหตุการณ์ |

## 🎯 เป้าหมาย

ให้ทั้งทีม **เห็นงานทั้งหมดบนกระดานเดียว** และรู้ว่าใครถือการ์ดไหนอยู่

## 📋 ต้องมีก่อนเริ่ม

- Issue ที่เปิดใน [WS3.1](ws-3.1-issue-templates-labels.md) อย่างน้อยทีมละ 3–4 ใบ
- สิทธิ์ Admin ใน repo (สร้าง project ได้)

## 👉 ขั้นตอน

### ขั้นที่ 1 — สร้าง Project

1. เปิด repo ของทีม → แท็บ **Projects** → **New project**
2. เลือกแม่แบบ **Board** → ตั้งชื่อ `Practice Board — ทีม <N>` → **Create**

> GitHub Projects ใช้ได้ทั้งระดับ repo และระดับ Organization — โครงการข้ามทีมแนะนำระดับ Organization (เหมาะกับโครงการข้ามหน่วยงานจริงหลังอบรม)

### ขั้นที่ 2 — ตั้งค่า Status 5 ค่า

1. คลิกชื่อ field **Status** (หัวคอลัมน์ในมุมมอง Table หรือเมนู ⋯ → Settings)
2. ตั้งค่าให้มี **5 ตัวเลือก ตามลำดับ**:

`Backlog` → `Ready` → `In Progress` → `In Review` → `Done`

(เปลี่ยนชื่อ Todo เป็น Backlog และเพิ่ม Ready / In Review)

💡 Status ทุกค่าต้องมี "ความหมายที่ทีมเข้าใจตรงกัน":

| Status | หมายถึง |
|---|---|
| Backlog | คิดไว้แล้ว ยังไม่พร้อมทำ |
| Ready | AC ชัด พร้อมให้ใครก็ได้หยิบ |
| In Progress | มีคนหยิบ (Assign) และกำลังทำ |
| In Review | เปิด PR แล้ว รอคน Review |
| Done | merge แล้ว / Issue ปิด |

### ขั้นที่ 3 — เพิ่ม Fields

กด **+** ที่ท้ายหัวคอลัมน์ในมุมมอง Table → **New field**:

| Field | ชนิด | ค่า |
|---|---|---|
| Module | Single select | upload · search · versions · workflow · users |
| Priority | Single select | high · medium · low |
| Size | Single select | S · M · L |

### ขั้นที่ 4 — เปิด Workflow ในตัว

มุมขวาบนของ Project → เมนู **⋯** → **Workflows** แล้วเปิด/ตั้งค่า (ชื่ออาจต่างเล็กน้อยตามเวอร์ชันของ GitHub):

| Workflow | ตั้งให้ |
|---|---|
| **Item added to project** | Status = `Backlog` |
| **Item closed** | Status = `Done` |
| **Pull request merged** | Status = `Done` |
| **Auto-add to project** | Repository = repo ทีม · Filter `is:issue,pr is:open` |

> ขั้น **In Progress / In Review** ถ้า workflow ในตัวไม่มีเงื่อนไขที่ต้องการ ให้ **ลากการ์ดเอง** — เป้าหมายคือฝึกวินัยอัปเดตสถานะ

### ขั้นที่ 5 — สร้าง View

- **Board** (ค่าตั้งต้น): จัดกลุ่มตาม Status
- เพิ่ม View ใหม่ **Table**: จัดกลุ่ม (Group by) ตาม Status แสดงคอลัมน์ Assignees / Module / Priority / Size
- (ถ้ามี Milestone) เพิ่ม View **Roadmap**

### ขั้นที่ 6 — นำการ์ดเข้า Board

ถ้า Auto-add ไม่ดึง Issue เก่ามาให้ → ในมุมมอง Table กด **+ Add item** ค้นหา `#` แล้วเลือก Issue ที่เปิดไว้ใน WS3.1 ทั้งหมด

✅ **ต้องเห็น:** Issue จาก WS3.1 ปรากฏเป็นการ์ดในคอลัมน์ Backlog

### ขั้นที่ 7 — ลองเลื่อนการ์ด

1. ลากการ์ด 1 ใบไป **Ready**
2. เปิดการ์ด → **Assignees** เลือกตัวเอง → ลากไป **In Progress**
3. ปิด Issue ทดสอบ (Close as completed) → การ์ดควรไป **Done** อัตโนมัติ (ถ้าเปิด workflow ไว้) → เปิดกลับ (Reopen)

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] Board มี 5 คอลัมน์ตามลำดับที่กำหนด
- [ ] มี Fields Module / Priority / Size และการ์ดอย่างน้อย 3 ใบถูกใส่ค่า
- [ ] Workflow Item added → Backlog และ Item closed → Done ทำงาน
- [ ] ทุกคนในทีมเปิดดู Board ได้

## 🔧 ปัญหาที่พบบ่อย

| อาการ | สาเหตุ | วิธีแก้ |
|---|---|---|
| ไม่เห็นเมนู Workflows | ไม่ใช่ Admin ของ project | ให้ Module Lead ทำ / ตรวจสิทธิ์ที่ Project → Settings → Manage access |
| การ์ดไม่เลื่อนเป็น Done ตอนปิด Issue | Workflow ยังไม่เปิด | เปิด Item closed → Done |
| Issue ไม่เข้า Board | Auto-add filter ผิด หรือ Issue เก่า | ใช้ + Add item หรือแก้ filter |
| ลืมใส่ค่า Module | ไม่ได้ตั้งค่าเริ่มต้น | ใช้มุมมอง Table แก้เป็นกลุ่ม |

## 🧪 ท้าทายเพิ่ม

- สร้าง View ที่กรองเฉพาะ `Module = search` และ `Priority = high`
- สร้าง Milestone `v0.0.1` แล้วแสดงใน Roadmap

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- เมนูของ GitHub Projects ปรับบ่อย ให้ผู้สอนสาธิตจากหน้าจอจริงก่อนและแก้คำศัพท์ในเอกสารนี้ให้ตรงกับที่เห็น
- ย้ำว่า **Board มีไว้ให้ทีมเห็นสถานะ ไม่ใช่ไว้รายงานเจ้านาย** — ถ้าไม่มีใครอัปเดต Board ก็ไม่มีประโยชน์
- Day 2 ใช้ Board แบบเดียวกันใน ubu-biolink — การ์ด 20 ใบ (Design Doc 4 + โมดูล 16) เดินตาม Loop ของ 1 การ์ด (ดู [day2/loop-1-card.md](../day2/loop-1-card.md))

**ต่อไป →** [WS3.3 Sprint Planning จำลอง](ws-3.3-sprint-planning.md)
