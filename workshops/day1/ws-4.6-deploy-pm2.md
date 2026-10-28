# WS4.6 — Deploy ด้วย PM2

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 4 (ต่อจาก WS4.5) |
| **เวลา** | 20 นาที |
| **รูปแบบ** | รายบุคคลบนเครื่องตัวเอง |
| **สไลด์** | หน้า 162–163 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | แอปรันภายใต้ PM2 ที่ `http://localhost:3000` ฟื้นตัวเองเมื่อ process ตาย และอัปเดตเวอร์ชันด้วย `pm2 reload` ได้ |

## 🎯 เป้าหมาย

รันแอป Node.js **บนเซิร์ฟเวอร์โดยตรง (ไม่มี container)** ด้วย PM2 ซึ่งเป็นตัวจัดการ process ที่หน่วยงานจำนวนมากใช้อยู่ แล้วเทียบกับ Docker ว่าเหมาะกับงานแบบไหน

💡 **PM2 ทำอะไรให้:** รันแอปเป็นเบื้องหลัง · restart อัตโนมัติเมื่อแอปล่ม · เก็บ log แยกไฟล์ · reload เวอร์ชันใหม่ด้วยคำสั่งเดียว · เปิดแอปเองเมื่อเครื่องบูต (Linux)

## 📋 ต้องมีก่อนเริ่ม

- Node.js 20.12 ขึ้นไป (`node -v`)
- ทำ WS4.5 เสร็จแล้ว (container ยังรันที่ 8080 ได้ — ไม่ชนกับ 3000)
- Terminal อยู่ที่ราก repo ของทีม (หรือ `practice-app/` ถ้าใช้ repo หลักสูตร)

## 👉 ขั้นตอน

### ขั้นที่ 1 — ติดตั้ง PM2

```bash
npm install -g pm2
pm2 -v
```

✅ **ต้องเห็น:** เลขเวอร์ชัน เช่น `5.x.x`

### ขั้นที่ 2 — อ่าน `ecosystem.config.cjs` (2 นาที)

| ค่า | ความหมาย |
|---|---|
| `script: 'src/server.js'` | ไฟล์ที่ PM2 รัน |
| `max_memory_restart: '200M'` | ใช้หน่วยความจำเกิน → restart ให้เอง |
| `exp_backoff_restart_delay` | ล่มติดกัน → รอนานขึ้นเรื่อย ๆ ก่อน restart (กันวนลูป) |
| `out_file` / `error_file` | log อยู่ในโฟลเดอร์ `logs/` |
| `env: { DEPLOY_TARGET: 'pm2', DATA_FILE: ... }` | ค่า environment ของ production — **ห้ามใส่ความลับในไฟล์นี้** เพราะไฟล์นี้ถูก commit |

💡 ไฟล์นี้คือ "docker-compose.yml ของ PM2" — บอกวิธีรันไว้ใน repo แทนที่จะจำคำสั่งยาว ๆ

### ขั้นที่ 3 — เตรียมโค้ดตาม Release และติดตั้ง dependencies

```bash
git switch --detach v0.0.1
npm ci --omit=dev
```

💡 `--omit=dev` = ติดตั้งเฉพาะที่ต้องใช้ตอนรันจริง เหมือนใน `Dockerfile`

### ขั้นที่ 4 — Start

```bash
pm2 start ecosystem.config.cjs
pm2 status
```

✅ **ต้องเห็น:** แถว `practice-app` สถานะ `online`

> ครั้งแรกอาจเห็น `[PM2][WARN] Folder does not exist: ...\logs` — ไม่เป็นไร PM2 สร้างโฟลเดอร์ให้เอง

```bash
curl http://localhost:3000/api/health
```

✅ **ต้องเห็น:** `"runtime":"pm2"` และ `"version":"0.0.1"`

เปิด `http://localhost:3000` คู่กับ `http://localhost:8080` (Docker) → หัวเว็บบอก runtime ต่างกัน ข้อมูลแยกกัน

### ขั้นที่ 5 — Log และ Monitor

```bash
pm2 logs practice-app --lines 20     # Ctrl+C เพื่อออก
pm2 monit                            # CPU / Memory แบบ real-time — กด q เพื่อออก
```

### ขั้นที่ 6 — ทดสอบการฟื้นตัวเอง

ดูเลข `pid` และคอลัมน์ `↺` (จำนวนครั้งที่ restart) จาก `pm2 status` แล้ว "ฆ่า" process ทิ้ง:

**Windows (PowerShell):**

```powershell
taskkill /PID <pid> /F
```

**macOS / Linux:**

```bash
kill -9 <pid>
```

```bash
pm2 status
```

✅ **ต้องเห็น:** สถานะกลับเป็น `online` เอง · `pid` เปลี่ยน · `↺` เพิ่มขึ้น 1 · เว็บยังเปิดได้

💡 ถ้ารันด้วย `node src/server.js` ธรรมดา process ตายแล้วเว็บล่มจนกว่าจะมีคนมาสั่งใหม่

### ขั้นที่ 7 — อัปเดตเป็นเวอร์ชันใหม่

```bash
git switch --detach v0.0.2          # Release ที่ออกใน WS4.5 ขั้นที่ 7
npm ci --omit=dev                   # ติดตั้งใหม่เผื่อ dependencies เปลี่ยน
pm2 reload practice-app
curl http://localhost:3000/api/health   # version ต้องเป็น 0.0.2
```

Rollback = ทำแบบเดียวกันด้วย `v0.0.1`

