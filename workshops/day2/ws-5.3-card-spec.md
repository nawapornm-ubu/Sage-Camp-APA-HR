# WS5.3 — Spec ของการ์ด + SELF_CHECK

| | |
|---|---|
| **ตำแหน่ง** | Day 2 · Session 5 |
| **เวลา** | 15 นาที (10:05–10:20) |
| **รูปแบบ** | รายบุคคล (เจ้าของโมดูล) |
| **สไลด์** | หน้า 195 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | `docs/specs/<การ์ด>.md` (สถานะ Draft) + `docs/handoff/<การ์ด>.md` รอบ 1 commit แล้ว |

> ทำใน repo `ubu-biolink` branch กลุ่มที่แตกจาก `instructor/revamp-workshop-base` — รายละเอียดเต็มอยู่ใน `docs/workshop/README.md` ของ repo นั้น

## 🎯 เป้าหมาย

ย่อ Design Doc ของกลุ่มเป็น spec ของการ์ดตัวเอง ที่ builder ทำตามได้โดยไม่ต้องเดา

## 📋 ต้องมีก่อนเริ่ม

- Design Doc ของกลุ่ม commit แล้ว (WS5.2)

## 👉 ขั้นตอน

### ขั้นที่ 1 — Kilo → agent `designer` → พิมพ์ `/design.md`

AI จะถาม กลุ่ม / โมดูล / เจ้าของ — ตอบเช่น "กลุ่ม 1 โมดูล B (academic-cv) เจ้าของ สมชาย"

### ขั้นที่ 2 — ตัดสินใจจุดที่ AI ถาม

สิทธิ์ · ลบแล้วเป็นอย่างไร · ซ้ำคืออะไร · ฟิลด์ที่ห้ามหลุดหน้า Public — **คุณเป็นคนเลือก**

### ขั้นที่ 3 — เปิด `docs/workshop/SELF_CHECK.md` ไล่ติ๊ก

ข้อที่ติ๊กไม่ได้ → กลับไปแก้ Design Doc / spec

### ขั้นที่ 4 — เขียน handoff รอบ 1 (design → build)

workflow สั่งให้ AI เขียนเป็นขั้นสุดท้ายอยู่แล้ว — อ่านทวนก่อน commit

### ขั้นที่ 5 — commit + push

```bash
git add docs/specs docs/handoff docs/workshop/designs
git commit -m "docs(spec): draft <การ์ด> (#N)"
git push -u origin feature/<การ์ด>
```

`#N` = เลข Issue ของการ์ด — GitHub จะโยง commit นี้เข้ากับการ์ดให้เอง

### ขั้นที่ 6 — คอมเมนต์ในการ์ด (Issue #N)

พิมพ์ path ของ spec เช่น `docs/specs/academic-cv.md — Draft รอ Design Gate` (ผู้สอนเปิดจากการ์ดได้ทันที)

## ✅ ต้องเห็น

- [ ] ไฟล์ spec สถานะ Draft และ handoff รอบ 1
- [ ] การ์ดมีคอมเมนต์ path ของ spec และเห็น commit ที่อ้าง `#N`
- [ ] ไม่เหลือ `❓ รอตัดสินใจ`
- [ ] `git status` ไม่มีไฟล์ใน `apps/`

## 🔧 ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
|---|---|
| designer ถูกบล็อกตอนแก้ `apps/` | ถูกต้อง — designer แก้ได้แค่เอกสาร |
| AI เดาแทนถาม | สั่ง "อย่าเดา ให้ใส่ ❓ แล้วถามฉัน" |

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- spec ใช้แม่แบบ `docs/specs/_template.md` 10 หัวข้อ (เป้าหมาย · ขอบเขต · ข้อมูล · API · หน้าจอ · สัญญา · seed · เกณฑ์เสร็จ · แผนเทสต์ · ความเสี่ยง)

**ต่อไป →** [WS5.4 Design Gate](ws-5.4-design-gate.md)
