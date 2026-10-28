# WS2.1 — GitHub Flow รอบแรก: Pull Request + Review

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 2 |
| **เวลา** | 25 นาที |
| **รูปแบบ** | จับคู่ 2 คน (A ผู้เขียน · B ผู้ตรวจ) แล้วสลับบทบาท |
| **สไลด์** | หน้า 49–67 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | PR ที่มี Comment + Suggested change ถูก Approve และ Squash-merge เข้า `main` แล้ว |

## 🎯 เป้าหมาย

ส่งงานผ่าน **Pull Request** และรีวิวงานเพื่อนอย่างสร้างสรรค์ได้ — ทักษะพื้นฐานที่สุดของการทำงานเป็นทีม และเป็นฐานของ "ประตูมนุษย์" ในวันที่ 2

## 📖 ทำความเข้าใจก่อนลงมือ (สไลด์หน้า 42–45)

- **Pull Request (PR)** = คำขอให้รวมงานจากกิ่งของเรา (**compare**) เข้ากิ่งปลายทาง (**base** ปกติคือ `main`) และเป็นที่ให้ทีมอ่าน คุย ตรวจ ก่อนรวมจริง — เหมือนส่งงานให้หัวหน้าตรวจก่อนเข้าแฟ้มกลาง
- ใน PR มี 4 แท็บ: **Conversation** (คำอธิบาย คอมเมนต์ ปุ่ม Merge) · **Commits** · **Checks** (ผล CI) · **Files changed** (diff ที่ผู้ตรวจคอมเมนต์)
- PR เดินแบบนี้: **Open** → Review (Comment / Suggestion / Request changes) → **Approve** → **Merged** (ป้ายม่วง) — ถ้าไม่ใช้แล้วกด **Close** (ป้ายแดง ไม่รวม)
- **push เพิ่มในกิ่งเดิม = PR เดิมอัปเดตเอง** ไม่ต้องเปิด PR ใหม่
- ผลการ Review มี 3 แบบ — ทุกแบบจบด้วย **B กด Approve แล้ว A กด Merge** (workshop นี้ฝึกแบบที่ 3 เพื่อให้ได้ลองครบ)

| แบบ | ใช้เมื่อ | ขั้นตอน |
|---|---|---|
| 1 · ไม่ต้องแก้ | อ่านครบแล้วไม่เจอปัญหา | B: Review changes → **Approve** → A: Squash and merge |
| 2 · มีคำถาม ไม่บังคับแก้ | สงสัย แต่โค้ดไม่ผิด | B: Comment → A: ตอบ + Resolve conversation → B: Approve → A: merge |
| 3 · ต้องแก้ | ผิดรูปแบบ/เงื่อนไข | B: Suggestion + **Request changes** → A: **Commit suggestion** (หรือแก้แล้ว push) → B: Approve → A: merge |

> ⚠️ Suggestion: GitHub คัดลอกบรรทัดเดิมมาใส่กล่องให้ — **ต้องแก้บรรทัดในกล่องให้ต่างจากเดิม** ไม่งั้นขึ้น *Suggested change cannot be the same as the original line*
- ปุ่ม Merge มี 3 แบบ — ผลโค้ดเหมือนกัน ต่างที่ประวัติของ `main`

| แบบ | ทำอะไร | ประวัติ `main` |
|---|---|---|
| Create a merge commit | เก็บทุก commit ของกิ่ง + เพิ่ม commit "รวม" | ครบทุกขั้น แต่มีเส้นแยกและ commit ย่อยเยอะ |
| **Squash and merge** (ทีมเราใช้) | บีบทุก commit ในกิ่งเป็น commit เดียว | **1 PR = 1 commit** อ่านง่าย ย้อนกลับง่าย |
| Rebase and merge | ย้าย commit ของกิ่งไปต่อท้าย `main` ทีละตัว | เส้นตรง แต่ commit ย่อยเข้าทุกตัว |

## 📋 ต้องมีก่อนเริ่ม

- กิ่ง `feat/hello-<ชื่อ>` ที่ push แล้วจาก [WS1.2](ws-1.2-first-commit.md)
- จับคู่กับเพื่อนร่วมทีม 1 คน (ตกลงกันว่าใครเป็น A ก่อน)

## 👉 ขั้นตอน (รอบที่ 1 — A เขียน, B ตรวจ)

### ขั้นที่ 1 — A เปิด Pull Request

เลือกอย่างใดอย่างหนึ่ง:

**ผ่านเว็บ:** เปิด repo → กดแถบเหลือง **Compare & pull request** → ตรวจว่า base = `main` และ compare = `feat/hello-<ชื่อ>`

**ผ่าน Terminal:**

```bash
gh pr create --base main --title "docs: add <ชื่อ> to contributors" --body "เพิ่มชื่อและบทบาทใน CONTRIBUTORS.md"
```

### ขั้นที่ 2 — A กรอกคำอธิบาย PR

