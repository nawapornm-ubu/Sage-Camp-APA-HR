# WS3.1 — Issue Template และ Label ของทีม

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 3 |
| **เวลา** | 25 นาที |
| **รูปแบบ** | ทีม (คนที่ 1 ทำไฟล์ template · คนที่ 2 ทำ label · คนที่ 3 ทำ PR/Review · ระหว่างรอ ที่เหลืออ่าน spec ของการ์ดที่จะเปิด) แล้วทุกคนเปิดการ์ด A–H |
| **สไลด์** | หน้า 102–108 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | repo ทีมมีแม่แบบ Issue 3 แบบ + ชุด Label มาตรฐาน และการ์ดฟีเจอร์ A–H ครบ 8 ใบ (ผู้เรียนเปิดเอง) |

## 🎯 เป้าหมาย

ทำให้ทุก Issue ของทีมมี **โครงสร้างเดียวกัน** (story + Acceptance Criteria + label) — เพราะวันพรุ่งนี้ทั้งคนและ AI จะอ่าน Issue เพื่อรู้ว่าต้องสร้างอะไร

## 📋 ต้องมีก่อนเริ่ม

- ผ่าน WS2.x (repo ทีมมี Ruleset: ต้องเปิด PR) — งานนี้ทำผ่านกิ่ง + PR
- `gh` ล็อกอินแล้ว

## 👉 ขั้นตอน

### ขั้นที่ 1 — สร้างกิ่งและแม่แบบ Issue (Feature)

```bash
git switch main && git pull
git switch -c chore/issue-templates
mkdir -p .github/ISSUE_TEMPLATE
```

สร้างไฟล์ **`.github/ISSUE_TEMPLATE/feature.yml`**:

```yaml
name: Feature
description: ฟีเจอร์ใหม่ของโมดูล
title: "[Feature]: "
labels: ["type: feature"]
body:
  - type: textarea
    id: story
    attributes:
      label: User story
      description: ในฐานะ ... ฉันต้องการ ... เพื่อ ...
    validations:
      required: true
  - type: textarea
    id: ac
    attributes:
      label: Acceptance Criteria
      description: เขียนให้ตรวจได้ว่า "ผ่าน" หรือ "ไม่ผ่าน"
      value: "- [ ] "
    validations:
      required: true
  - type: textarea
    id: scope
    attributes:
      label: ขอบเขต (ทำ / ไม่ทำ)
  - type: dropdown
    id: module
    attributes:
      label: โมดูล
      options: [edit, search, pin, category, stats, ack, export, theme]
    validations:
      required: true
```

### ขั้นที่ 2 — เพิ่ม `bug.yml` และ `task.yml`

**`.github/ISSUE_TEMPLATE/bug.yml`**

```yaml
name: Bug
description: แจ้งปัญหาที่พบ
title: "[Bug]: "
labels: ["type: bug"]
body:
  - type: textarea
    id: steps
    attributes:
      label: ขั้นตอนทำซ้ำ
      value: "1. \n2. \n3. "
    validations:
      required: true
  - type: textarea
    id: actual
    attributes:
      label: ผลที่เห็น
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: ผลที่คาดหวัง
    validations:
      required: true
  - type: dropdown
    id: module
    attributes:
      label: โมดูล
      options: [edit, search, pin, category, stats, ack, export, theme]
```

**`.github/ISSUE_TEMPLATE/task.yml`**

```yaml
name: Task
description: งานย่อยที่ต้องทำ (เอกสาร ตั้งค่า งานเทคนิค)
title: "[Task]: "
labels: ["type: task"]
body:
  - type: textarea
    id: what
    attributes:
      label: ต้องทำอะไร
    validations:
      required: true
  - type: textarea
    id: done
    attributes:
      label: เสร็จเมื่อ
      value: "- [ ] "
    validations:
      required: true
```

และไฟล์ **`.github/ISSUE_TEMPLATE/config.yml`** (ปิดการเปิด Issue ว่างเปล่า):

```yaml
blank_issues_enabled: false
```

### ขั้นที่ 3 — สร้างชุด Label

คนที่ 2 รันสคริปต์ใน repo ของทีม (ใช้ `--force` เพื่ออัปเดตถ้ามีอยู่แล้ว):

**macOS / Git Bash**

