# WS1.1 — ตรวจและติดตั้งเครื่องมือ

| | |
|---|---|
| **ตำแหน่ง** | Day 1 · Session 1 |
| **เวลา** | 25 นาที |
| **รูปแบบ** | รายบุคคล (เสร็จก่อนให้ช่วยเพื่อนข้างเคียง) |
| **สไลด์** | หน้า 17–20 (UBU SAGE Camp v2) |
| **ผลลัพธ์** | เครื่องของคุณพร้อมทำงานครบ: Git, Node.js 24, Docker, GitHub CLI, VS Code และล็อกอิน GitHub แล้ว |

## 🎯 เป้าหมาย

ยืนยันว่าเครื่องมือทุกตัวใช้งานได้ **ก่อน** ที่เราจะเริ่มทำงานจริง — ถ้าขาดตัวใดตัวหนึ่ง คุณจะติดกลางทางและเสียเวลามากกว่าตรวจตอนนี้

## 📋 ต้องมีก่อนเริ่ม

- Notebook (Windows 10/11 หรือ macOS) สิทธิ์ติดตั้งโปรแกรม
- บัญชี GitHub ที่เปิด 2FA แล้ว (ใช้บัญชีส่วนตัวได้ — Module Lead ของทีมจะเชิญเข้า repo ทีมใน WS1.2)

## 👉 ขั้นตอน

### ขั้นที่ 1 — เปิด Terminal

- **Windows:** กดปุ่ม Windows พิมพ์ `PowerShell` แล้วกด Enter
- **macOS:** กด `Cmd + Space` พิมพ์ `Terminal` แล้วกด Enter

### ขั้นที่ 2 — ตรวจเครื่องมือทั้ง 5 ตัว

พิมพ์ทีละบรรทัด กด Enter แล้วดูผล:

```bash
git --version
node -v
docker --version
gh --version
code --version
```

✅ **ต้องเห็น:** ทุกคำสั่งแสดงเลขเวอร์ชัน และ `node -v` ขึ้นต้นด้วย **v24**

### ขั้นที่ 3 — ติดตั้งตัวที่ขาด

| ตัวที่ขาด | ดาวน์โหลด | Windows (winget) | macOS (Homebrew) |
|---|---|---|---|
| Visual Studio Code | https://code.visualstudio.com/ | `winget install Microsoft.VisualStudioCode` | `brew install --cask visual-studio-code` |
| Git | https://git-scm.com/ | `winget install Git.Git` | `brew install git` |
| Node.js 24 LTS | https://nodejs.org/ | `winget install OpenJS.NodeJS.LTS` | `brew install node` |
| GitHub CLI | https://cli.github.com/ | `winget install GitHub.cli` | `brew install gh` |
| Docker Desktop | https://www.docker.com/products/docker-desktop/ | `winget install Docker.DockerDesktop` | `brew install --cask docker` |

> หลังติดตั้งเสร็จ **ต้องปิด Terminal แล้วเปิดใหม่** ไม่งั้น Terminal เดิมยังไม่เห็นโปรแกรมที่เพิ่งติดตั้ง

🔧 **ถ้าไม่เป็นแบบนี้**

- `node -v` ขึ้น v18 / v20 → ติดตั้ง Node.js 24 LTS ทับ แล้วเปิด Terminal ใหม่
- Windows ไม่มีคำสั่ง `winget` → ใช้ลิงก์ดาวน์โหลดแทน
- ติดตั้ง Docker Desktop แล้วให้ Restart เครื่อง (อาจต้องเปิด WSL 2 / Virtualization — ถาม TA)

### ขั้นที่ 4 — ตั้งชื่อและอีเมลให้ Git

```bash
git config --global user.name "ชื่อ นามสกุล"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global --list
```

💡 ชื่อและอีเมลนี้จะติดอยู่กับทุก commit ของคุณ ใช้อีเมลเดียวกับที่ผูกกับบัญชี GitHub
(หรืออีเมล `noreply` ของ GitHub ถ้าไม่ต้องการเปิดเผยอีเมลจริง)

