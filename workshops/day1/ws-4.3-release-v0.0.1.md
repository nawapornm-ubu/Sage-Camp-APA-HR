# WS4.3 — Release v0.0.1

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 4 |
| **เวลา** | 15 นาที |
| **รูปแบบ** | ทีม — Module Lead ออก Release คนอื่นตรวจ |
| **สไลด์** | หน้า 151–157 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | Release `v0.0.1` พร้อม Tag และ Release Notes ใน repo ของทีม |

## 🎯 เป้าหมาย

ออก **Release เวอร์ชันแรก** ตามหลัก Semantic Versioning พร้อมบันทึกการเปลี่ยนแปลงที่สร้างจาก PR อัตโนมัติ

## 💡 ทบทวน SemVer

`vMAJOR.MINOR.PATCH`

| ส่วน | เปลี่ยนเมื่อ | ตัวอย่าง |
|---|---|---|
| MAJOR | เปลี่ยนจนใช้ร่วมกับของเดิมไม่ได้ | `v1.0.0` → `v2.0.0` |
| MINOR | เพิ่มฟีเจอร์ ที่ยังใช้ร่วมกับของเดิมได้ | `v0.1.0` → `v0.2.0` |
| PATCH | แก้บั๊ก ไม่เปลี่ยนพฤติกรรม | `v0.1.0` → `v0.1.1` |

ก่อน `v1.0.0` ถือว่ายังพัฒนาอยู่ — วันนี้ `v0.0.1` ของทีม — `v0.1.0` คือรุ่นที่เพิ่มความสามารถใหม่โดยยังไม่เปลี่ยนสัญญา API

## 👉 ขั้นตอน

### ขั้นที่ 1 — ตรวจความพร้อมก่อน Release

- [ ] PR ทั้งหมดของ Sprint (WS3.3) merge เข้า `main` แล้ว
- [ ] CI บน `main` เขียว (แท็บ Actions)
- [ ] ทีมตกลงเลขเวอร์ชัน: **`v0.0.1`**

### ขั้นที่ 2 — (ตัวเลือก) ตั้งหมวด Release Notes ตาม Label

สร้างไฟล์ **`.github/release.yml`** ผ่านกิ่ง + PR:

```yaml
changelog:
  categories:
    - title: ฟีเจอร์ใหม่
      labels: ["type: feature"]
    - title: แก้บั๊ก
      labels: ["type: bug"]
    - title: งานอื่น ๆ
      labels: ["*"]
```

💡 Release Notes จะจัดกลุ่ม PR ตาม Label — เป็นเหตุผลที่ต้องติด `type:` ให้ PR/Issue และตั้งชื่อ PR ให้อ่านรู้เรื่อง

### ขั้นที่ 3 — สร้าง Release

**ผ่าน Terminal:**

```bash
git switch main && git pull
gh release create v0.0.1 --target main --title "v0.0.1" --generate-notes
```

**ผ่านเว็บ:** repo → ขวามือ **Releases** → **Draft a new release** → Choose a tag → พิมพ์ `v0.0.1` → **Create new tag on publish** → ตั้ง Title `v0.0.1` → กด **Generate release notes** → **Publish release**

### ขั้นที่ 4 — อ่านผล

```bash
gh release view v0.0.1
git fetch --tags
git tag --list
```

✅ **ต้องเห็น:**

- Release `v0.0.1` ในหน้า **Releases**
- Release Notes แสดงรายการ PR ที่ merge
- Tag `v0.0.1` ชี้ไปที่ commit ล่าสุดของ `main`
- ไฟล์ **Source code (zip / tar.gz)** แนบมาให้เอง

🔧 **ถ้า Release Notes ว่าง** — แปลว่ายังไม่มี PR ที่ merge ระหว่าง Release ก่อนหน้าถึงปัจจุบัน (เป็น Release แรกจึงรวมทุก PR ที่ merge แล้ว) ตรวจว่า PR ของ Sprint merge จริง

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] มี Release `v0.0.1` ในหน้า Releases
- [ ] Release Notes แสดงรายการ PR ของทีม
- [ ] `git tag --list` เห็น `v0.0.1`
- [ ] อธิบายได้ว่าถ้าแก้บั๊กเล็ก ๆ จะออกเป็นเวอร์ชันอะไร (`v0.0.2`)

## 🧪 ท้าทายเพิ่ม

- แก้บั๊กเล็ก ๆ 1 เรื่องผ่าน PR แล้วออก `v0.0.2`
- ลองลบ Release ทดสอบ (`gh release delete`) และบอกว่า tag ยังอยู่หรือไม่

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- ทุกทีมออก `v0.0.1` ใน repo ของตัวเอง แล้วใช้ Tag นี้ Deploy ต่อใน WS4.5–4.6
- ย้ำว่า **Tag** ตั้งชื่อแล้วย้อนกลับมาได้เสมอ — เป็นหลักการเดียวกับ rollback ใน WS8.2
- ถ้า Ruleset ป้องกัน tag ไว้ ให้ผู้สอนตรวจสิทธิ์ของผู้สร้าง Release

**ต่อไป →** [WS4.5 Deploy ด้วย Docker](ws-4.5-deploy-docker.md)
