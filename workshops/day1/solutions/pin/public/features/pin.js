// โมดูล C — ปักหมุดประกาศ  ·  branch: feature/pin  (เฉลย)
export function init(ctx) {
  // ประกาศที่ปักหมุดขึ้นก่อนเสมอ
  ctx.addSorter((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));

  ctx.addItemHook((item, { title, actions }) => {
    if (item.pinned) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = '📌 ปักหมุด';
      title.prepend(badge);
    }
    const button = document.createElement('button');
    button.className = 'link';
    button.textContent = item.pinned ? 'เลิกปักหมุด' : 'ปักหมุด';
    button.onclick = async () => {
      const res = await ctx.api(`/api/announcements/${item.id}/pin`, { method: 'POST' });
      if (!res.ok) return ctx.notify(res.data.error);
      ctx.reload();
    };
    actions.prepend(button);
  });
}
