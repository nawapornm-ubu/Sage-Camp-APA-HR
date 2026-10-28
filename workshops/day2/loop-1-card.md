# Loop ของ 1 การ์ด — ทำตามนี้ทั้งวัน (Day 2)

> ใบนี้พิมพ์ได้ (A4) ที่ [loop-1-card.pdf](loop-1-card.pdf) · สไลด์หน้า 170 (UBU SAGE Camp v2)
> **1 การ์ด = 1 Issue = 1 branch = 1 spec = 1 PR** — ใช้ทุกอย่างจากวันที่ 1: Issue · Board · branch · commit · PR · CI · Review

แทน `<g>` = ชื่อกลุ่ม (`academic` `teaching` `services` `community`) · `<card>` = ชื่อการ์ด เช่น `academic-cv` · `#N` = เลข Issue ของการ์ด

| # | ขั้น | ทำอะไร / คำสั่ง | ต้องเห็น | Board | ทักษะจาก |
|---|---|---|---|---|---|
| **S5** | | **09:00–10:30 · ออกแบบ** | | | |
| 1 | หยิบการ์ด | เปิด Project Board → การ์ดของตัวเอง → **Assign yourself** | ชื่อตัวเองบนการ์ด | Todo → **In Progress** | WS3.2–3.3 |
| 2 | แตก branch | `git switch feature/<g>` · `git pull` · `git switch -c feature/<card>` | `git branch` มี `* feature/<card>` | | WS1.2 |
| 3 | รันระบบ | `npm run db:up` · `npm run db:setup` · `npm test` · `npm run dev:api` · `npm run dev:web` | หน้า `/u/kamon.j` เปิดได้ | | WS4.5 |
| 4 | ออกแบบ | Kilo → `designer` → `/design.md` → spec Draft + handoff รอบ 1 · คอมเมนต์ path ของ spec ในการ์ด | `docs/specs/<card>.md` สถานะ Draft | | WS1.3 |
| 5 | Design Gate | ยกมือให้ผู้สอนตรวจ Design Doc + spec | spec เป็น **Approved** | | ใหม่วันนี้ |
| **S6** | | **10:45–12:00 · DB + API** | | | |
| 6 | Build DB + API | `builder` → `/build.md` · `npm run db:setup` (รัน 2 รอบไม่พัง) · `npm test` · ทดสอบด้วย `curl` | curl ได้ทุก endpoint · เทสต์ผ่าน | | WS3.3 |
| 7 | Commit + push | `git status` (เฉพาะไฟล์โมดูล) · `git add <ไฟล์>` · `git commit -m "feat(<โมดูล>): ... (#N)"` · `git push -u origin feature/<card>` | commit โผล่ในการ์ด #N | | WS1.2 |
| **S7** | | **13:00–14:30 · หน้าจอ + PR** | | | |
| 8 | หน้าจอ + เทสต์ | `git pull` · `builder` ชั้นหน้าจอ · `npm test` · `npm run build:web` | Core Done ครบ 5 ข้อในการ์ด | | WS3.3 |
| 9 | Pull Request | `gh pr create --base feature/<g> --fill` · คำอธิบายใส่ `Part of #N` | PR มีคอมเมนต์ของ AI Review bot | → **In Review** | WS2.1 |
| **S8** | | **14:45–16:30 · รีวิว + merge** | | | |
| 10 | รีวิว 3 ชั้น | เพื่อนในกลุ่ม → กลุ่มคู่ → `reviewer` `/review.md` · แก้ 🔴 ให้หมด | Approve + CI `api` `web` เขียว | | WS2.1 · 4.1 |
| 11 | Merge | เจ้าของโมดูล **Squash and merge** เข้า `feature/<g>` · ผู้ประสานเปิด PR `feature/<g>` → `main` ใส่ `Closes #…` ของทุกการ์ด | PR กลุ่ม merge ตามคิว G1→G4 | | WS2.1–2.2 |
| 12 | Done | ไม่ต้องทำอะไร — GitHub ปิด Issue เองเมื่อ PR กลุ่ม merge | การ์ด **Closed** | → **Done** | WS3.3 |
| ↺ | การ์ดถัดไป | เสร็จก่อนเวลา → `git switch feature/<g> && git pull` → เปิด **Issue ใหม่** (label `extra`) แล้ววนกลับขั้น 1 | | Todo | |

## ห้าม (จำจากวันที่ 1)

- ห้าม push เข้า `main` หรือ branch กลุ่มตรง ๆ — ทุกอย่างผ่าน PR
- ห้ามแก้ไฟล์ที่ล็อก (`lib/features.js`, `schemas.js`, `api-spec.md`) และ migration ของคนอื่น
- ห้ามรับโค้ด AI โดยไม่อ่าน `git diff` · ห้ามให้ AI ลบ/ลดเทสต์เพื่อให้ผ่าน
