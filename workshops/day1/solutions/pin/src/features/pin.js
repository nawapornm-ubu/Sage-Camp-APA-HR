// โมดูล C — ปักหมุดประกาศ  ·  branch: feature/pin  (เฉลย)
export function register(router, { store }) {
  router.post('/announcements/:id/pin', (req, res) => {
    const id = Number(req.params.id);
    const item = store.get(id);
    if (!item) return res.status(404).json({ error: 'ไม่พบประกาศ' });
    res.json(store.update(id, { pinned: !item.pinned }));
  });
}
