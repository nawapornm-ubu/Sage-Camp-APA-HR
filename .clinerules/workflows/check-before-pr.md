# check-before-pr — ตรวจก่อนเปิด Pull Request

ใช้ทุกครั้งก่อนเปิด PR · ทำตามลำดับ · ถ้าขั้นไหนไม่ผ่าน **หยุด** แล้วรายงานผู้ใช้ — ห้ามข้ามขั้น และห้ามแก้ test เพื่อให้ผ่าน

## 1. รู้ว่ากำลังทำงานอะไร

```bash
git branch --show-current
```

- ต้องเป็น `feature/<name>` (ไม่ใช่ `main`) — ถ้าอยู่ `main` ให้หยุดและบอกผู้ใช้
- เปิด `docs/specs/<โมดูล>-<name>.md` ที่ตรงกับ branch ไว้ใช้ตรวจขั้นถัดไป

## 2. ไม่มีไฟล์แปลกปลอม

```bash
git status --short
git diff --name-only main...HEAD
```

- ไฟล์ที่เปลี่ยนต้องอยู่ในตารางหัวข้อ 4 ของ spec เท่านั้น
- ถ้ามีไฟล์ร่วม (ดูรายการใน `AGENTS.md`) หรือไฟล์ของฟีเจอร์อื่นถูกแก้ → ถามผู้ใช้ว่าจะคืนค่าด้วย `git restore <ไฟล์>` หรือไม่
- ต้องไม่มี `.env`, `data/`, `logs/`, `node_modules/` ในรายการ

## 3. ไม่มีความลับในโค้ด

```bash
git diff main...HEAD | grep -n -i -E "api[_-]?key|secret|password|token" || echo "ไม่พบคำต้องสงสัย"
```

- ถ้าพบ ให้แสดงบรรทัดนั้นให้ผู้ใช้ตัดสิน — ห้าม commit ค่าลับจริง

## 4. คุณภาพ

```bash
npm run lint
npm test
```

- ต้องเห็น `lint ผ่าน` และ `fail 0`
- ต้องมีไฟล์ `test/<name>.test.js` ของฟีเจอร์นี้

## 5. Acceptance Criteria

- รัน `npm run dev` ใหม่ในอีก Terminal (ให้ข้อมูลกลับเป็นตัวอย่าง)
- รันคำสั่งในหัวข้อ 7 ของ spec **ทุกข้อตามลำดับ** แล้วรายงานเป็นตาราง: ข้อ · ผลที่ต้องเห็น · ผลที่เห็นจริง · ผ่าน/ไม่ผ่าน
- ข้อที่ต้องดูด้วยตา ให้ขอให้ผู้ใช้ตรวจและยืนยัน

## 6. Commit และ Push

```bash
git add <เฉพาะไฟล์ในหัวข้อ 4 ของ spec>
git commit -m "feat(<name>): <สรุปสั้น ๆ> (#<เลข Issue>)"
git push -u origin feature/<name>
```

- ห้ามใช้ `git add -A` หรือ `git add .`

## 7. เปิด Pull Request

```bash
gh pr create --base main --title "feat(<name>): <สรุปสั้น ๆ>" --body "Closes #<เลข Issue>

## สิ่งที่ทำ
- ...

## ผล Acceptance Criteria
<ตารางจากขั้นที่ 5>"
```

- แจ้งผู้ใช้ให้แนบภาพหน้าจอ และขอเพื่อนในทีม Review
