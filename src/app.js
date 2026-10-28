import express from 'express';
import { fileURLToPath } from 'node:url';
import { FEATURES } from './features/index.js';
import { validateAnnouncement } from './validation.js';

const publicDir = fileURLToPath(new URL('../public', import.meta.url));

export function createApp({ store, config }) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '10kb' }));
  app.use(express.static(publicDir));

  const api = express.Router();

  api.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      version: config.version,
      runtime: config.runtime,
      uptimeSeconds: Math.round(process.uptime()),
    });
  });

  api.get('/config', (req, res) => {
    res.json({ appTitle: config.appTitle, version: config.version, runtime: config.runtime });
  });

  // ฟีเจอร์ของแต่ละทีม (src/features/*.js) ลงทะเบียน route ก่อน route หลัก
  // เพื่อให้ path เฉพาะ เช่น /announcements/:id/pin ไม่ถูก route ทั่วไปจับไปก่อน
  for (const feature of FEATURES) {
    feature.register(api, { store, config });
  }

  api.get('/announcements', (req, res) => {
    res.json(store.list());
  });

  api.get('/announcements/:id', (req, res) => {
    const item = store.get(Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'ไม่พบประกาศ' });
    res.json(item);
  });

  api.post('/announcements', (req, res) => {
    const { errors, value } = validateAnnouncement(req.body);
    if (errors.length) return res.status(400).json({ error: errors.join(', ') });
    res.status(201).json(store.create(value));
  });

  api.delete('/announcements/:id', (req, res) => {
    if (!store.remove(Number(req.params.id))) return res.status(404).json({ error: 'ไม่พบประกาศ' });
    res.status(204).end();
  });

  api.use((req, res) => {
    res.status(404).json({ error: 'ไม่พบ endpoint' });
  });

  app.use('/api', api);

  // JSON ที่ส่งมาผิดรูปแบบ หรือ error อื่น ๆ — ไม่ส่ง stack trace กลับไปให้ผู้ใช้
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON ไม่ถูกต้อง' });
    console.error(err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในระบบ' });
  });

  return app;
}
