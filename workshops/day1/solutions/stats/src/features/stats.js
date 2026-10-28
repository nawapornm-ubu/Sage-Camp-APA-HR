// โมดูล E — สรุปสถิติ  ·  branch: feature/stats  (เฉลย)
// นับจากฟิลด์ของฟีเจอร์อื่น (pinned, acks) แบบไม่บังคับ — ถ้าฟีเจอร์นั้นยังไม่ merge ค่าจะเป็น 0
export function register(router, { store }) {
  router.get('/stats', (req, res) => {
    const items = store.list();
    res.json({
      total: items.length,
      pinned: items.filter((item) => item.pinned).length,
      totalAcks: items.reduce((sum, item) => sum + (item.acks || 0), 0),
      latestTitle: items[0]?.title ?? null,
    });
  });
}