ใช้โครงนี้ (ถ้า repo มี PR Template แล้ว ให้กรอกตามนั้น):

```markdown
## ทำอะไร / ทำไม
เพิ่มชื่อและบทบาทของฉันใน CONTRIBUTORS.md เพื่อให้ทีมรู้ว่าใครดูแลส่วนไหน

## ทดสอบอย่างไร
เปิดไฟล์บน GitHub แล้วเห็นบรรทัดใหม่ตามรูปแบบเดิม
```

💡 PR ที่ตรวจง่าย = **เล็ก 1 เรื่อง + อธิบายว่าทำอะไร ทำไม ทดสอบอย่างไร**

### ขั้นที่ 3 — B ตรวจในแท็บ **Files changed**

1. เปิด PR ของ A → แท็บ **Files changed**
2. วางเมาส์ที่เลขบรรทัด → กดปุ่ม **+** → เขียน **Comment 1 อัน** (ถามหรือให้ความเห็น) เช่น
   `บทบาทเขียนว่า "Backend" ใช่ไหม หรืออยากระบุโมดูลให้ชัดเจนกว่านี้?`
3. ที่อีกบรรทัด (หรือเพิ่มบรรทัดใหม่) กดไอคอน **Add a suggestion** ในกล่อง comment → แก้ข้อความเป็นรูปแบบที่ต้องการ → **Start a review / Add review comment**

### ขั้นที่ 4 — A ตอบและรับ suggestion

1. A เปิดแท็บ **Conversation** → ตอบ comment ของ B
2. กด **Commit suggestion** (หรือ Add suggestion to batch → Commit suggestions) เพื่อรับคำแนะนำ

### ขั้นที่ 5 — B ตัดสินใจ

B กด **Review changes** (มุมขวาบนของแท็บ Files changed) → เลือก

- **Approve** — อ่านแล้ว พอใจ พร้อม merge
- **Request changes** — ต้องแก้ก่อน (ใส่เหตุผล)

แล้ว **Submit review**

> ⚠️ **Approve เมื่ออ่านโค้ดจริงเท่านั้น** — การ Approve คือ "ฉันอ่านแล้วและรับผิดชอบร่วม" ไม่ใช่ "ฉันเกรงใจ"

### ขั้นที่ 6 — A กด Merge

1. กลับไปแท็บ **Conversation** → เลื่อนลงล่างสุด
2. กดลูกศรข้างปุ่ม Merge → เลือก **Squash and merge** → **Confirm squash and merge**
3. กด **Delete branch**

💡 **Squash and merge** รวมทุก commit ใน PR เป็น commit เดียวบน `main` ประวัติจึงอ่านง่าย

✅ **ต้องเห็น:** ป้ายสีม่วง **Merged** ที่หัว PR

### ขั้นที่ 7 — A อัปเดตเครื่องตัวเอง

```bash
git switch main
git pull
git log --oneline -3
```

## 🔁 รอบที่ 2 — สลับบทบาท

B เป็นผู้เขียน (ทำขั้นที่ 1–7 ใหม่ด้วยกิ่งของ B) และ A เป็นผู้ตรวจ

## 👥 การ merge งานของคนในทีม (สอน 10 นาที ก่อนหรือหลังรอบที่ 2)

ทุกคนในทีมส่งงานเข้า `main` เดียวกัน — ตกลงกติกาต่อไปนี้ให้ชัด แล้วจดลง Working Agreement ใน WS4.4

**1. ใครทำอะไร**

| บทบาท | ทำได้ | ห้าม |
|---|---|---|
| **Module Lead (เจ้าของ repo)** | ตั้ง Ruleset, รีวิว, อนุมัติ, ตัดสินลำดับ merge เมื่อ PR ชนกัน | Approve PR ของตัวเอง (ระบบไม่ให้กด) |
| **สมาชิก (Collaborator)** | แตกกิ่ง, เปิด PR, รีวิวและ Approve PR ของเพื่อน | push เข้า `main` ตรง ๆ |
| **ผู้เขียน PR** | กด merge PR ของตัวเอง **หลัง** ได้ Approve และ CI ผ่าน | merge ก่อนได้ Approve |

**2. วงจรเดียวกันทุกงาน:** กิ่งของตัวเอง → PR → เพื่อน Approve ≥ 1 คน + CI ผ่าน → **Squash and merge** → ลบกิ่ง → ทุกคน `git pull`

**3. ก่อน merge ต้องอัปเดตกิ่งให้ทัน `main`** — ถ้าเพื่อน merge ไปก่อน PR จะขึ้น *This branch is out-of-date with the base branch*

```bash
git switch feat/<กิ่งของคุณ>
git pull origin main      # เอางานล่าสุดของ main มารวมในกิ่ง (ถ้าชนกัน → WS2.2)
npm test                  # รวมแล้วยังผ่านไหม
git push
```

