// โมดูล D — หมวดหมู่ประกาศ  ·  branch: feature/category  (เฉลย)
export const CATEGORIES = ['ทั่วไป', 'ด่วน', 'กิจกรรม'];

export function register(router, { store }) {
  router.get('/categories', (req, res) => {
    res.json(CATEGORIES);
  });

  router.put('/announcements/:id/category', (req, res) => {
    const id = Number(req.params.id);
    if (!store.get(id)) return res.status(404).json({ error: 'ไม่พบประกาศ' });
    const category = req.body?.category;
    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({ error: `category ต้องเป็นหนึ่งใน: ${CATEGORIES.join(', ')}` });
    }
    res.json(store.update(id, { category }));
  });
}
