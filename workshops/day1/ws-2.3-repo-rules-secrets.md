# WS2.3 — ตั้ง Ruleset, CODEOWNERS และกันความลับ

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 2 |
| **เวลา** | 20 นาที (ผู้สอนสาธิต 5′ → ทีมทำตาม 15′) |
| **รูปแบบ** | ทีมละ 1 repo — **Module Lead (เจ้าของ repo) เป็นคนกดตั้งค่า** คนอื่นดูและตรวจ |
| **สไลด์** | หน้า 81–90 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | repo ของทีมบังคับให้ทุกงานเข้า `main` ผ่าน PR + Approve + Code Owner |

## 🎯 เป้าหมาย

ให้ **ระบบบังคับกติกา** แทนการพึ่งความจำของคน และรู้วิธีกันไม่ให้ความลับ (API Key, `.env`) หลุดขึ้น repo

## 📋 ต้องมีก่อนเริ่ม

- สิทธิ์ **Admin** ใน repo — Module Lead เป็นเจ้าของ repo ที่สร้างใน WS1.2 จึงมีสิทธิ์นี้อยู่แล้ว
- 💡 หลังเปิด Ruleset แล้ว **PR ของ Module Lead เองก็ต้องให้เพื่อน Approve** (คนเปิด PR อนุมัติงานตัวเองไม่ได้) — ทุกคนได้ฝึกทั้งเปิด PR และรีวิว
- รู้ GitHub username ของสมาชิกทีม (ใช้ใน `CODEOWNERS`)

> ⚠️ repo ทีมต้องเป็น **Public** (สร้างแบบนี้ใน WS1.2) — repo **private** บนบัญชีฟรีใช้ Ruleset ไม่ได้ (GitHub ขึ้น *Upgrade to GitHub Pro or make this repository public*) ถ้าเมนูเป็นสีเทา: Settings → General → Danger Zone → Change visibility → Public

## 👉 ขั้นตอน

### ตอนที่ A — ตั้ง Ruleset

1. เปิด repo ของทีม → **Settings** → **Rules** → **Rulesets**
2. กด **New ruleset** → **New branch ruleset**
3. ตั้งค่า:

| ช่อง | ค่า |
|---|---|
| Ruleset Name | `protect-main` |
| Enforcement status | **Active** |
| Target branches | Add target → **Include default branch** |
| Bypass list | ปล่อยว่าง |

4. ที่ **Branch rules** ติ๊ก:
   - ✅ **Restrict deletions**
   - ✅ **Block force pushes**
   - ✅ **Require a pull request before merging** → Required approvals: **1** · ติ๊ก **Require review from Code Owners**
5. กด **Create**

> Required status checks จะเพิ่มทีหลังใน [WS4.1](ws-4.1-ci-required-check.md) (เพราะต้องมี CI ก่อน)

### ตอนที่ B — เพิ่ม CODEOWNERS และ PR Template ผ่าน PR

สร้างกิ่งใหม่ `chore/repo-rules` แล้วเพิ่มสองไฟล์:

**`.github/CODEOWNERS`** (ใน repo ฝึกหัด ใช้ **username** แทนชื่อ Team):

```text
# บรรทัดล่างที่ตรงกับไฟล์ จะมีผลก่อนบรรทัดบน
*                      @<username-module-lead>
/src/                  @<username-1> @<username-2>
/docs/memory/          @<username-module-lead>
/.github/              @<username-module-lead>
```

⚠️ ผู้ที่ระบุใน `CODEOWNERS` ต้องมีสิทธิ์ **Write** ใน repo นี้ ไม่งั้นกฎ Code Owners จะไม่ผ่าน และคนเขียน PR **ไม่สามารถ Approve งานตัวเองได้**

**`.github/pull_request_template.md`**:

```markdown
## ทำอะไร / ทำไม
Closes #

## ทดสอบอย่างไร
- [ ] npm test ผ่าน

## Checklist
- [ ] อ่านโค้ดที่ AI สร้างทุกบรรทัดแล้ว
- [ ] ไม่มี secret / .env ใน commit
```

เปิด PR → ให้สมาชิกที่เป็น Code Owner Approve → Squash and merge

### ตอนที่ C — ทดสอบว่ากติกาทำงาน

บนกิ่ง `main` ในเครื่อง:

