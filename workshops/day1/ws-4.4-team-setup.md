# WS4.4 — จัดกลุ่มสำหรับวันที่ 2

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 4 (งานสุดท้ายของวัน) |
| **เวลา** | 15 นาที |
| **รูปแบบ** | กลุ่มของวันที่ 2 (ทั้งกลุ่มช่วยกันตัดสินใจ) |
| **สไลด์** | หน้า 165–166 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | ทุกคนรู้ว่าตัวเองอยู่กลุ่มไหน เป็นเจ้าของโมดูลอะไร และ `CONTRIBUTING.md` ของกลุ่ม merge แล้ว |

## 🎯 เป้าหมาย

ให้กลุ่มรู้ว่า **ระบบของกลุ่มคืออะไร · ใครเป็นเจ้าของโมดูลไหน · ตกลงทำงานร่วมกันอย่างไร** ก่อนเริ่มวันที่ 2 บน `ubu-biolink`

## 📋 กลุ่มและระบบของวันที่ 2 (4 กลุ่ม × 4 โมดูล)

| กลุ่ม | ระบบ | branch กลุ่ม | โมดูล A–D | โจทย์ใน ubu-biolink |
|---|---|---|---|---|
| 1 | Academic Portfolio | `feature/academic` | Research · Education & Experience · Credentials · Awards & Grants | `docs/workshop/group-1-academic.md` |
| 2 | Teaching Documents | `feature/teaching` | Courses · Materials · Class Schedule · Course Notices | `docs/workshop/group-2-teaching.md` |
| 3 | Services & Contact | `feature/services` | Contact Channels · Services · FAQ · Visitor Messages | `docs/workshop/group-3-services.md` |
| 4 | Activities & Community | `feature/community` | Talks & Services · Student Supervision · Photo Gallery · News & Events | `docs/workshop/group-4-community.md` |

ทุกโมดูลเป็น CRUD เต็มรูปแบบ (ตารางของตัวเอง + Dashboard + ส่วนบนหน้า Public) — ปริมาณงานเท่ากันทุกคน ไม่มีงานข้ามกลุ่ม

## 👉 ขั้นตอน

### ขั้นที่ 1 — ดูกลุ่มที่ผู้สอนประกาศ แล้วอ่านโจทย์กลุ่ม

เปิดไฟล์โจทย์ของกลุ่มใน `ubu-biolink` (ตารางด้านบน) อ่านสถานการณ์และโมดูล A–D — **ไม่มีเฉลย** พรุ่งนี้กลุ่มออกแบบเอง

### ขั้นที่ 2 — ตกลงบทบาท

| บทบาท | หน้าที่ในวันที่ 2 |
|---|---|
| **เจ้าของโมดูล A, B, C, D** (คนละ 1 โมดูล) | spec + handoff ของการ์ดตัวเอง · สร้างโมดูลตั้งแต่ migration → API → หน้าจอ → เทสต์ · เปิด PR เข้า branch กลุ่ม |
| **ผู้ประสานกลุ่ม** | เขียน Design Doc ของกลุ่ม (คนเดียว) · ดูแล branch กลุ่ม · รวม PR เข้า `main` ตามคิว · รวบรวมข้อเสนอเข้า Memory ลง `docs/memory/inbox/group-N.md` |

กลุ่ม 4 คน: ผู้ประสานถือโมดูลด้วย 1 โมดูล · กลุ่ม 5 คน: คนที่ 5 เป็นผู้ประสานและ QA

### ขั้นที่ 3 — เขียน Working Agreement 5 ข้อ ลง `CONTRIBUTING.md`

ทำใน repo ฝึกหัดของวันนี้ (สร้างกิ่ง `docs/team-setup`) ตัวอย่าง:

```markdown
## Working Agreement ของกลุ่ม <N> — <ชื่อระบบ>

| บทบาท | ชื่อ | GitHub |
|---|---|---|
| เจ้าของโมดูล A | | @ |
| เจ้าของโมดูล B | | @ |
| เจ้าของโมดูล C | | @ |
| เจ้าของโมดูล D | | @ |
| ผู้ประสานกลุ่ม | | @ |

1. ไม่ push ตรงเข้า main หรือ branch กลุ่ม — ทุกงานผ่าน PR
2. ทุก PR มีเพื่อนในกลุ่มรีวิว และมีคนอธิบายโค้ดได้
3. แก้เฉพาะไฟล์ของโมดูลตัวเอง — ต้องแก้ไฟล์ล็อกให้ถามผู้สอน
4. ติดเกิน 10 นาที ถามกลุ่มก่อน แล้วค่อยเรียก TA
5. ข้อความ commit ใช้รูปแบบ `type(scope): สรุป`
```

### ขั้นที่ 4 — Commit, Push และเปิด PR

```bash
git add CONTRIBUTING.md
git commit -m "docs: add day 2 group roles and working agreement"
git push -u origin docs/team-setup
gh pr create --base main --fill
```

ให้เพื่อน Review → Merge

### ขั้นที่ 5 — แจ้ง GitHub username ให้ผู้สอน

ส่ง username ของทุกคนพร้อมกลุ่มและโมดูล — ผู้สอนใช้เชิญเข้า `ubu-biolink` และใส่ใน `CODEOWNERS` (กลุ่มคู่รีวิว G1↔G2, G3↔G4)

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] ทุกคนรู้ว่าเป็นเจ้าของโมดูลไหน และใครเป็นผู้ประสาน
- [ ] `CONTRIBUTING.md` merge เข้า `main` ของ repo ฝึกหัดแล้ว
- [ ] ผู้สอนได้ username ของทั้งกลุ่มแล้ว

## 🔧 ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
|---|---|
| คนในกลุ่มไม่ครบ 4 | ผู้สอนรวมโมดูลให้คนเดียวถือ 2 โมดูล หรือย้าย D เป็น Extra |
| เถียงกันว่าใครถือโมดูลไหน | เลือกจากความสนใจก่อน ที่เหลือจับฉลาก — ทุกโมดูลงานเท่ากัน |

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- ประกาศกลุ่มก่อนเริ่มงานนี้ (จัดจากแบบสำรวจความคุ้นเคยให้ทักษะสมดุล)
- ผู้ประสานควรเป็นคนที่คล่อง Git ที่สุดในกลุ่ม — เป็นคนรวมงานเข้า `main` ตอน 15:30 ของวันที่ 2
- หลังได้ username: เชิญเข้า `ubu-biolink` และตรวจว่าเฉลย (`instructor/solution`, `instructor-only/`) ไม่อยู่ใน repo ที่ผู้เรียนเข้าถึง
- ปิดวันด้วยการทบทวน: Issue Template · Label · Board · CI · Ruleset · Release `v0.0.1` · Deploy — แล้วเกริ่นว่าพรุ่งนี้ AI จะเข้ามาทำงานภายใต้ฐานนี้

**ต่อไป →** Day 2 · [WS5.1 Kickoff: รันระบบ + ตรวจ agent](../day2/ws-5.1-kickoff.md)
