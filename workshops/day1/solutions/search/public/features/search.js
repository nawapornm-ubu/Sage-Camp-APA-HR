// โมดูล B — ค้นหาประกาศ  ·  branch: feature/search  (เฉลย)
// กรองฝั่งหน้าเว็บทันทีที่พิมพ์ (API /api/search มีไว้ให้ระบบอื่นเรียกใช้และใช้ทดสอบ)
export function init(ctx) {
  const input = document.createElement('input');
  input.type = 'search';
  input.placeholder = 'ค้นหาประกาศ...';
  input.setAttribute('aria-label', 'ค้นหาประกาศ');
  input.oninput = () => ctx.render();
  ctx.toolbar.append(input);

  ctx.addFilter((item) => {
    const q = input.value.trim().toLowerCase();
    return !q || `${item.title} ${item.body}`.toLowerCase().includes(q);
  });
}
