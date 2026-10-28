// โมดูล G — ส่งออก CSV  ·  branch: feature/export  (เฉลย)
export function init(ctx) {
  const link = document.createElement('a');
  link.href = '/api/export.csv';
  link.textContent = '⬇️ ดาวน์โหลด CSV';
  link.setAttribute('download', 'announcements.csv');
  ctx.toolbar.append(link);
}
