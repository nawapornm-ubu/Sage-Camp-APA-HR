// โมดูล G — ส่งออก CSV  ·  branch: feature/export  (เฉลย)
const COLUMNS = ['id', 'title', 'body', 'createdAt'];

// ครอบด้วย "..." และเปลี่ยน " เป็น "" ตามมาตรฐาน CSV เพื่อรองรับ , และขึ้นบรรทัดใหม่ในข้อความ
// ข้อความที่ขึ้นต้นด้วย = + - @ ใส่ ' นำหน้า กัน Excel ตีความเป็นสูตร (CSV/Formula injection)
function csvCell(value) {
  let text = String(value ?? '');
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function register(router, { store }) {
  router.get('/export.csv', (req, res) => {
    const lines = [
      COLUMNS.join(','),
      ...store.list().map((item) => COLUMNS.map((col) => csvCell(item[col])).join(',')),
    ];
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="announcements.csv"');
    // ﻿ (BOM) ทำให้ Excel อ่านภาษาไทยถูกต้อง
    res.send('﻿' + lines.join('\r\n'));
  });
}
