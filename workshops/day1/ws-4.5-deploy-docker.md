# WS4.5 — Deploy ด้วย Docker

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 4 (ต่อจาก WS4.3 Release) |
| **เวลา** | 20 นาที |
| **รูปแบบ** | รายบุคคลบนเครื่องตัวเอง (เพื่อนในทีมช่วยตรวจ Checkpoint) |
| **สไลด์** | หน้า 160–161 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | แอปเวอร์ชัน `v0.0.1` รันใน container ที่ `http://localhost:8080` ข้อมูลไม่หายเมื่อ restart และ rollback ได้ |

## 🎯 เป้าหมาย

นำ **Release ที่ทีมเพิ่งออก** ไปรันแบบเดียวกับบนเซิร์ฟเวอร์จริง: build เป็น image → รันเป็น container → ตรวจสุขภาพ → อัปเดตเวอร์ชัน → ย้อนกลับเวอร์ชัน

💡 **ทำไมต้อง Docker:** image หนึ่งตัวรวม Node.js + โค้ด + dependencies ไว้ครบ — เครื่องผู้พัฒนา เครื่อง CI และเซิร์ฟเวอร์จึงรัน "ของชิ้นเดียวกัน" ไม่มีปัญหา "เครื่องผมรันได้"

## 📋 ต้องมีก่อนเริ่ม

- Docker Desktop เปิดอยู่ (ไอคอนวาฬที่ taskbar ขึ้นว่า *Engine running*)
- repo ของทีมมี Release `v0.0.1` แล้ว (WS4.3)
- เปิด Terminal ที่ **ราก repo ของทีม** (โฟลเดอร์ที่มี `Dockerfile`)

> ถ้าใช้ repo หลักสูตรโดยตรง ให้ `cd practice-app` ก่อน

## 👉 ขั้นตอน

### ขั้นที่ 1 — อ่าน 3 ไฟล์ที่ใช้ Deploy (3 นาที)

| ไฟล์ | หน้าที่ | บรรทัดที่ควรสังเกต |
|---|---|---|
| `Dockerfile` | สูตรสร้าง image | `npm ci --omit=dev` (ไม่เอา dev tools) · `USER node` (ไม่รันเป็น root) · `HEALTHCHECK` |
| `.dockerignore` | ไฟล์ที่ **ไม่** ส่งเข้า image | `.env` และ `node_modules` — ความลับไม่ติดไปกับ image |
| `docker-compose.yml` | วิธีรัน container | `ports: 8080:3000` · `DEPLOY_TARGET: docker` · `volumes: app-data` |

💡 `8080:3000` แปลว่า "พอร์ต 8080 ของเครื่องเรา → พอร์ต 3000 ในกล่อง" (PM2 ใน WS4.6 ใช้ 3000 จึงเปิดพร้อมกันได้)

### ขั้นที่ 2 — ดึงโค้ดตาม Release

Deploy จาก **Tag** เสมอ ไม่ใช่จากโค้ดที่กำลังแก้อยู่

```bash
git switch main && git pull
git fetch --tags
git switch --detach v0.0.1
```

✅ **ต้องเห็น:** `HEAD is now at ... ` และ `git describe --tags` ตอบ `v0.0.1`

### ขั้นที่ 3 — Build และรัน

**Git Bash / macOS:**

```bash
APP_TAG=v0.0.1 docker compose up -d --build
```

**PowerShell:**

```powershell
$env:APP_TAG="v0.0.1"; docker compose up -d --build
```

ครั้งแรกใช้เวลา 1–2 นาที (ดาวน์โหลด `node:20-alpine`) ครั้งต่อไปเร็วขึ้นเพราะใช้ cache

```bash
docker compose ps
```

✅ **ต้องเห็น:** คอลัมน์ STATUS เป็น `Up ... (healthy)` (ถ้ายังเป็น `health: starting` รอ 10 วินาทีแล้วรันใหม่)

### ขั้นที่ 4 — ตรวจว่าเป็นเวอร์ชันที่ตั้งใจ

```bash
curl http://localhost:8080/api/health
```

✅ **ต้องเห็น:** `{"status":"ok","version":"0.0.1","runtime":"docker",...}`

เปิดเบราว์เซอร์ `http://localhost:8080` → หัวเว็บแสดง **v0.0.1 · รันบน docker** → ลองเพิ่มประกาศ 1 รายการ

💡 การตรวจ `/api/health` หลัง deploy ทุกครั้งเรียกว่า **smoke test** — ใช้แบบเดียวกันใน pipeline อัตโนมัติ

### ขั้นที่ 5 — ดู Log

```bash
docker compose logs -f app
```

รีเฟรชหน้าเว็บแล้วดู log → กด `Ctrl+C` เพื่อออก (container ยังทำงานต่อ)

### ขั้นที่ 6 — ข้อมูลอยู่รอดหรือไม่?

```bash
docker compose down        # ลบ container (แต่ไม่ลบ volume)
docker compose up -d       # สร้าง container ใหม่จาก image เดิม
```

รีเฟรช `http://localhost:8080`

