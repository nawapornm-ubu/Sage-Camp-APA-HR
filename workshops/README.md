# Workshop Pack — Team-based AI Development (28–29 ต.ค. 2569)

ชุดเอกสาร Workshop ย่อยของหลักสูตร 2 วัน แยกเป็นไฟล์ละ 1 งาน ใช้คู่กับ
[สไลด์สอน](https://github.com/class-nithirun/Team-based-AI-Development/blob/main/slides/Team-based_AI_Development_Slides.pptx) และ
[คู่มือผู้สอน](https://github.com/class-nithirun/Team-based-AI-Development/blob/main/guide/Instructor_Guide_Team-based_AI_Development.docx)

> ผู้เรียนเปิดไฟล์ Workshop ของงานที่กำลังทำ — ผู้สอน/TA อ่านหัวข้อ **🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA** ท้ายไฟล์เพิ่ม
> (ถ้าจะแจกผู้เรียน ให้ตัดหัวข้อนั้นออกได้)

## วิธีใช้

1. ผู้สอนทำตาม [00-instructor-prep.md](00-instructor-prep.md) **ก่อนวันอบรมอย่างน้อย 3 วัน**
2. ในห้อง ผู้สอนฉายสไลด์ (ทฤษฎีสั้น ๆ) แล้วบอกผู้เรียนให้เปิดไฟล์ Workshop ที่ตรงกับหน้าสไลด์
3. สไลด์ Workshop แต่ละหน้าสรุปขั้นตอนระดับสูง — **รายละเอียดคำสั่งและวิธีแก้ปัญหาอยู่ในไฟล์เหล่านี้**

## ตัวแปรที่ใช้ในเอกสาร

| ตัวแปร | ความหมาย | ค่า |
|---|---|---|
| `<TEMPLATE>` | Repo แม่แบบของ Day 1 (กด Use this template) | `NcKitt/sage_camp` (ผู้สอนแจ้ง) |
| `<OWNER>` | GitHub username ของ **Module Lead** = เจ้าของ repo ทีม | เช่น `somchai` |
| `<REPO>` (Day 1) | Repo ฝึกหัดของทีม (Module Lead สร้างใน WS1.2) | `dms-practice-team<N>` |
| `<INSTRUCTOR>` | GitHub username ของผู้สอน — เชิญเป็น Collaborator ทุก repo ทีม | ผู้สอนแจ้ง |
| `ubu-biolink` (Day 2) | Repo ระบบ BioLink ที่ทุกกลุ่มร่วมพัฒนา (private — เจ้าของเชิญผู้เรียนเป็น Collaborator) | branch `instructor/revamp-workshop-base` → branch กลุ่ม `feature/<กลุ่ม>` |
| `<กลุ่ม>` / `<การ์ด>` (Day 2) | ชื่อกลุ่มและการ์ดตาม `docs/workshop/README.md` หัวข้อ B ของ ubu-biolink | `academic` / `academic-cv` |
| `<ชื่อ>` | ชื่อเล่น/username ตัวพิมพ์เล็กของคุณ ใช้ต่อท้ายชื่อกิ่ง | เช่น `somchai` |
| `<N>` | เลข Issue | เช่น `12` |
| `<BASE_URL>` `<API_KEY>` `<MODEL_ID>` | ค่า AI ของมหาวิทยาลัย | ผู้สอนแจกในห้อง — **ห้ามบันทึกลงไฟล์** |

## สัญลักษณ์

| สัญลักษณ์ | ความหมาย |
|---|---|
| 🎯 | เป้าหมายของขั้นนี้ |
| 💡 | เหตุผล — อ่านเพื่ออธิบายเพื่อนได้ |
| 👉 | ลงมือทำตามลำดับ ห้ามข้าม |
| ✅ | ผลที่ต้องเห็น ถ้าเห็นแล้วไปขั้นถัดไป |
| 🔧 | ถ้าไม่เป็นแบบนี้ ให้แก้ตามนี้ |
| 🧪 | ท้าทายเพิ่ม (ถ้าเสร็จก่อน) |

## สมมติฐานเรื่อง Repository

- **Day 1** แต่ละทีม (4–6 คน จัดจากแบบสำรวจ) ใช้ **repo ฝึกหัดของทีมเอง** `dms-practice-team<N>` — **Module Lead เป็นคนสร้าง**
  จาก Template (`Use this template`) ใต้บัญชีของตัวเองแบบ Public แล้วเชิญเพื่อนเป็น Collaborator (สิทธิ์ Write) + เชิญผู้สอน
  Module Lead จึงเป็นเจ้าของ repo จริง: ตั้ง Ruleset / CI / Release และอนุมัติ PR ส่วนเพื่อนฝึกเปิด PR และรีวิว
  (ไม่ใช้ Fork เพราะ PR ของ repo ที่ fork จะชี้กลับไป repo ผู้สอน และ Issues/Actions ปิดไว้ — ดูเหตุผลใน WS1.2)
- **Day 2** ทุกกลุ่มทำงานใน **`ubu-biolink`** repo เดียว (branch `instructor/revamp-workshop-base`) — **4 กลุ่ม × 4 โมดูล** ระบบละกลุ่ม ไม่ทับกัน
  repo มีชุดไฟล์ AI ครบแล้ว (`AGENTS.md`, `.kilo/agents/` designer·builder·reviewer, `.clinerules/workflows/`, `docs/memory/` + inbox, `docs/specs/`, `docs/handoff/`, AI Review bot)
  คู่มือของวันอยู่ที่ `docs/workshop/README.md` ใน repo นั้น — ไฟล์ WS วันที่ 2 ในโฟลเดอร์นี้เป็นฉบับย่อที่ผูกกับตารางเวลา SAGE
- ถ้าเลือกใช้ repo เดียวทั้งห้องตั้งแต่ Day 1 ปรับได้ แต่ WS2.3 และ WS4.1 (ต้องใช้สิทธิ์ Admin) ต้องทำเป็นการสาธิตโดยผู้สอน

## ตารางรวม Workshop (24 งาน: วันที่ 1 = 15 · วันที่ 2 = 9)

### Day 1 — รากฐานการทำงานเป็นทีมบน GitHub

| Session | ID | งาน | เวลา | สไลด์ | ไฟล์ |
|---|---|---|---|---|---|
| S1 (09:00–10:30) | WS1.1 | ตรวจและติดตั้งเครื่องมือ | 25′ | หน้า 17–20 | [ws-1.1-setup-tools.md](day1/ws-1.1-setup-tools.md) |
| | WS1.2 | สร้าง repo ทีม + Commit แรก | 25′ | หน้า 21–34 | [ws-1.2-first-commit.md](day1/ws-1.2-first-commit.md) |
| | WS1.3 | ตั้งค่า AI Agent (Cline + Kilo) และ API Key | 20′ | หน้า 37 | [ws-1.3-setup-ai-agent.md](day1/ws-1.3-setup-ai-agent.md) |
| S2 (10:45–12:00) | WS2.1 | GitHub Flow รอบแรก: PR + Review | 25′ | หน้า 49–67 | [ws-2.1-pr-review.md](day1/ws-2.1-pr-review.md) |
| | WS2.2 | จำลอง Merge Conflict และแก้ร่วมกัน | 20′ | หน้า 70–77 | [ws-2.2-merge-conflict.md](day1/ws-2.2-merge-conflict.md) |
| | WS2.3 | ตั้ง Ruleset, CODEOWNERS และกันความลับ | 20′ | หน้า 81–90 | [ws-2.3-repo-rules-secrets.md](day1/ws-2.3-repo-rules-secrets.md) |
| S3 (13:00–14:30) | WS3.1 | Issue Template และ Label ของทีม | 15′ | หน้า 102–108 | [ws-3.1-issue-templates-labels.md](day1/ws-3.1-issue-templates-labels.md) |
| | WS3.2 | สร้าง Kanban Board ของทีม | 15′ | หน้า 109–115 | [ws-3.2-kanban-board.md](day1/ws-3.2-kanban-board.md) |
| | WS3.3 | Sprint: 8 ฟีเจอร์ = 8 Feature Branch (ทำด้วย AI) | 45′ | หน้า 120–129 | [ws-3.3-sprint-planning.md](day1/ws-3.3-sprint-planning.md) |
| S4 (14:45–16:00) | WS4.1 | สร้าง CI และตั้ง Required Check | 20′ | หน้า 140–147 | [ws-4.1-ci-required-check.md](day1/ws-4.1-ci-required-check.md) |
| | WS4.2 | Dependabot และ Security scanning | 10′ | หน้า 148–150 | [ws-4.2-dependabot-security.md](day1/ws-4.2-dependabot-security.md) |
| | WS4.3 | Release v0.0.1 | 15′ | หน้า 151–157 | [ws-4.3-release-v0.0.1.md](day1/ws-4.3-release-v0.0.1.md) |
| | WS4.5 | Deploy ด้วย Docker | 20′ | หน้า 160–161 | [ws-4.5-deploy-docker.md](day1/ws-4.5-deploy-docker.md) |
| | WS4.6 | Deploy ด้วย PM2 | 20′ | หน้า 162–163 | [ws-4.6-deploy-pm2.md](day1/ws-4.6-deploy-pm2.md) |
| | WS4.4 | จัดทีมและเขียน Working Agreement (งานสุดท้ายของวัน) | 15′ | หน้า 166 | [ws-4.4-team-setup.md](day1/ws-4.4-team-setup.md) |

> ลำดับใน Session 4: WS4.1 → 4.2 → 4.3 → **4.5 → 4.6** → 4.4 — แอปที่ใช้ Deploy คือ [`practice-app/`](../README.md)
> ฟีเจอร์ A–H ของ practice-app: ภาพรวม การเตรียม และแผนซ้อมของทีมผู้สอนอยู่ที่ [day1/features-backlog.md](day1/features-backlog.md) · การ์ด [day1/feature-cards/](day1/feature-cards/) · เฉลย TA [day1/solutions/](day1/solutions/README.md)

### Day 2 — Multi-agent Vibe Coding บน UBU BioLink (4 กลุ่ม × 4 โมดูล)

> **ทั้งวันทำตาม Loop ของ 1 การ์ด** (สไลด์หน้า 170 · [loop-1-card.md](day2/loop-1-card.md) · ใบพิมพ์ A4 [loop-1-card.pdf](day2/loop-1-card.pdf)) — 1 การ์ด = 1 Issue = 1 branch = 1 spec = 1 PR
> การ์ด 20 ใบ (4 Design Doc + 16 โมดูล) อยู่ที่ [day2/cards/](day2/cards/) · ผู้สอนสร้างเป็น Issue + Board ด้วย `scripts/seed-day2-cards.sh` (ดู [00-instructor-prep.md](00-instructor-prep.md) หัวข้อ C)

| Session | ID | งาน | เวลา | สไลด์ | ไฟล์ |
|---|---|---|---|---|---|
| S5 (09:00–10:30) | WS5.1 | Kickoff: รันระบบ + ตรวจว่า agent ล็อกสิทธิ์จริง | 20′ | หน้า 187–188 | [ws-5.1-kickoff.md](day2/ws-5.1-kickoff.md) |
| | WS5.2 | ระดมสมอง + Design Doc ของกลุ่ม | 45′ | หน้า 189–194 | [ws-5.2-design-doc.md](day2/ws-5.2-design-doc.md) |
| | WS5.3 | Spec ของการ์ด + SELF_CHECK | 15′ | หน้า 195 | [ws-5.3-card-spec.md](day2/ws-5.3-card-spec.md) |
| | WS5.4 | Design Gate | 10′ | หน้า 192, 196 | [ws-5.4-design-gate.md](day2/ws-5.4-design-gate.md) |
| S6 (10:45–12:00) | WS6.1 | Vibecode รอบ 1: DB + API | 75′ | หน้า 199–202 | [ws-6.1-vibecode-api.md](day2/ws-6.1-vibecode-api.md) |
| S7 (13:00–14:30) | WS7.1 | Vibecode รอบ 2: หน้าจอ + เทสต์ + PR | 90′ | หน้า 203–205 | [ws-7.1-vibecode-ui-tests.md](day2/ws-7.1-vibecode-ui-tests.md) |
| S8 (14:45–16:30) | WS8.1 | รีวิวโค้ด 3 ชั้น | 45′ | หน้า 206–214 | [ws-8.1-code-review.md](day2/ws-8.1-code-review.md) |
| | WS8.2 | รวมเข้า main + Memory inbox | 30′ | หน้า 215–216 | [ws-8.2-merge-main.md](day2/ws-8.2-merge-main.md) |
| | WS8.3 | Demo บนหน้าเดียว | 30′ | หน้า 217 | [ws-8.3-demo.md](day2/ws-8.3-demo.md) |

> ตารางนี้คือตาราง "Workshop 1 วัน" ใน `docs/workshop/README.md` ของ ubu-biolink ที่ใส่ช่วงพักตามกำหนดการ SAGE (10:30–10:45 และ 14:30–14:45)
> จึงเหลือเวลา Vibecode รอบ 1 และรีวิวน้อยกว่าตารางใน repo ช่วงละ 15 นาที · สไลด์ REA, Release/Deploy ของวันที่ 2 ถูกซ่อนไว้ท้ายชุด (ไม่อยู่ใน flow ของ branch)

## สัดส่วนเวลาแต่ละ Session (ทฤษฎี : Workshop)

| Session | ทฤษฎี | Workshop | Buffer / Checkpoint |
|---|---|---|---|
| S1 | 15′ (Git 10′ + AI Agent/API Key 5′ — เปิดหลักสูตรอยู่ช่วง 08:45–09:00) | 70′ (WS1.1 25′ + WS1.2 25′ + WS1.3 20′) | 5′ |
| S2 | 15′ | 65′ (25′ + 20′ + 20′) → ลดสาธิต WS2.3 เหลือ 15′ ได้ | — |
| S3 | 15′ | 75′ (WS3.1 15′ + WS3.2 15′ + WS3.3 45′) | — (Template/Label/Board เตรียมไว้ก่อน ผู้เรียนแค่ตรวจและปรับ) |
| S4 | 10′ | 95′ (WS4.1 20′ + WS4.2 สาธิต 5′ + WS4.3 15′ + WS4.5 20′ + WS4.6 20′ + WS4.4 15′) | — (ตามกำหนดการ SAGE 14:45–16:30 = 105′) |
| S5 | สอนแทรกใน Kickoff/ออกแบบ (ReAct · Multi-agent · Memory hub · Spec/Handoff ~15′) | 90′ (WS5.1 20′ + 5.2 45′ + 5.3 15′ + 5.4 10′) | Design Gate คือ checkpoint |
| S6 | 5′ (builder: อ่าน diff ก่อน Save) | 70′ (WS6.1) | handoff ก่อนพักเที่ยง |
| S7 | — | 90′ (WS7.1) | — |
| S8 | ~10′ (รีวิว · AI bot · ความปลอดภัย — สอนก่อน WS8.1) | 105′ (WS8.1 45′ + 8.2 30′ + 8.3 30′) | Q&A + วุฒิบัตรหลัง Demo |

> เวลาของแต่ละ Workshop รวมเวลาที่ผู้สอนอธิบายสั้น ๆ ก่อนเริ่ม ถ้าเวลาไม่พอ ดูแผนตัดงานใน **คู่มือผู้สอน → ภาคผนวก ค**

## กติกากลางตลอด 2 วัน

1. ทุกการเปลี่ยนแปลงเข้า `main` ผ่าน Pull Request
2. หยิบการ์ด (Assign ตัวเอง) ก่อนลงมือเสมอ
3. **ห้ามเปิด Auto-approve** ของ Cline / Kilo Code — "อ่านก่อนกด" คือทักษะที่เราสอน
4. ความลับ (API Key, `.env`) ไม่ลงแชต ไม่ลง repo — หลุดแล้ว Revoke ก่อน
5. ติดเกิน 10 นาที ถามเพื่อนร่วมทีม แล้วเรียก TA