```bash
git switch main
git pull
echo "test" >> README.md
git commit -am "test: push directly to main"
git push
```

✅ **ต้องเห็น:** push ถูกปฏิเสธ ข้อความแนว `Repository rule violations found` / `Changes must be made through a pull request`

แล้วย้อนการเปลี่ยนในเครื่อง:

```bash
git reset --hard origin/main
```

### ตอนที่ D — กันความลับ

1. ตรวจว่ามี `.env` ใน `.gitignore`:

```bash
git check-ignore -v .env
```

2. ทดลองสร้างไฟล์ลับปลอม **(ห้ามใช้ key จริง)**:

```bash
echo "DEMO_TOKEN=not-a-real-secret" > .env
git status
```

✅ **ต้องเห็น:** `git status` **ไม่แสดง** ไฟล์ `.env` (ถูก ignore) — ถ้าเห็น ให้เพิ่ม `.env` ใน `.gitignore`

3. **ผู้สอนสาธิต:** Push protection (ถ้าแพ็กเกจรองรับ) — แสดงหน้าจอที่ GitHub บล็อก push ที่มีรูปแบบ token และตัวเลือก bypass พร้อมเหตุผล
4. อ่านเรื่อง **ถ้า Key หลุดแล้ว:** (1) **Revoke / หมุน Key ทันที** → (2) ลบจากไฟล์ → (3) แจ้งทีม — ประวัติ git ยังมี key เดิมอยู่ จึงต้องถือว่า key นั้นตายแล้ว

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] Ruleset `protect-main` สถานะ Active
- [ ] push ตรงเข้า `main` ถูกปฏิเสธ
- [ ] PR ต้องรอ Approve (และ Code Owner) ก่อนปุ่ม Merge ใช้ได้
- [ ] มี `CODEOWNERS` และ `pull_request_template.md` ใน `main`
- [ ] `git status` ไม่เห็นไฟล์ `.env`

## 🔧 ปัญหาที่พบบ่อย

| อาการ | สาเหตุ | วิธีแก้ |
|---|---|---|
| ปุ่ม Merge เทา "Review required" | ยังไม่มีคน Approve | ให้เพื่อนที่เป็น Code Owner Approve |
| "Waiting on code owner review" ตลอด | Code Owner ที่ระบุไม่มีสิทธิ์ Write หรือพิมพ์ username ผิด | ตรวจ `CODEOWNERS` และสิทธิ์ในหน้า Settings → Collaborators |
| Admin อยากแก้ฉุกเฉิน | ปิด Ruleset ไว้ชั่วคราวไม่ได้เป็นนิสัยที่ดี | ใช้ PR เสมอ แม้ผู้สอนก็ต้องผ่าน PR (เหมือนตอนติดตั้ง Kit) |
| ไม่เห็นเมนู Rulesets | ไม่ใช่ Admin หรือแพ็กเกจไม่รองรับ | แจ้งผู้สอน |

## 🧪 ท้าทายเพิ่ม

- เพิ่มกฎ **Require linear history** แล้วสังเกตว่ากระทบวิธี merge อย่างไร
- เพิ่ม `.env.example` (ไม่มีค่าจริง) ใน repo และอธิบายว่าทำไมแยกจาก `.env`

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- สาธิต 5 นาทีก่อน ด้วย repo ตัวอย่าง แล้วให้ Module Lead ของแต่ละทีมตั้งค่าตาม — คนอื่นช่วยตรวจ
- จุดเน้น: "กติกาใช้กับทุกคนรวมถึงผู้สอน" — เล่าว่าตอนรวมชุดไฟล์ AI เข้า ubu-biolink ผู้สอนก็ต้องเปิด PR
- ข้อควรระวัง: ทีมเล็กที่มี Code Owner คนเดียว จะ Approve งานตัวเองไม่ได้ — กำหนดอย่างน้อย 2 คนใน `CODEOWNERS`
- ความจริงเรื่องแพ็กเกจ: Push protection / Secret scanning ของ repo private อาจต้องใช้แพ็กเกจเสริม ตรวจล่วงหน้าตาม [00-instructor-prep.md](../00-instructor-prep.md)

**ต่อไป →** พักเที่ยง แล้วเข้า [WS3.1 Issue Template และ Label](ws-3.1-issue-templates-labels.md)