```bash
R=<OWNER>/<REPO>
gh label create "type: feature"   -R $R --color 1D76DB --description "ฟีเจอร์ใหม่" --force
gh label create "type: bug"       -R $R --color D73A4A --description "แก้บั๊ก" --force
gh label create "type: task"      -R $R --color 0E8A16 --description "งานย่อย/เอกสาร/ตั้งค่า" --force
gh label create "priority: high"   -R $R --color B60205 --description "ทำก่อน" --force
gh label create "priority: medium" -R $R --color FBCA04 --description "ปกติ" --force
gh label create "priority: low"    -R $R --color C2E0C6 --description "ทำทีหลัง" --force
for m in edit search pin category stats ack export theme; do
  gh label create "module: $m" -R $R --color BFD4F2 --description "โมดูล $m" --force
done
gh label create "good first issue" -R $R --color 7057FF --description "เหมาะกับคนเริ่มต้น" --force
gh label create "blocked"          -R $R --color 000000 --description "ติดอยู่ รออย่างอื่น" --force
gh label create "ai-review"        -R $R --color 5319E7 --description "สั่งให้ AI Review bot รีวิว PR นี้" --force
```

**Windows PowerShell**

```powershell
$R = "<OWNER>/<REPO>"
gh label create "type: feature" -R $R --color 1D76DB --description "ฟีเจอร์ใหม่" --force
gh label create "type: bug" -R $R --color D73A4A --description "แก้บั๊ก" --force
gh label create "type: task" -R $R --color 0E8A16 --description "งานย่อย/เอกสาร/ตั้งค่า" --force
gh label create "priority: high" -R $R --color B60205 --description "ทำก่อน" --force
gh label create "priority: medium" -R $R --color FBCA04 --description "ปกติ" --force
gh label create "priority: low" -R $R --color C2E0C6 --description "ทำทีหลัง" --force
foreach ($m in "edit","search","pin","category","stats","ack","export","theme") {
  gh label create "module: $m" -R $R --color BFD4F2 --description "โมดูล $m" --force
}
gh label create "good first issue" -R $R --color 7057FF --description "เหมาะกับคนเริ่มต้น" --force
gh label create "blocked" -R $R --color 000000 --description "ติดอยู่ รออย่างอื่น" --force
gh label create "ai-review" -R $R --color 5319E7 --description "สั่งให้ AI Review bot รีวิว PR นี้" --force
```

✅ **ต้องเห็น:** `gh label list -R <OWNER>/<REPO>` แสดง label ทั้ง 4 กลุ่ม

### ขั้นที่ 4 — เปิด PR และ merge

```bash
git add .github
git commit -m "chore: add issue templates"
git push -u origin chore/issue-templates
gh pr create --base main --fill
```

ให้เพื่อน Review → Approve → **Squash and merge**

### ขั้นที่ 5 — ตรวจว่าแม่แบบขึ้น

เปิด repo → แท็บ **Issues** → **New issue**

✅ **ต้องเห็น:** ตัวเลือก **Bug / Feature / Task**

### ขั้นที่ 6 — เปิดการ์ดฟีเจอร์ A–H (คนละใบ จนครบ 8 ใบ)

การ์ดเหล่านี้คืองานที่ทีมจะหยิบทำใน [WS3.3](ws-3.3-sprint-planning.md) — แบ่งกันในทีมว่าใครเปิดใบไหน (ทีมน้อยกว่า 8 คน → บางคนเปิด 2 ใบ)

| การ์ด | หัวข้อ Issue | โมดูล (dropdown) | Label priority | spec ใน repo ทีม |
|---|---|---|---|---|
| A | `[Feature]: A — แก้ไขประกาศ` | edit | `priority: high` | `docs/specs/A-edit.md` |
| B | `[Feature]: B — ค้นหาประกาศ` | search | `priority: high` | `docs/specs/B-search.md` |
| C | `[Feature]: C — ปักหมุดประกาศ` | pin | `priority: medium` | `docs/specs/C-pin.md` |
| D | `[Feature]: D — หมวดหมู่ประกาศ` | category | `priority: medium` | `docs/specs/D-category.md` |
| E | `[Feature]: E — สรุปสถิติ` | stats | `priority: low` | `docs/specs/E-stats.md` |
| F | `[Feature]: F — ปุ่มรับทราบ` | ack | `priority: medium` | `docs/specs/F-ack.md` |
| G | `[Feature]: G — ส่งออก CSV` | export | `priority: low` | `docs/specs/G-export.md` |
| H | `[Feature]: H — ธีมมืด/สว่าง + เวลาแบบสัมพัทธ์` | theme | `priority: low` | `docs/specs/H-theme.md` |

กรอกแม่แบบ **Feature**:

1. **User story** — อ่านหัวข้อ 1 ของ spec แล้วเขียนเป็น "ในฐานะ… ฉันต้องการ… เพื่อ…" (ดูตัวอย่างได้ที่ [feature-cards/](feature-cards/) ของ repo หลักสูตร)
2. **Acceptance Criteria** — เลือก 3 ข้อสำคัญจากหัวข้อ 7 ของ spec เป็น checkbox แล้วเติมบรรทัดสุดท้าย `รายละเอียดครบ: docs/specs/<การ์ด>.md หัวข้อ 7`
3. **ขอบเขต** — วางลิงก์ spec (AI กับเพื่อนจะเปิดจากการ์ดได้ทันที)
4. เลือกโมดูล → **Create** → ติด Label `module: <โมดูล>` และ `priority: …` ตามตาราง

