# WS7.1 — Vibecode รอบ 2: หน้าจอ + เทสต์ + PR

| | |
|---|---|
| **ตำแหน่ง** | Day 2 · Session 7 |
| **เวลา** | 90 นาที (13:00–14:30) |
| **รูปแบบ** | รายบุคคล (เจ้าของโมดูล) |
| **สไลด์** | หน้า 203–205 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | โมดูลถึง Core Done และเปิด PR `feature/<การ์ด>` → `feature/<กลุ่ม>` |

> ทำใน repo `ubu-biolink` branch กลุ่มที่แตกจาก `instructor/revamp-workshop-base` — รายละเอียดเต็มอยู่ใน `docs/workshop/README.md` ของ repo นั้น

## 🎯 เป้าหมาย

ทำหน้า Dashboard + ส่วนหน้า Public + เทสต์ จนผ่านเกณฑ์ Core Done

## 📋 ต้องมีก่อนเริ่ม

- API ของโมดูลใช้ได้ (WS6.1)

## 👉 ขั้นตอน

### ขั้นที่ 1 — อัปเดตงานของเพื่อน

```bash
git pull
npm run db:setup
```

มี migration ของเพื่อนในกลุ่ม

### ขั้นที่ 2 — builder → `/build.md` ชั้นหน้าจอ

แทนเนื้อหาไฟล์ stub ของตัวเอง: `apps/web/app/dashboard/<ชื่อ>/page.jsx`, `components/public/sections/<ชื่อ>.jsx`, `lib/features/<ชื่อ>.js` — **ไม่แก้ `lib/features.js`**

### ขั้นที่ 3 — เทสต์เพิ่ม

```bash
npm test
npm run build:web
```

public ต้องไม่เห็นรายการที่ซ่อน และไม่ส่งฟิลด์ภายใน

### ขั้นที่ 4 — ตรวจ Core Done

เพิ่ม / แก้ / ลบ / ซ่อน / จัดลำดับ ใน Dashboard · เห็นผลบน `/u/kamon.j` · ข้อมูลยังอยู่หลัง restart API

### ขั้นที่ 5 — handoff รอบ build → review แล้วเปิด PR

```bash
git commit -m "feat(<โมดูล>): dashboard + public section (#N)"
git push
gh pr create --base feature/<กลุ่ม> --fill
```

ใช้ PR template ที่ขึ้นเอง · ในคำอธิบายใส่ **`Part of #N`** (ยังไม่ปิดการ์ด — จะปิดตอน PR กลุ่มเข้า `main`) · ย้ายการ์ดบน Board ไป **In Review** · รอ Comment ของ AI Review bot

## ✅ ต้องเห็น

- [ ] ส่วนของโมดูลขึ้นบน `/u/kamon.j`
- [ ] `npm test` + `build:web` ผ่าน
- [ ] PR เปิดแล้วและมี Comment ของ Bot
- [ ] PR มี `Part of #N` และการ์ดอยู่ In Review

## 🔧 ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
|---|---|
| PR ไม่มี Comment ของ Bot | workflow ต้องอยู่ใน branch กลุ่มแล้ว — แจ้งผู้สอน |
| AI ลบ/ลดเทสต์ให้ผ่าน | Reject ทันที แล้วสั่งใหม่ |

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- เสร็จก่อน → ทำ Extra ที่เลือกไว้ (เปิด **Issue ใหม่** label `extra` แล้ววน Loop ของการ์ดอีกรอบ) หรือไปช่วยรีวิว

**ต่อไป →** [WS8.1 รีวิวโค้ด 3 ชั้น](ws-8.1-code-review.md)
