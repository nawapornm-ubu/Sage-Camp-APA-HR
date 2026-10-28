// กติกาตรวจข้อมูลประกาศ — ใช้ร่วมกันทั้งตอนสร้าง (POST) และแก้ไข (ฟีเจอร์ edit)
export const TITLE_MAX = 120;
export const BODY_MAX = 1000;

export function validateAnnouncement(input) {
  const title = typeof input?.title === 'string' ? input.title.trim() : '';
  const body = typeof input?.body === 'string' ? input.body.trim() : '';
  const errors = [];
  if (title.length < 1 || title.length > TITLE_MAX) errors.push(`title ต้องยาว 1–${TITLE_MAX} ตัวอักษร`);
  if (body.length > BODY_MAX) errors.push(`body ต้องยาวไม่เกิน ${BODY_MAX} ตัวอักษร`);
  return { errors, value: { title, body } };
}