ตัวอย่างการ์ด A:

> **User story:** ในฐานะเจ้าหน้าที่ ฉันต้องการแก้ไขหัวข้อหรือรายละเอียดของประกาศที่โพสต์ไปแล้ว เพื่อแก้คำผิดได้โดยไม่ต้องลบแล้วสร้างใหม่
> **Acceptance Criteria:**
> - [ ] PATCH หัวข้อแล้วได้ค่าใหม่ ฟิลด์ที่ไม่ได้ส่งยังเป็นค่าเดิม
> - [ ] ส่งหัวข้อว่าง → 400 พร้อมข้อความ error
> - [ ] แก้ประกาศที่ไม่มีอยู่ → 404
> - รายละเอียดครบ: `docs/specs/A-edit.md` หัวข้อ 7

> ทีมไหนเวลาไม่พอ ผู้สอนสร้างการ์ดที่ขาดให้ด้วยสคริปต์สำรอง (ดูหมายเหตุผู้สอนท้ายไฟล์)

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] New issue แสดงตัวเลือก 3 แบบและไม่มี "Open a blank issue"
- [ ] repo ทีมมีการ์ด A–H ครบ 8 ใบ (แท็บ Issues)
- [ ] การ์ดของคุณมี Acceptance Criteria เป็น checkbox อย่างน้อย 3 ข้อ ที่ **ตรวจได้** + ลิงก์ spec
- [ ] ติด Label ครบ type / module / priority

## 🔧 ปัญหาที่พบบ่อย

| อาการ | สาเหตุ | วิธีแก้ |
|---|---|---|
| New issue ไม่ขึ้นแม่แบบ | ไฟล์ยังไม่ merge เข้า `main` หรือ YAML ผิด | ตรวจว่าอยู่บน `main` ที่ path `.github/ISSUE_TEMPLATE/` และ indent ถูก (ใช้ space ไม่ใช่ tab) |
| `gh label create` ถามสิทธิ์ | ใช้ `-R` ผิด repo | ตรวจชื่อ `<OWNER>/<REPO>` |
| AC เขียนว่า "ระบบต้องเร็ว" | ตรวจไม่ได้ | เขียนใหม่เป็นตัวเลข/เงื่อนไข เช่น "ตอบภายใน 1 วินาที เมื่อมี 10,000 รายการ" |

## 🧪 ท้าทายเพิ่ม

- แลก Issue กับเพื่อน แล้วให้เพื่อนบอกว่า AC ข้อไหน "ตรวจไม่ได้" — ช่วยกันแก้
- เพิ่มช่อง **Priority** เป็น dropdown ใน `feature.yml`

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- เชื่อมกับ Day 2: AC ที่ตรวจได้ = โจทย์ที่ AI เข้าใจตรงกัน และเป็นเกณฑ์ของ "ประตูมนุษย์ที่ 1" (5 คำถามก่อนอนุมัติ Spec)
- ถ้า repo ใช้ GitHub **Issue types** (Bug/Feature/Task ระดับ Organization) ได้ ให้ผู้สอนตัดสินใจว่าจะใช้ควบกับ label หรือไม่ — เอกสารนี้ใช้ label เพราะรองรับทุกแพ็กเกจ
- แจกไฟล์ yml/สคริปต์ label ให้คัดลอกได้เลย ใช้เวลาไปกับการ **เขียน AC** ไม่ใช่การพิมพ์ YAML
- **สคริปต์สำรอง:** ทีมที่เปิดการ์ดไม่ครบก่อน WS3.3 → ผู้สอน (ต้องเป็น Collaborator ของ repo ทีม) รันจากรากรีโปหลักสูตร `bash workshops/scripts/seed-day1-features.sh <OWNER>/<REPO>` — สคริปต์สร้าง **ทั้ง 8 ใบ** ใหม่ ถ้าทีมเปิดไว้บางใบแล้วให้ปิดใบซ้ำ (Close as duplicate) หรือสร้างใบที่ขาดด้วย `gh issue create -R <OWNER>/<REPO> --title "<หัวข้อ>" --body-file workshops/day1/feature-cards/<ไฟล์>.md --label "type: feature" --label "module: <โมดูล>" --label "priority: <ระดับ>"`

**ต่อไป →** [WS3.2 สร้าง Kanban Board](ws-3.2-kanban-board.md)
