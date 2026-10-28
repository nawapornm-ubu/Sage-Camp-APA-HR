// โมดูล F — ปุ่มรับทราบ  ·  branch: feature/ack  (เฉลย)
export function register(router, { store }) {
  router.post('/announcements/:id/ack', (req, res) => {
    const id = Number(req.params.id);
    const item = store.get(id);
    if (!item) return res.status(404).json({ error: 'ไม่พบประกาศ' });
    const updated = store.update(id, { acks: (item.acks || 0) + 1 });
    res.json({ id, acks: updated.acks });
  });
}