💡 ประกาศที่เพิ่มไว้ยังอยู่หลัง reload เพราะ `DATA_FILE` เก็บไว้ที่ `data/announcements.json` นอกโค้ด

### ขั้นที่ 8 — (อ่าน) ให้แอปขึ้นเองเมื่อเซิร์ฟเวอร์รีบูต — Linux เท่านั้น

```bash
pm2 save          # บันทึกรายการแอปที่รันอยู่
pm2 startup       # พิมพ์คำสั่ง sudo ออกมา 1 บรรทัด → คัดลอกไปรัน
```

> `pm2 startup` **ใช้ไม่ได้บน Windows** — วันนี้ผู้สอนสาธิตบนเซิร์ฟเวอร์ Linux ให้ดู

### ขั้นที่ 9 — เก็บกวาด (ก่อนจบวัน)

```bash
pm2 delete practice-app
docker compose down
git switch main
```

## ⚖️ Docker หรือ PM2?

| | Docker (WS4.5) | PM2 (WS4.6) |
|---|---|---|
| สิ่งที่ต้องมีบนเซิร์ฟเวอร์ | Docker Engine | Node.js เวอร์ชันที่ตรงกับแอป + PM2 |
| สิ่งที่ส่งไป deploy | Image (รวม Node + โค้ด + dependencies) | โค้ด แล้ว `npm ci` บนเซิร์ฟเวอร์ |
| แยกสภาพแวดล้อม | แยกขาด หลายแอปต่างเวอร์ชัน Node อยู่เครื่องเดียวกันได้ | ใช้ Node ของเครื่องร่วมกัน |
| ฟื้นตัวเมื่อล่ม | `restart: unless-stopped` + healthcheck | autorestart + `max_memory_restart` |
| Rollback | สลับ image tag (ไม่ต้อง build ใหม่) | switch tag → `npm ci` → `pm2 reload` |
| เหมาะกับ | ระบบหลาย service, ทีมหลายคน, ย้ายเซิร์ฟเวอร์บ่อย | เซิร์ฟเวอร์เดิมของหน่วยงานที่มี Node อยู่แล้ว, แอปเดี่ยว, ทรัพยากรน้อย |

## 🔧 ถ้าไม่เป็นแบบนี้

| อาการ | สาเหตุ | แก้ |
|---|---|---|
| `pm2: command not found` | PATH ยังไม่รู้จัก global npm | ปิด-เปิด Terminal ใหม่ หรือใช้ `npx pm2 ...` |
| สถานะ `errored` | แอปเริ่มไม่ขึ้น | `pm2 logs practice-app --err --lines 30` |
| `EADDRINUSE :::3000` | มีโปรแกรมอื่นใช้ 3000 (เช่น `npm run dev` ค้างอยู่) | ปิดโปรแกรมนั้น หรือแก้ `PORT` ใน `ecosystem.config.cjs` |
| `runtime` เป็น `local` ไม่ใช่ `pm2` | สั่ง `pm2 start src/server.js` ตรง ๆ แทนไฟล์ ecosystem | `pm2 delete practice-app` แล้ว start ด้วย `ecosystem.config.cjs` |
| version ไม่เปลี่ยนหลัง reload | ยังอยู่ tag เดิม | ตรวจ `git describe --tags` |

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] `pm2 status` แสดง `online` และ `/api/health` ตอบ `runtime: pm2`
- [ ] ฆ่า process แล้ว PM2 ฟื้นเอง (`↺` เพิ่ม)
- [ ] `pm2 reload` แล้ว version เปลี่ยนตาม Tag
- [ ] อธิบายได้ 1 ข้อว่าเมื่อไรควรเลือก Docker และเมื่อไรควรเลือก PM2

## 🧪 ท้าทายเพิ่ม

- เปลี่ยน `instances: 2` และ `exec_mode: 'cluster'` → `pm2 reload` แล้วดูว่ามีกี่ process (ข้อมูลใน memory จะแยกกันอย่างไร?)
- ใช้ `pm2 logs --json` หรือ `pm2 install pm2-logrotate` เพื่อจัดการ log ไม่ให้เต็มดิสก์

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- เครื่องที่ติดตั้ง Node ผ่าน nvm-windows: `npm install -g pm2` ต้องทำใหม่ถ้าสลับเวอร์ชัน Node
- องค์กรที่บล็อก `npm install -g` ให้ใช้ `npx pm2@5 start ecosystem.config.cjs` แทนทุกคำสั่ง
- **สาธิตบนเซิร์ฟเวอร์ Linux (ถ้ามี):** `ssh` เข้าเครื่อง → `git clone` → `npm ci --omit=dev` → `pm2 start ecosystem.config.cjs` → `pm2 save` → `pm2 startup` → รีบูต → แอปขึ้นเอง ใช้เวลา ~5 นาที แล้วชี้ว่าขั้นตอนเดียวกันนี้ใส่ใน GitHub Actions (SSH) ได้ = CI/CD เบื้องต้น
- เชื่อมไป Day 2: ทีม DevOps ของ UBU BioLink จะเขียน `ecosystem.config.cjs` ที่มี 2 แอป (api `:4000` + web `:3000`) — เว็บ Next.js ต้อง `npm run build` ก่อน `next start` และค่า `API_INTERNAL_URL` ถูกฝังตอน build

**ต่อไป →** [WS4.4 จัดทีมและเขียน Working Agreement](ws-4.4-team-setup.md)
