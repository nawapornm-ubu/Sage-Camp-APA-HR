# WS1.2 — สร้าง repo ทีม + Commit แรก

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 1 |
| **เวลา** | 30 นาที |
| **รูปแบบ** | Module Lead สร้าง repo ทีมและเชิญเพื่อน → จากนั้นทุกคนทำรายบุคคลใน repo เดียวกัน |
| **สไลด์** | หน้า 21–34 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | ทีมมี repo ของตัวเอง (Module Lead เป็นเจ้าของ) และกิ่ง `feat/hello-<ชื่อ>` ของทุกคนปรากฏบน GitHub |

## 🎯 เป้าหมาย

- **Module Lead** ได้เป็นเจ้าของ repo จริง — เป็นคนตั้งกติกา (WS2.3) และอนุมัติ PR ของเพื่อน
- **ทุกคน** ทำวงจร **clone → สร้างกิ่ง → แก้ไฟล์ → add → commit → push** ครบหนึ่งรอบด้วยตัวเอง

## 📋 ต้องมีก่อนเริ่ม

- ผ่าน [WS1.1](ws-1.1-setup-tools.md) แล้ว (`gh auth status` ผ่าน)
- ทีมตกลงกันแล้วว่าใครเป็น **Module Lead** (เจ้าของ repo) — เปลี่ยนบทบาทได้ใน WS4.4
- ผู้สอนแจ้งบนจอ: repo แม่แบบ `<TEMPLATE>` และ GitHub username ของผู้สอน `<INSTRUCTOR>`

> **ทำไมไม่ใช้ Fork?** Fork เหมาะกับการส่งงานให้ repo ที่เราไม่มีสิทธิ์เขียน (เช่น โครงการ open source) แต่ repo ที่ fork มา
> ปุ่ม Pull request จะชี้กลับไป repo ต้นทางของผู้สอน ปิด Issues และปิด Actions ไว้ — ทีมที่ทำงานร่วมกันใน repo เดียว
> จึงใช้ **Use this template** + เชิญเพื่อนเป็น Collaborator แล้วแยกงานด้วยกิ่ง (ผู้สอนสาธิต Fork ให้ดูท้าย WS2.1)

## 👉 ขั้นตอน

### ขั้นที่ 1 — Module Lead สร้าง repo ทีมจากแม่แบบ (คนเดียวในทีม)

1. เปิด `https://github.com/<TEMPLATE>` → กดปุ่ม **Use this template** → **Create a new repository**
2. **Owner:** บัญชีของตัวเอง · **Repository name:** `dms-practice-team<N>` · เลือก **Public** (Ruleset ใช้ได้ฟรีกับ repo สาธารณะ)
3. กด **Create repository**
4. **Settings → Collaborators → Add people** เชิญทุกคนในทีม และ `<INSTRUCTOR>` (ผู้สอนช่วยดูงานและรีวิว PR ของทีม)
5. ส่ง URL ของ repo ให้เพื่อนในทีม (เช่น แชตกลุ่ม)

✅ **ต้องเห็น:** repo `<OWNER>/dms-practice-team<N>` มี `README.md`, `CONTRIBUTORS.md` และหน้า Collaborators แสดงเพื่อนสถานะ Pending invite

> `<OWNER>` = GitHub username ของ Module Lead · `<REPO>` = `dms-practice-team<N>` — ใช้สองคำนี้แทนในทุก WS ของวันที่ 1

### ขั้นที่ 2 — ทุกคนในทีม (ยกเว้น Module Lead) รับคำเชิญ

1. เปิดอีเมลที่ผูกกับ GitHub → อีเมลคำเชิญจาก GitHub → กด **View invitation** → **Accept invitation**
   (หรือเปิด `https://github.com/<OWNER>/<REPO>/invitations`)
2. ตรวจว่าเปิดหน้า repo ได้ และเห็นปุ่ม **Code** สีเขียว

✅ **ต้องเห็น:** หน้า `https://github.com/<OWNER>/<REPO>` เปิดได้ และมุมขวาบนไม่มีป้ายขอสิทธิ์

🔧 ไม่เห็นคำเชิญ → ให้ Module Lead ตรวจ username ในหน้า Collaborators แล้วกดเชิญใหม่

### ขั้นที่ 3 — Clone repo มาที่เครื่อง (ทุกคน รวม Module Lead)

```bash
cd ~/Desktop
git clone https://github.com/<OWNER>/<REPO>.git
cd <REPO>
code .
```

(หรือใช้ `gh repo clone <OWNER>/<REPO>` ได้เช่นกัน)

✅ **ต้องเห็น:** VS Code เปิดโฟลเดอร์ `<REPO>` และมีไฟล์ `README.md`, `CONTRIBUTORS.md` ในแถบซ้าย

🔧 คำสั่ง `code` ไม่รู้จัก → เปิด VS Code เอง → File → Open Folder → เลือกโฟลเดอร์ `<REPO>` บน Desktop

### ขั้นที่ 4 — สร้างกิ่งของตัวเอง

ใน Terminal ของ VS Code (เมนู Terminal → New Terminal):

```bash
git switch -c feat/hello-<ชื่อ>
git branch --show-current
```

