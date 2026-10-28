// โมดูล D — หมวดหมู่ประกาศ  ·  branch: feature/category  (เฉลย)
const DEFAULT = 'ทั่วไป';

export async function init(ctx) {
  const { data: categories } = await ctx.api('/api/categories');

  // ตัวกรองหมวดหมู่ในแถบเครื่องมือ
  const filter = document.createElement('select');
  filter.setAttribute('aria-label', 'กรองตามหมวดหมู่');
  filter.append(new Option('ทุกหมวดหมู่', ''), ...categories.map((c) => new Option(c, c)));
  filter.onchange = () => ctx.render();
  ctx.toolbar.append(filter);
  ctx.addFilter((item) => !filter.value || (item.category || DEFAULT) === filter.value);

  // ป้ายหมวดหมู่ + ตัวเลือกเปลี่ยนหมวดหมู่ในแต่ละการ์ด
  ctx.addItemHook((item, { title, actions }) => {
    const current = item.category || DEFAULT;
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = current;
    title.prepend(badge);

    const select = document.createElement('select');
    select.setAttribute('aria-label', 'เปลี่ยนหมวดหมู่');
    select.append(...categories.map((c) => new Option(c, c, false, c === current)));
    select.onchange = async () => {
      const res = await ctx.api(`/api/announcements/${item.id}/category`, {
        method: 'PUT',
        body: { category: select.value },
      });
      if (!res.ok) return ctx.notify(res.data.error);
      ctx.reload();
    };
    actions.prepend(select);
  });

  ctx.render();
}