✅ **ต้องเห็น:** ประกาศที่เพิ่มในขั้นที่ 4 **ยังอยู่** เพราะไฟล์ข้อมูลอยู่ใน volume `app-data` ไม่ได้อยู่ใน container

💡 container ถูกทิ้งแล้วสร้างใหม่ได้ตลอด — ของที่ต้องเก็บ (ข้อมูล, ไฟล์อัปโหลด) ต้องอยู่ใน volume หรือฐานข้อมูลภายนอกเสมอ

### ขั้นที่ 7 — อัปเดตเป็นเวอร์ชันใหม่ และ Rollback (ผู้สอนนำทำพร้อมกัน)

1. ทีมแก้ `"version"` ใน `package.json` เป็น `0.0.2` ผ่าน PR → merge → ออก Release `v0.0.2` (เหมือน WS4.3)
2. Deploy เวอร์ชันใหม่:

   ```bash
   git switch --detach v0.0.2
   APP_TAG=v0.0.2 docker compose up -d --build        # PowerShell: $env:APP_TAG="v0.0.2"; docker compose up -d --build
   curl http://localhost:8080/api/health               # version ต้องเป็น 0.0.2
   ```

3. สมมติว่าเวอร์ชันใหม่มีปัญหา → **Rollback** โดยไม่ต้อง build ใหม่ (image `v0.0.1` ยังอยู่ในเครื่อง):

   ```bash
   APP_TAG=v0.0.1 docker compose up -d                 # PowerShell: $env:APP_TAG="v0.0.1"; docker compose up -d
   curl http://localhost:8080/api/health               # version กลับเป็น 0.0.1
   docker image ls practice-app                        # เห็นทั้ง v0.0.1 และ v0.0.2
   ```

## 🔧 ถ้าไม่เป็นแบบนี้

| อาการ | สาเหตุ | แก้ |
|---|---|---|
| `error during connect ... dockerDesktopLinuxEngine` | Docker Desktop ยังไม่เปิด | เปิด Docker Desktop รอจนขึ้น *Engine running* |
| `port is already allocated` | มีโปรแกรมอื่นใช้ 8080 | `HOST_PORT=8081 APP_TAG=v0.0.1 docker compose up -d` แล้วเปิด `:8081` |
| `npm ci` ล้มตอน build | ไม่มีหรือไม่ตรง `package-lock.json` | รัน `npm install` ในเครื่อง → commit lockfile ผ่าน PR |
| STATUS เป็น `unhealthy` | แอปเริ่มไม่ขึ้น | `docker compose logs app` แล้วอ่านบรรทัดสุดท้าย |
| `version` ไม่เปลี่ยนหลังอัปเดต | ลืม `--build` หรือยังอยู่ tag เก่า | ตรวจ `git describe --tags` แล้ว build ใหม่ |

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] `docker compose ps` แสดง `(healthy)`
- [ ] `/api/health` ตอบ `runtime: docker` และ version ตรงกับ Tag ที่ deploy
- [ ] ข้อมูลยังอยู่หลัง `docker compose down` → `up -d`
- [ ] อธิบายได้ว่าทำไม `.env` ต้องอยู่ใน `.dockerignore`

## 🧪 ท้าทายเพิ่ม

- ลอง `docker compose down -v` แล้ว `up -d` — ข้อมูลยังอยู่ไหม? เพราะอะไร
- ดูขนาด image ด้วย `docker image ls` แล้วลองเปลี่ยน base image เป็น `node:20` (ไม่ใช่ alpine) เทียบขนาด
- เพิ่ม job `docker build` ใน `ci.yml` เพื่อให้ CI ตรวจว่า Dockerfile ยัง build ได้ทุก PR

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- ให้ TA รัน `docker pull node:20-alpine` บนเครื่องผู้เรียนตั้งแต่ช่วงลงทะเบียน (กันเน็ตห้องช้าตอนบ่าย)
- ผู้เรียนที่ Docker Desktop ใช้ไม่ได้ (ไม่มีสิทธิ์ Admin / ปิด Virtualization / WSL2 ไม่พร้อม) ให้จับคู่ดูเครื่องเพื่อน แล้วไปทำ WS4.6 PM2 บนเครื่องตัวเองซึ่งไม่ต้องใช้ Docker
- ขั้นที่ 7 ใช้เวลามากที่สุด — ถ้าเวลาไม่พอ ผู้สอนสาธิตบนจอแทน ให้ผู้เรียนทำแค่ขั้นที่ 1–6
- เชื่อมไป Day 2: UBU BioLink ใช้ `docker-compose.workshop.yml` ที่มี 2 service (api + web) — หลักการเดียวกัน แต่ web ต้องรอ api `healthy` ก่อน (`depends_on: condition: service_healthy`)
- บนเซิร์ฟเวอร์จริง ขั้นตอนเหมือนเดิมทุกอย่าง ต่างแค่รันผ่าน SSH และมี reverse proxy (nginx) + HTTPS ด้านหน้า

**ต่อไป →** [WS4.6 Deploy ด้วย PM2](ws-4.6-deploy-pm2.md)
