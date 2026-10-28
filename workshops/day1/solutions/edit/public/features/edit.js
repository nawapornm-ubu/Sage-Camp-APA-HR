// โมดูล A — แก้ไขประกาศ  ·  branch: feature/edit  (เฉลย)
export function init(ctx) {
  ctx.addItemHook((item, { actions }) => {
    const button = document.createElement('button');
    button.className = 'link';
    button.textContent = 'แก้ไข';
    button.onclick = async () => {
      const title = prompt('หัวข้อใหม่', item.title);
      if (title === null) return;
      const body = prompt('รายละเอียดใหม่', item.body);
      if (body === null) return;
      const res = await ctx.api(`/api/announcements/${item.id}`, { method: 'PATCH', body: { title, body } });
      if (!res.ok) return ctx.notify(res.data.error);
      ctx.notify('บันทึกการแก้ไขแล้ว');
      ctx.reload();
    };
    actions.prepend(button);
  });
}
