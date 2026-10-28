import { readFileSync } from 'node:fs';

// โหลดค่าจากไฟล์ .env ถ้ามี (Node 20.12+) — ใน Docker/PM2 ค่าจะมาจาก environment แทน
try {
  process.loadEnvFile();
} catch {
  // ไม่มีไฟล์ .env ก็ใช้ค่าเริ่มต้นด้านล่าง
}

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

export const config = {
  port: Number(process.env.PORT) || 3000,
  appTitle: process.env.APP_TITLE || 'บอร์ดประกาศหน่วยงาน',
  // บอกว่าแอปรันอยู่บนอะไร (local | docker | pm2) — ใช้ตรวจผล deploy ที่ /api/health
  runtime: process.env.DEPLOY_TARGET || 'local',
  // ถ้าตั้งค่า จะบันทึกประกาศลงไฟล์ JSON (ใช้กับ Docker volume) ถ้าไม่ตั้ง ข้อมูลอยู่ใน memory
  dataFile: process.env.DATA_FILE || '',
  version: pkg.version,
};
