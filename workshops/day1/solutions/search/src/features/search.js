// โมดูล B — ค้นหาประกาศ  ·  branch: feature/search  (เฉลย)
export function register(router, { store }) {
  router.get('/search', (req, res) => {
    const q = String(req.query.q ?? '').trim().toLowerCase();
    if (!q) return res.json(store.list());
    const found = store.list().filter((item) =>
      `${item.title} ${item.body}`.toLowerCase().includes(q),
    );
    res.json(found);
  });
}
