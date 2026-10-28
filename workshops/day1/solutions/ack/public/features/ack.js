// โมดูล F — ปุ่มรับทราบ  ·  branch: feature/ack  (เฉลย)
export function init(ctx) {
  ctx.addItemHook((item, { actions }) => {
    const button = document.createElement('button');
    button.textContent = `👍 รับทราบ (${item.acks || 0})`;
    button.onclick = async () => {
      const res = await ctx.api(`/api/announcements/${item.id}/ack`, { method: 'POST' });
      if (!res.ok) return ctx.notify(res.data.error);
      button.textContent = `👍 รับทราบ (${res.data.acks})`;
      item.acks = res.data.acks;
    };
    actions.prepend(button);
  });
}