💡 เราไม่แก้ `main` ตรง ๆ — ทุกงานเริ่มจากกิ่งใหม่ (กติกาข้อแรกของ GitHub Flow)

✅ **ต้องเห็น:** `feat/hello-<ชื่อ>`

### ขั้นที่ 5 — แก้ไฟล์

เปิด `CONTRIBUTORS.md` เพิ่มบรรทัดของคุณ (ตามรูปแบบที่มีอยู่) เช่น:

```markdown
- somchai — Backend developer (ฟีเจอร์ B ค้นหาประกาศ)
```

กด `Ctrl+S` (macOS: `Cmd+S`) เพื่อบันทึก

### ขั้นที่ 6 — ดูว่าเปลี่ยนอะไรไป

```bash
git status
git diff
```

✅ **ต้องเห็น:** `modified: CONTRIBUTORS.md` และบรรทัดสีเขียว (เพิ่ม) ใน `git diff`

### ขั้นที่ 7 — Add, Commit, Push

```bash
git add CONTRIBUTORS.md
git commit -m "docs: add <ชื่อ> to contributors"
git push -u origin feat/hello-<ชื่อ>
```

💡 **เหตุผลของข้อความ commit:** ใช้รูปแบบ `type(scope): สรุปสั้น ๆ` เหมือนกันทั้งทีม — `docs` คือเอกสาร

✅ **ต้องเห็น:** ข้อความ `branch 'feat/hello-<ชื่อ>' set up to track 'origin/feat/hello-<ชื่อ>'`

### ขั้นที่ 8 — ดูผลบน GitHub

เปิด `https://github.com/<OWNER>/<REPO>` → จะเห็นแถบเหลือง **Compare & pull request** (ยังไม่ต้องกด — ใช้ใน WS2.1)

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] เห็นกิ่ง `feat/hello-<ชื่อ>` ใน GitHub (ปุ่มเลือกกิ่ง)
- [ ] เปิดหน้า commit แล้วเห็นชื่อและรูปของคุณ
- [ ] `git log --oneline -3` เห็น commit ของคุณบนสุด

## 🔧 ปัญหาที่พบบ่อย

| อาการ | สาเหตุ | วิธีแก้ |
|---|---|---|
| `Repository not found` ตอน clone | ยังไม่ได้ Accept คำเชิญ / พิมพ์ `<OWNER>` ผิด | ทำขั้นที่ 2 ใหม่ หรือขอ URL จาก Module Lead |
| ปุ่ม **Use this template** ไม่ขึ้น | เปิด repo ผิด หรือยังไม่ได้ login | เปิด `https://github.com/<TEMPLATE>` ใหม่หลัง login |
| เพื่อน push ไม่ได้ (`403`) | ยังไม่ได้ Accept คำเชิญ | ทำขั้นที่ 2 |
| `Permission denied` / ขอรหัสผ่าน | `gh auth login` ยังไม่เสร็จ หรือใช้บัญชีผิด | `gh auth status` แล้วทำ WS1.1 ขั้นที่ 5 ซ้ำ |
| `push` ถูกปฏิเสธ (rejected) | กำลัง push เข้า `main` | `git branch --show-current` ต้องไม่ใช่ `main` |
| `nothing to commit` | ยังไม่ได้ Save ไฟล์ | `Ctrl+S` แล้ว `git status` |
| `Author identity unknown` | ยังไม่ตั้ง `user.name/email` | ทำ WS1.1 ขั้นที่ 4 |

## 🧪 ท้าทายเพิ่ม

- แก้ไฟล์ `README.md` อีกหนึ่งจุด แล้ว commit แยกอีก 1 อัน (ฝึก "commit เล็ก ๆ บ่อย ๆ") ดูผลด้วย `git log --oneline`
- ลองใช้แผง **Source Control** ใน VS Code (`Ctrl+Shift+G`) แทนคำสั่ง ทำ commit ที่สอง

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- ให้ทีมเลือก Module Lead ก่อนเริ่ม WS นี้ (คนที่คล่อง GitHub ที่สุด หรือคนที่อยากฝึกเป็นผู้ดูแล) และตรวจว่าทุกทีมเชิญ `<INSTRUCTOR>` แล้ว — ผู้สอนต้องมีสิทธิ์เพื่อช่วยรีวิว และสร้างการ์ดฟีเจอร์ให้ด้วยสคริปต์สำรองถ้าทีมเปิดไม่ทันใน WS3.1
- ถ้า Ruleset ยังไม่เปิดใน repo ฝึกหัด ผู้เรียน push กิ่งได้ปกติ (กิ่ง ≠ main) การ merge เข้า `main` จะทำใน WS2.1
- ใช้ `CONTRIBUTORS.md` เป็นไฟล์ฝึกเพราะ conflict-free เมื่อแต่ละคนเพิ่มบรรทัดคนละบรรทัด (ถ้าเกิด conflict จริง ใช้เป็นตัวอย่างสอนได้)
- สังเกตผู้เรียนที่ commit เข้า `main` ตรง ๆ ได้ (ก่อนเปิด Ruleset) — ชวนให้เห็นว่าทำไม WS2.3 จึงบังคับด้วยระบบ

**ต่อไป →** [WS1.3 ตั้งค่า AI Agent และ API Key](ws-1.3-setup-ai-agent.md)
