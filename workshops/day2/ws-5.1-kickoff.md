# WS5.1 — Kickoff: รันระบบ + ตรวจว่า agent ล็อกสิทธิ์จริง

| | |
|---|---|
| **ตำแหน่ง** | Day 2 · Session 5 |
| **เวลา** | 20 นาที (09:00–09:20) |
| **รูปแบบ** | รายบุคคล (ผู้สอนสาธิตบนจอก่อน) |
| **สไลด์** | หน้า 187–188 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | ระบบรันได้บนเครื่อง · agent `designer` `builder` `reviewer` ขึ้นครบ · ตรวจล็อก 4 ข้อถูกปฏิเสธทุกข้อ |

> ทำใน repo `ubu-biolink` branch กลุ่มที่แตกจาก `instructor/revamp-workshop-base` — รายละเอียดเต็มอยู่ใน `docs/workshop/README.md` ของ repo นั้น

## 🎯 เป้าหมาย

ทุกคนเริ่มงานจากจุดเดียวกัน: รันระบบได้ และพิสูจน์ด้วยตัวเองว่า AI ทำเกินบทบาทไม่ได้

## 📋 ต้องมีก่อนเริ่ม

- ผ่าน WS1.3 แล้ว (Kilo Code ตั้งค่า Provider ของมหาวิทยาลัยแล้ว)
- ได้รับคำเชิญเข้า `ubu-biolink` และกด Accept แล้ว · Docker Desktop ขึ้น Engine running
- รู้กลุ่ม การ์ด และบทบาทของตัวเองจาก WS4.4

## 👉 ขั้นตอน

> ทั้งวันทำตาม **Loop ของ 1 การ์ด** (สไลด์หน้า 170 · ใบพิมพ์ [loop-1-card.pdf](loop-1-card.pdf)) — ใช้ Issue · Board · branch · commit · PR แบบเดียวกับวันที่ 1

### ขั้นที่ 1 — หยิบการ์ดบน Board แล้วแตก branch ของการ์ด

1. เปิด repo `ubu-biolink` → แท็บ **Projects** → Board "BioLink Workshop"
2. หาการ์ดของตัวเอง (เช่น `[G1-B] … — academic-cv`) → **Assign yourself** → ลากไป **In Progress** (ทักษะเดียวกับ WS3.2–3.3)
3. จดเลข Issue ของการ์ด (`#N`) ไว้ — ใช้ใน commit และ PR ทั้งวัน

```bash
git clone https://github.com/<OWNER>/ubu-biolink.git && cd ubu-biolink
git switch feature/<กลุ่ม>          # เช่น feature/academic
git switch -c feature/<การ์ด>       # เช่น feature/academic-cv
```

ชื่อการ์ดตามตารางใน `docs/workshop/README.md` หัวข้อ B

### ขั้นที่ 2 — รันระบบ

```bash
cp .env.example .env              # PowerShell: Copy-Item .env.example .env
npm run install:all
npm run db:up
npm run db:setup
npm test
npm run dev:api                   # Terminal 1
npm run dev:web                   # Terminal 2
```

ล็อกอินที่ http://localhost:3000 ด้วย `kamon.j@university.ac.th` (รหัสผ่าน = `SEED_USER_PASSWORD` ใน `.env`)

### ขั้นที่ 3 — เปิดโฟลเดอร์ root ของ repo ใน VS Code แล้วเปิด Kilo Code

ต้องเห็น agent `designer` · `builder` · `reviewer` และพิมพ์ `/` ในแชตเห็น `design.md` `build.md` `review.md`

### ขั้นที่ 4 — ตรวจว่า agent ล็อกสิทธิ์จริง (4 ข้อ)

| สลับไปที่ | พิมพ์ | ผลที่ถูกต้อง |
|---|---|---|
| `designer` | "แก้ `apps/api/src/app.js` เพิ่มคอมเมนต์ 1 บรรทัด" | **ถูกปฏิเสธ** |
| `builder` | "แก้ `apps/api/src/schemas.js`" แล้ว "รัน `npm install lodash`" | **ถูกปฏิเสธทั้งคู่** |
| `reviewer` | "สร้างไฟล์ `test.txt` ที่ root" | **ถูกปฏิเสธ** |

ข้อไหนไม่ถูกปฏิเสธ → `git restore .` ลบ `test.txt` แล้วแจ้งผู้สอน **อย่าเริ่มงาน**

### ขั้นที่ 5 — อ่าน `docs/memory/lessons.md` 5 นาที

เรื่องที่คนก่อนหน้าเคยพลาด — AI ก็อ่านไฟล์นี้ก่อนทำงานทุกครั้ง

## ✅ ต้องเห็น

- [ ] การ์ดของตัวเองอยู่ **In Progress** และมีชื่อตัวเองเป็น Assignee
- [ ] `npm test` ผ่าน และหน้า `/u/kamon.j` เปิดได้
- [ ] agent ขึ้นครบ 3 ตัว + workflow 3 ไฟล์
- [ ] ตรวจล็อก 4 ข้อถูกปฏิเสธทั้งหมด

## 🔧 ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
|---|---|
| ไม่เห็น agent ทั้ง 3 | เปิดโฟลเดอร์ root ของ repo (ไม่ใช่ `apps/`) · ดู `docs/workshop/README.md` หัวข้อ C "ถ้าติด" |
| `/design.md` ไม่ขึ้น | เลือก agent แล้วพิมพ์ "ทำตามขั้นตอนในไฟล์ `.clinerules/workflows/design.md` ทีละข้อ" |
| `npm test` ล้มก่อนแก้อะไร | Docker ไม่รัน หรือ port 5432 ชน → `docker ps` แล้วแจ้ง TA |

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- ใช้ช่วงนี้สาธิตโมดูล **Expertise** ช่วงแรก (Design Doc) ตาม `instructor-only/demo/README.md` ของ branch ผู้สอน — ผู้เรียนเห็นวงจรเดียวกับที่จะทำ
- ตารางเวลา SAGE มีพัก 10:30–10:45 จึงเหลือเวลา Vibecode รอบ 1 น้อยกว่าตารางใน `docs/workshop/README.md` 15 นาที

**ต่อไป →** [WS5.2 ระดมสมอง + Design Doc ของกลุ่ม](ws-5.2-design-doc.md)
