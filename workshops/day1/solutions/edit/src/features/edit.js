// โมดูล A — แก้ไขประกาศ  ·  branch: feature/edit  (เฉลย)
import { validateAnnouncement } from '../validation.js';

export function register(router, { store }) {
  router.patch('/announcements/:id', (req, res) => {
    const id = Number(req.params.id);
    const current = store.get(id);
    if (!current) return res.status(404).json({ error: 'ไม่พบประกาศ' });

    // ส่งมาเฉพาะฟิลด์ที่จะแก้ก็ได้ ฟิลด์ที่ไม่ส่งใช้ค่าเดิม
    const { errors, value } = validateAnnouncement({
      title: req.body?.title ?? current.title,
      body: req.body?.body ?? current.body,
    });
    if (errors.length) return res.status(400).json({ error: errors.join(', ') });

    res.json(store.update(id, value));
  });
}
