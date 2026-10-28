# WS4.2 — Dependabot และ Security scanning

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 4 |
| **เวลา** | 10 นาที |
| **รูปแบบ** | ทีม (Module Lead ตั้งค่า คนอื่นดูแท็บ Security) |
| **สไลด์** | หน้า 148–150 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | repo มีไฟล์ `dependabot.yml` และเปิดตัวช่วยความปลอดภัยเท่าที่แพ็กเกจรองรับ |

## 🎯 เป้าหมาย

เปิด "ผู้เฝ้า repo ตลอดเวลา" 3 ตัว: **Dependabot** (library ล้าสมัย/มีช่องโหว่) · **Secret scanning** (key ที่หลุด) · **Code scanning** (ช่องโหว่ในโค้ด)

## 👉 ขั้นตอน

### ขั้นที่ 1 — เพิ่มไฟล์ `dependabot.yml`

สร้างกิ่ง `chore/dependabot` แล้วเพิ่ม **`.github/dependabot.yml`**:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

```bash
git switch -c chore/dependabot
git add .github/dependabot.yml
git commit -m "chore: enable dependabot for npm and actions"
git push -u origin chore/dependabot
gh pr create --base main --fill
```

ให้เพื่อน Review → CI เขียว → Merge

💡 Dependabot จะเปิด **PR อัปเดต library ให้เอง** ตามรอบที่ตั้ง — PR เหล่านั้นก็ต้องผ่าน CI และการ Review เหมือน PR อื่น

### ขั้นที่ 2 — เปิดฟีเจอร์ความปลอดภัยของ repo

Settings → **Code security** (บางเวอร์ชันชื่อ *Advanced Security*) แล้วเปิดตามรายการที่ปรากฏ:

| ฟีเจอร์ | ทำอะไร |
|---|---|
| **Dependency graph** | แผนผัง library ที่ใช้ |
| **Dependabot alerts** | แจ้งเมื่อ library มีช่องโหว่ |
| **Dependabot security updates** | เปิด PR แก้ช่องโหว่ให้ |
| **Secret scanning** | ตรวจ key / token ที่หลุดใน repo |
| **Push protection** | ดักตอน push ถ้าเจอรูปแบบ token |
| **Code scanning (CodeQL)** | วิเคราะห์โค้ดหาช่องโหว่ — ตั้งค่า "Default setup" |

> ถ้าตัวเลือกใดเป็นสีเทาหรือมีป้ายแพ็กเกจเสริม แปลว่า repo/Org ของคุณยังไม่รองรับ — **จดไว้แล้วข้ามได้** เป้าหมายคือรู้ว่ามีเครื่องมือเหล่านี้

### ขั้นที่ 3 — ดูแท็บ Security

เปิดแท็บ **Security** ของ repo → ดูรายการ **Dependabot**, **Secret scanning**, **Code scanning**

✅ **ต้องเห็น:** แท็บ Security แสดงสถานะของฟีเจอร์ที่เปิดแล้ว (อาจยังไม่มีรายการแจ้งเตือน)

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] `.github/dependabot.yml` อยู่ใน `main`
- [ ] ระบุได้ว่าฟีเจอร์ไหนเปิดใช้ได้ ฟีเจอร์ไหนแพ็กเกจไม่รองรับ
- [ ] อธิบายเพื่อนได้ว่า Dependabot PR ต่างจาก PR ของคนอย่างไร (เปิดโดยบอท แต่ต้อง Review เหมือนกัน)

## 🧪 ท้าทายเพิ่ม

- เปลี่ยน interval เป็น `daily` และเพิ่ม `groups:` เพื่อรวม PR ของ library ที่เกี่ยวข้อง
- ลองถามว่า "ถ้า Dependabot เปิด PR อัปเดต major version จะ merge เลยไหม?" — คำตอบควรเป็น **ไม่** จนกว่า CI ผ่านและมีคนอ่าน Release notes ของ library

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- Workshop นี้สั้นมาก — ทำให้เสร็จใน 10 นาทีโดยสาธิตบนจอ แล้วให้ทีมทำเฉพาะไฟล์ `dependabot.yml`
- ตรวจแพ็กเกจก่อนสอน: repo สาธารณะส่วนใหญ่ใช้ฟีเจอร์เหล่านี้ได้ฟรี ส่วน repo private บางฟีเจอร์ต้องใช้แพ็กเกจเสริม อย่ารับปากเกินจริง
- เชื่อมไป Day 2: **Secret scanning/Push protection** เป็นรั้วเสริมของกติกา "ความลับไม่เข้า repo" (ดู WS2.3)

**ต่อไป →** [WS4.3 Release v0.0.1](ws-4.3-release-v0.0.1.md)
