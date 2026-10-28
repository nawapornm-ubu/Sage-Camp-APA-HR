# deploy — นำ Release ขึ้นใช้งานด้วย Docker หรือ PM2

Deploy จาก **Tag ของ Release เท่านั้น** ไม่ใช่โค้ดที่กำลังแก้ · ทุกคำสั่งต้องให้ผู้ใช้อนุมัติก่อนรัน · ถ้าขั้นไหนไม่ผ่านให้หยุดและรายงาน

## 0. ถามผู้ใช้ก่อนเริ่ม

1. จะ deploy Tag อะไร (เช่น `v0.0.1`)
2. ใช้ **Docker** หรือ **PM2** (หรือทั้งสอง)

## 1. เตรียมโค้ดตาม Tag

```bash
git status --short          # ต้องว่าง — ถ้ามีงานค้าง ให้หยุดและบอกผู้ใช้
git fetch --tags
git switch --detach <TAG>
git describe --tags         # ต้องตรงกับ <TAG>
```

## 2A. Docker (พอร์ต 8080)

```bash
docker version --format "{{.Server.Version}}"     # ต้องเห็นเลขเวอร์ชัน (Docker Desktop เปิดอยู่)
APP_TAG=<TAG> docker compose up -d --build        # PowerShell: $env:APP_TAG="<TAG>"; docker compose up -d --build
docker compose ps                                 # STATUS ต้องเป็น (healthy) — รอได้ไม่เกิน 30 วินาที
```

Rollback (image ของ Tag เก่ายังอยู่ ไม่ต้อง build):

```bash
APP_TAG=<TAG-เก่า> docker compose up -d
```

## 2B. PM2 (พอร์ต 3000)

```bash
npm ci --omit=dev
pm2 describe practice-app > /dev/null 2>&1 && pm2 reload practice-app || pm2 start ecosystem.config.cjs
pm2 status                                        # practice-app ต้องเป็น online
```

Rollback = ทำขั้นที่ 1 ด้วย Tag เก่า แล้วทำ 2B ซ้ำ

## 3. Smoke test (ทุกครั้งหลัง deploy)

```bash
curl -s localhost:8080/api/health    # Docker
curl -s localhost:3000/api/health    # PM2
```

ต้องเห็น `"status":"ok"` · `"version"` ตรงกับ Tag (ไม่มีตัว v) · `"runtime"` เป็น `docker` หรือ `pm2` ตามที่ deploy

## 4. รายงานผู้ใช้

- Tag ที่ deploy · วิธี (Docker/PM2) · ผล `/api/health` จริง · URL ที่เปิดดูได้
- เตือนให้กลับ branch เดิมเมื่อจะทำงานต่อ: `git switch main`

## ห้าม

- ห้าม `docker compose down -v` (ลบข้อมูลใน volume) เว้นแต่ผู้ใช้สั่งชัดเจน
- ห้ามแก้ `Dockerfile`, `docker-compose.yml`, `ecosystem.config.cjs` ระหว่าง deploy
- ห้ามใส่ค่าลับในคำสั่งหรือไฟล์ config
