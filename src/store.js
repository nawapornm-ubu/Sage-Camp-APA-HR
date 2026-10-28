import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const SEED = [
  {
    id: 1,
    title: 'ยินดีต้อนรับสู่บอร์ดประกาศ',
    body: 'แอปนี้ใช้ฝึก Git, Pull Request, CI และการ Deploy ด้วย Docker / PM2',
    createdAt: '2026-10-01T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'ปิดปรับปรุงระบบเครือข่าย',
    body: 'วันเสาร์ 08:00–12:00 น. ระบบอินเทอร์เน็ตอาคาร 1 จะใช้งานไม่ได้ชั่วคราว',
    createdAt: '2026-10-01T09:05:00.000Z',
  },
];

// เก็บประกาศใน memory และ (ถ้ากำหนด dataFile) บันทึกลงไฟล์ JSON ทุกครั้งที่ข้อมูลเปลี่ยน
export function createStore({ dataFile = '' } = {}) {
  let items = structuredClone(SEED);

  if (dataFile && existsSync(dataFile)) {
    items = JSON.parse(readFileSync(dataFile, 'utf8'));
  }

  function save() {
    if (!dataFile) return;
    mkdirSync(dirname(dataFile), { recursive: true });
    writeFileSync(dataFile, JSON.stringify(items, null, 2));
  }

  return {
    list() {
      return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    get(id) {
      return items.find((item) => item.id === id);
    },
    create({ title, body }) {
      const id = items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      const item = { id, title, body, createdAt: new Date().toISOString() };
      items.push(item);
      save();
      return item;
    },
    // แก้ไขฟิลด์ใดก็ได้ของประกาศ (ยกเว้น id และ createdAt) — ฟีเจอร์ต่าง ๆ ใช้เพิ่มฟิลด์ของตัวเอง
    // เช่น { pinned: true } หรือ { category: 'ด่วน' } คืนค่า undefined ถ้าไม่พบ
    update(id, patch) {
      const item = items.find((it) => it.id === id);
      if (!item) return undefined;
      const { id: _id, createdAt: _createdAt, ...rest } = patch;
      Object.assign(item, rest, { updatedAt: new Date().toISOString() });
      save();
      return item;
    },
    remove(id) {
      const before = items.length;
      items = items.filter((item) => item.id !== id);
      if (items.length === before) return false;
      save();
      return true;
    },
  };
}
