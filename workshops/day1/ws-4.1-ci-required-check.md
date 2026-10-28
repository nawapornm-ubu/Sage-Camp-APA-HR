# WS4.1 — สร้าง CI และตั้ง Required Check

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 4 |
| **เวลา** | 20 นาที |
| **รูปแบบ** | ทีม (คนหนึ่งพิมพ์ workflow · คนหนึ่งดู Actions · Module Lead ตั้ง Ruleset) |
| **สไลด์** | หน้า 140–147 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | ทุก PR รัน Lint + Test อัตโนมัติ และ merge ไม่ได้ถ้า check ไม่ผ่าน |

## 🎯 เป้าหมาย

ให้ **เครื่องตรวจแทนคน** ก่อนที่คนจะเสียเวลาอ่านโค้ด และผูกผลตรวจเข้ากับกติกา (Required check)

## 📋 ต้องมีก่อนเริ่ม

- repo ทีมมี practice-app (บอร์ดประกาศ) ที่ราก และรันบนเครื่องผ่าน:

  ```bash
  npm ci
  npm run lint      # ต้องเห็น "lint ผ่าน"
  npm test          # ต้องเห็น fail 0 (จำนวน pass เพิ่มขึ้นตามฟีเจอร์ที่ merge แล้ว)
  ```

- practice-app **ไม่ใช้ฐานข้อมูล** (เก็บข้อมูลใน memory) CI จึงไม่ต้องเปิด PostgreSQL และไม่ต้องตั้งตัวแปรใด ๆ

## 👉 ขั้นตอน

### ขั้นที่ 1 — สร้างกิ่งและไฟล์ workflow

```bash
git switch main && git pull
git switch -c chore/ci
mkdir -p .github/workflows
```

สร้างไฟล์ **`.github/workflows/ci.yml`**:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

💡 **อธิบายสั้น ๆ:** `on` = เมื่อเปิด PR หรือ push เข้า main · `runs-on` = เครื่องใหม่สะอาดทุกครั้ง · `steps` = รันตามลำดับ ขั้นไหนล้มก็หยุด · `node-version: 20` = ตรงกับ `node:20-alpine` ใน `Dockerfile` (สิ่งที่ CI ทดสอบ = สิ่งที่ deploy)

💡 **ทำไมต้อง `npm ci` ไม่ใช่ `npm install`:** `npm ci` ติดตั้งตาม `package-lock.json` เป๊ะ ๆ — ถ้า lockfile ไม่ตรงกับ `package.json` จะล้มทันที ทำให้รู้ตัวก่อน deploy

> ระบบจริงที่มีฐานข้อมูล (เช่น Day 2 ถ้าทีมเพิ่ม PostgreSQL) ให้เพิ่ม `services: postgres:` ใน job และตั้ง `env: DATABASE_URL` — วันนี้ยังไม่ต้องใช้

> เวอร์ชันของ action (`@v4`) ใช้ major version ที่ GitHub แนะนำล่าสุดได้ — ตรวจหน้า Marketplace ของ `actions/checkout` และ `actions/setup-node`

