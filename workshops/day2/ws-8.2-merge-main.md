# WS8.2 — รวมเข้า main + Memory inbox

| | |
|---|---|
| **ตำแหน่ง** | Day 2 · Session 8 |
| **เวลา** | 30 นาที (15:30–16:00) |
| **รูปแบบ** | ผู้ประสานกลุ่ม (สมาชิกช่วยตรวจ) |
| **สไลด์** | หน้า 215–216 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | งานทั้ง 4 กลุ่มอยู่ใน `main` · CI เขียว · inbox ของทุกกลุ่มอยู่ใน `main` |

> ทำใน repo `ubu-biolink` branch กลุ่มที่แตกจาก `instructor/revamp-workshop-base` — รายละเอียดเต็มอยู่ใน `docs/workshop/README.md` ของ repo นั้น

## 🎯 เป้าหมาย

รวมงานทีละกลุ่มอย่างปลอดภัย และส่งบทเรียนของวันเข้า Memory hub โดยไม่แก้ไฟล์ memory ชนกัน

## 📋 ต้องมีก่อนเริ่ม

- PR ของโมดูลรีวิวผ่าน (WS8.1)

## 👉 ขั้นตอน

### ขั้นที่ 1 — เจ้าของโมดูล merge PR เข้า branch กลุ่ม

Squash and merge

### ขั้นที่ 2 — ผู้ประสานรวมข้อเสนอเข้า Memory

จากหัวข้อ "ข้อเสนอเข้า Memory" ใน handoff ทั้ง 4 ไฟล์ → `docs/memory/inbox/group-N.md` (ตามรูปแบบใน `docs/memory/README.md`)

### ขั้นที่ 3 — ผู้ประสานเปิด PR branch กลุ่ม → main

```bash
gh pr create --base main --head feature/<กลุ่ม> --fill
```

ในคำอธิบาย PR ใส่ `Closes #…` **ทีละบรรทัดครบทุกการ์ดของกลุ่ม** (การ์ด Design Doc + 4 โมดูล + Extra) — เมื่อ merge แล้ว GitHub ปิด Issue และย้ายการ์ดไป **Done** ให้เอง (แบบ WS3.3)

### ขั้นที่ 4 — merge ตามคิว G1 → G2 → G3 → G4

เมื่อ CI `CI / api` และ `CI / web` เขียว — อย่า merge พร้อมกัน

### ขั้นที่ 5 — กลุ่มที่เหลืออัปเดตหลังแต่ละกลุ่ม merge

```bash
git switch feature/<กลุ่ม>
git pull origin main
npm run db:setup && npm test
```

## ✅ ต้องเห็น

- [ ] `main` มีงานของทั้ง 4 กลุ่ม
- [ ] CI บน `main` เขียว
- [ ] มี `docs/memory/inbox/group-N.md` ครบ 4 กลุ่ม
- [ ] Board: การ์ดของกลุ่มอยู่ **Done** ครบ (Milestone "BioLink Workshop" ใกล้ 100%)

## 🔧 ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
|---|---|
| CI ล้มหลัง merge | กลุ่มที่เพิ่ง merge แก้ก่อน คิวถัดไปรอ |

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- หลังรวมเข้า main ผู้สอนตรวจ inbox แล้วย้ายรายการที่ใช้ได้เข้า `lessons` / `decisions` / `conventions` / `glossary`

**ต่อไป →** [WS8.3 Demo บนหน้าเดียว](ws-8.3-demo.md)