### ขั้นที่ 5 — ล็อกอิน GitHub ด้วย `gh`

```bash
gh auth login
gh auth status
```

ตอบคำถามด้วยลูกศรขึ้น/ลง แล้วกด Enter:

1. `GitHub.com`
2. `HTTPS` → ถามว่า authenticate Git ด้วยหรือไม่ ตอบ `Yes`
3. `Login with a web browser`
4. จด **รหัส 8 ตัว** แล้วกด Enter → เบราว์เซอร์เปิดหน้า GitHub → วางรหัส → กด Continue → **Authorize**
5. กลับมาที่ Terminal

✅ **ต้องเห็น:** `✓ Logged in to github.com as <ชื่อบัญชีของคุณ>`

🔧 **ถ้าไม่เป็นแบบนี้**

- เบราว์เซอร์ไม่เปิดเอง → ไปที่ https://github.com/login/device แล้ววางรหัสเอง
- GitHub ให้ยืนยัน 2FA → เปิดแอป Authenticator ในมือถือแล้วกรอกรหัส

### ขั้นที่ 6 — เปิด Docker Desktop

1. เปิดโปรแกรม **Docker Desktop** รอจนมุมล่างซ้ายขึ้น **Engine running**
2. ทดสอบ:

```bash
docker run --rm hello-world
docker compose version
```

✅ **ต้องเห็น:** ข้อความ `Hello from Docker!` และเลขเวอร์ชันของ Compose

### ขั้นที่ 7 — ติดตั้ง Extension (ทำได้ถ้าเหลือเวลา)

เปิด VS Code → แท็บ Extensions (`Ctrl+Shift+X`) → ค้นหาแล้วกด Install:

- **Cline**
- **Kilo Code**

(ใช้ใน Day 2 — ถ้ายังไม่ทัน ติดตั้งตอนเช้าวันที่ 2 ได้)

## ✅ Checkpoint (ตรวจตัวเอง)

- [ ] `git --version`, `node -v` (v24), `docker --version`, `gh --version`, `code --version` ผ่านทั้งหมด
- [ ] `git config --global --list` เห็น `user.name` และ `user.email`
- [ ] `gh auth status` ขึ้น Logged in
- [ ] Docker Desktop สถานะ Engine running และ `docker run --rm hello-world` ผ่าน

## 🧪 ท้าทายเพิ่ม

- ช่วยเพื่อนข้างเคียงที่ยังติดอยู่ (การสอนคนอื่นคือการทบทวนที่ดีที่สุด)
- เปิด VS Code → `Ctrl+Shift+P` → พิมพ์ `Shell Command: Install 'code' command in PATH` (macOS) เพื่อให้พิมพ์ `code .` ได้

## 🧑‍🏫 หมายเหตุสำหรับผู้สอน/TA

- เตรียมเครื่องสำรองและตัวติดตั้งออฟไลน์ (ดู [00-instructor-prep.md](../00-instructor-prep.md) หัวข้อ F)
- ปัญหาที่พบบ่อยที่สุด: (1) ไม่ได้ปิด-เปิด Terminal หลังติดตั้ง (2) Docker Desktop ต้อง Restart เครื่องหรือเปิด WSL 2 (3) Node เวอร์ชันเก่าค้างใน PATH
- ระหว่าง Workshop นี้ให้ TA ช่วย `docker compose pull` (ดึง image PostgreSQL) บนเครื่องที่เน็ตช้า เพื่อไม่ให้ไปช้าใน Day 2
- ความรู้เสริมสำหรับสอน: อธิบายว่า `gh` คือเครื่องมือที่ช่วยทำงานกับ GitHub ผ่าน Terminal (สร้าง PR/Issue/Release) จะใช้ต่อใน WS2.1 และ WS4.3

**ต่อไป →** [WS1.2 สร้าง repo ทีม + Commit แรก](ws-1.2-first-commit.md)
