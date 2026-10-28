// โมดูล E — สรุปสถิติ  ·  branch: feature/stats  (เฉลย)
export function init(ctx) {
  const box = document.createElement('div');
  box.className = 'box';
  ctx.panel.append(box);

  ctx.onReload(async () => {
    const { ok, data } = await ctx.api('/api/stats');
    if (!ok) return;
    box.textContent =
      `📊 ประกาศทั้งหมด ${data.total} · ปักหมุด ${data.pinned} · รับทราบรวม ${data.totalAcks}` +
      (data.latestTitle ? ` · ล่าสุด: ${data.latestTitle}` : '');
  });
}