(หรือกดปุ่ม **Update branch** ในหน้า PR ได้ ถ้าไม่มี conflict)

**4. ลำดับการ merge เมื่อมีหลาย PR พร้อมกัน**

1. PR ที่ **คนอื่นต้องพึ่ง** (เช่น เพิ่มฟิลด์ที่ฟีเจอร์อื่นใช้) merge ก่อน
2. แล้ว PR **เล็ก** ก่อน PR **ใหญ่** — PR เล็กชนน้อย รีวิวเร็ว
3. merge ทีละใบ → คนที่เหลือทำข้อ 3 (อัปเดตกิ่ง) ก่อน merge ใบถัดไป
4. ประกาศในแชตทีมทุกครั้งที่ merge: *"merge #12 แล้ว ทุกคน pull ด้วย"*

**5. วิธี merge 3 แบบของ GitHub** — ทีมนี้ใช้ **Squash and merge**

| วิธี | ผลบน `main` | ใช้เมื่อ |
|---|---|---|
| Create a merge commit | เก็บทุก commit + commit "Merge pull request" | อยากเก็บประวัติละเอียด |
| **Squash and merge** | 1 PR = 1 commit | งานทีมทั่วไป ประวัติอ่านง่าย (ใช้ในคลาส) |
| Rebase and merge | commit ทุกอันต่อท้ายเป็นเส้นตรง | ทีมที่เขียน commit สะอาดทุกอัน |

**6. หลัง merge ทุกครั้ง:** `git switch main && git pull` ก่อนเริ่มงานใหม่ — แตกกิ่งใหม่จาก `main` ล่าสุดเสมอ ห้ามทำงานต่อบนกิ่งที่ merge ไปแล้ว

> 🍴 **Fork ใช้ตอนไหน (ผู้สอนสาธิต 3 นาที):** ถ้าไม่มีสิทธิ์เขียน repo นั้น (เช่น โครงการ open source) ให้ **Fork** มาไว้ใต้บัญชีตัวเอง →
> แก้ในกิ่งของ fork → เปิด PR ข้าม repo กลับไปที่ต้นทาง · ส่วนทีมเราใช้ repo เดียวกันและมีสิทธิ์ Write จึงใช้กิ่งแทน Fork

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] PR ของคุณมีป้าย **Merged**
- [ ] ในประวัติ PR เห็น Comment และ Suggested change อย่างน้อยอย่างละ 1
- [ ] `main` ของคุณมี commit ใหม่ 1 อัน และกิ่ง `feat/hello-<ชื่อ>` ถูกลบแล้ว
- [ ] คุณได้ตรวจ PR ของเพื่อน 1 ใบ (ถามอย่างน้อย 1 คำถาม)

## 🔧 ปัญหาที่พบบ่อย

| อาการ | สาเหตุ | วิธีแก้ |
|---|---|---|
| ปุ่ม Merge ใช้ไม่ได้ ("Review required") | ยังไม่มีคน Approve (ถ้า Ruleset เปิดแล้ว) | ให้เพื่อน Approve — ห้าม Approve ของตัวเอง |
| "Waiting on code owner review" | ผู้ Approve ไม่ใช่ Code Owner | ให้ Code Owner ที่ระบุไว้ Approve (ดู WS2.3) |
| ไม่เห็นปุ่ม Squash and merge | repo ปิดวิธี merge แบบนี้ | Settings → General → Pull Requests → ติ๊ก Allow squash merging |
| `gh pr create` ถามหลายคำถาม | ไม่ได้ใส่ `--title/--body` | ใส่ตามตัวอย่าง หรือใช้ `--fill` |

## 🧪 ท้าทายเพิ่ม

- ลองใช้ `gh pr checkout <N>` ดึงกิ่งของเพื่อนมาดูในเครื่อง แล้วรันคำสั่ง `gh pr diff <N>`
- เขียน Comment ที่ "ถามเหตุผล" แทน "สั่ง" เช่น เปลี่ยน "แก้ตรงนี้" เป็น "ที่เลือกวิธีนี้เพราะอะไร มีทางเลือกอื่นไหม?"

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- เดินดูว่าผู้ตรวจใช้แท็บ **Files changed** จริง ไม่ใช่กด Approve ทันที — ตั้งคำถามกับผู้ตรวจ: "ถ้ากด Approve แล้วพังใครรับผิดชอบ?"
- ถ้า Ruleset ยังไม่เปิด (เปิดใน WS2.3) PR จะ merge ได้โดยไม่ต้อง Approve — ให้ย้ำกติกาว่า "ทุกคนต้องมีคน Approve" และใช้ WS2.3 เปลี่ยนเป็นการบังคับด้วยระบบ
- เวลาเหลือ → ให้ทำรอบสอง (สลับบทบาท) ทันที

**ต่อไป →** [WS2.2 จำลอง Merge Conflict](ws-2.2-merge-conflict.md)
