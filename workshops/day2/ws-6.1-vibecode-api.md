# WS6.1 — Vibecode รอบ 1: DB + API

| | |
|---|---|
| **ตำแหน่ง** | Day 2 · Session 6 |
| **เวลา** | 75 นาที (10:45–12:00) |
| **รูปแบบ** | รายบุคคล (เจ้าของโมดูล) |
| **สไลด์** | หน้า 199–202 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | API ของโมดูลเรียกด้วย curl ได้ + เทสต์ชั้น API ผ่าน + handoff ก่อนพักเที่ยง |

> ทำใน repo `ubu-biolink` branch กลุ่มที่แตกจาก `instructor/revamp-workshop-base` — รายละเอียดเต็มอยู่ใน `docs/workshop/README.md` ของ repo นั้น

## 🎯 เป้าหมาย

ให้ builder สร้างชั้นข้อมูลและ API ตาม spec ทีละชั้น โดยคนอ่าน diff และรันคำสั่งเองทุกครั้ง

## 📋 ต้องมีก่อนเริ่ม

- spec ของการ์ดเป็น Approved (WS5.4)
- ถ้าเป็นโมดูลที่อ้างตารางต้นน้ำในกลุ่ม: รอเจ้าของต้นน้ำ push migration + seed ใน 20 นาทีแรก แล้ว `git pull` + `npm run db:setup`

## 👉 ขั้นตอน

### ขั้นที่ 1 — Kilo → agent `builder` → พิมพ์ `/build.md` แล้วบอกชื่อการ์ด

builder อ่าน spec เอง — ถ้ายังเป็น Draft ต้องหยุด

### ขั้นที่ 2 — migration ในเลขที่จองไว้

```bash
npm run db:setup
npm run db:setup   # รันซ้ำต้องไม่พัง
```

ห้ามแก้ migration `001`–`004` หรือของคนอื่น

### ขั้นที่ 3 — repository + routes ใน `apps/api/src/features/<กลุ่ม>/<โมดูล>.js`

`user_id` ใน `WHERE` ทุกคำสั่งแก้/ลบ · userId จาก `req.user.id` · parameterized query

### ขั้นที่ 4 — เทสต์ `apps/api/test/<โมดูล>.test.js`

```bash
npm test
```

CRUD · แก้/ลบของคนอื่นได้ 404 · ข้อมูลผิด 400 · ไม่ล็อกอิน 401

### ขั้นที่ 5 — ทดสอบเองด้วย curl ตาม spec แล้วอ่าน diff

```bash
curl -c cj.txt -H "Content-Type: application/json" -d "{\"email\":\"kamon.j@university.ac.th\",\"password\":\"<รหัสของคุณ>\"}" localhost:4000/api/auth/login
curl -b cj.txt localhost:4000/api/<กลุ่ม>/<โมดูล>
git status
git diff
```

`git status` ต้องมีเฉพาะไฟล์ของโมดูล

### ขั้นที่ 6 — ก่อนพักเที่ยง: handoff รอบ build แล้ว commit + push

```bash
git add apps/api docs/handoff        # เฉพาะไฟล์ของโมดูล — ห้าม git add .
git commit -m "feat(<โมดูล>): add table and API (#N)"
git push
```

commit เล็ก ๆ หลายครั้งได้ — ทุกข้อความลงท้าย `(#N)` แล้วจะเห็นเรียงในการ์ดบน GitHub (แบบ WS1.2)

## ✅ ต้องเห็น

- [ ] curl ได้ทุก endpoint ตาม spec
- [ ] `npm test` ผ่าน
- [ ] `git status` มีเฉพาะไฟล์ของโมดูล
- [ ] เปิดการ์ด #N บน GitHub เห็น commit ที่อ้าง `(#N)`

## 🔧 ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
|---|---|
| builder ปฏิเสธการแก้ไฟล์ | ตั้งใจ — ห้ามให้ AI หาทางอ้อม (เช่นเขียนผ่าน shell) ให้ถามผู้สอน |
| error เดิมซ้ำ 3 รอบ | หยุด วาง error + ไฟล์ที่เกี่ยวข้อง ให้ AI อธิบายสาเหตุก่อนแก้ต่อ |

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- ผู้สอนสาธิต Expertise ช่วงที่ 2 (Prompt → Build) ตาม `instructor-only/demo/` ของ branch ผู้สอน

**ต่อไป →** [WS7.1 Vibecode รอบ 2: หน้าจอ + เทสต์ + PR](ws-7.1-vibecode-ui-tests.md)