### ขั้นที่ 2 — เปิด PR และดู CI รัน

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add lint and test workflow"
git push -u origin chore/ci
gh pr create --base main --fill
```

เปิดแท็บ **Actions** (หรือดู **Checks** ใน PR) → รอจุดเหลือง 🟡 กลายเป็นเครื่องหมายถูก ✅ (ปกติ 1–2 นาที)

✅ **ต้องเห็น:** workflow `CI` สีเขียว

🔧 **ถ้าแดง** — คลิกเข้า job `test` → คลิกขั้นที่มีเครื่องหมาย ✗ → อ่านข้อความ error:

| ข้อความ | แปลว่า | แก้ |
|---|---|---|
| `Missing script: "lint"` | `package.json` ไม่ใช่ของ practice-app หรือถูกแก้ | ตรวจว่ามี `"lint": "node scripts/lint.js"` |
| `npm ci` ล้ม / `lockfile ... not in sync` | `package-lock.json` ไม่มีหรือไม่ตรง | รัน `npm install` ในเครื่องแล้ว commit lockfile |
| `lint ไม่ผ่าน` + ชื่อไฟล์ | syntax ผิดในไฟล์นั้น | เปิดไฟล์ตามบรรทัดที่แจ้ง แก้แล้ว push ใหม่ |
| `✖ ... AssertionError` | test ล้ม | อ่านชื่อ test ที่ล้ม แล้วรัน `npm test` ในเครื่องให้ผ่านก่อน push |
| workflow ไม่รันเลย | ไฟล์ไม่ได้อยู่ที่ `.github/workflows/` ของ **ราก repo** | ตรวจ path และนามสกุล `.yml` |

Merge PR นี้เข้า `main` (ให้เพื่อน Approve)

### ขั้นที่ 3 — ตั้ง Required status check

1. Settings → Rules → Rulesets → เปิด `protect-main` → **Edit**
2. ติ๊ก **Require status checks to pass** → **Add checks** → เลือก **`test`**
3. **Save changes**

> ชื่อ check จะให้เลือกได้ **หลังจากเคยรันสำเร็จอย่างน้อย 1 ครั้ง** (ถ้าไม่เห็น ให้รอแล้วรีเฟรช)

### ขั้นที่ 4 — พิสูจน์ว่าบล็อกได้จริง

1. สร้างกิ่ง `test/break-ci` แล้วแก้ test ให้ล้ม — เปิด `test/app.test.js` ใน test แรก (`GET /api/health`) เปลี่ยน `assert.equal(data.status, 'ok')` เป็น `assert.equal(data.status, 'okay')`
2. commit → push → เปิด PR
3. รอ CI แดง ✗ → ดูปุ่ม Merge

✅ **ต้องเห็น:** `Merging is blocked — Required statuses must pass`

4. แก้ test กลับให้ผ่าน → push → CI เขียว → ปุ่ม Merge กลับมาใช้ได้ → ปิด PR ทดสอบทิ้ง (ไม่ต้อง merge)

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] แท็บ Actions แสดงการรันสีเขียวของ `CI`
- [ ] PR ที่ test ล้มมีป้าย **Merging is blocked**
- [ ] ชื่อ check `test` อยู่ในรายการ Required ของ Ruleset

## 🧪 ท้าทายเพิ่ม

- เพิ่ม badge CI ใน README: `![CI](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)`
- เพิ่ม `concurrency:` เพื่อยกเลิกการรันเก่าเมื่อ push ซ้ำ

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- เฉลย `ci.yml` อยู่ที่ [`practice-app/.github/workflows/ci.yml`](https://github.com/class-nithirun/Team-based-AI-Development/blob/main/practice-app/.github/workflows/ci.yml) — **อย่าคัดลอกโฟลเดอร์ `.github/` เข้า Template repo** เพื่อให้ผู้เรียนสร้างเองในงานนี้ (ทีมที่ติดนานเกิน 5 นาที ให้คัดลอกเฉลยไปวาง)
- ถ้า Org จำกัด Actions ให้ใช้ได้เฉพาะ action ที่อนุมัติ ตรวจก่อนว่า `actions/checkout` และ `actions/setup-node` อยู่ในรายการ
- ความจริงเรื่องแพ็กเกจ: Required status checks ใน Ruleset ของ repo private ต้องใช้แพ็กเกจที่รองรับ
- CI ใช้เวลาราว 20–30 วินาที (ไม่มี DB) จึงเหลือเวลาให้ขั้นที่ 4 ได้ทุกทีม
- เชื่อมไป Day 2: UBU BioLink มี CI แยก 2 job (`CI / api` รัน test, `CI / web` รัน `next build`) — หลักการเดียวกัน ตั้ง Required ทั้งสองชื่อ

**ต่อไป →** [WS4.2 Dependabot และ Security scanning](ws-4.2-dependabot-security.md)
