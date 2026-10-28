// โมดูล H — ธีมมืด/สว่าง + เวลาแบบสัมพัทธ์  ·  branch: feature/theme  (เฉลย)
const STORAGE_KEY = 'practice-app-theme';

// แปลงเวลาเป็นข้อความ เช่น "เมื่อสักครู่" "5 นาทีที่แล้ว" — export ไว้ให้ test เรียกได้
export function relativeTime(date, now = new Date()) {
  const seconds = Math.round((now - new Date(date)) / 1000);
  if (seconds < 60) return 'เมื่อสักครู่';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} นาทีที่แล้ว`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
  return `${Math.floor(hours / 24)} วันที่แล้ว`;
}

function readTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // เบราว์เซอร์ปิด storage ก็ยังสลับธีมได้ แค่จำไม่ได้
  }
}

export function init(ctx) {
  const style = document.createElement('style');
  style.textContent = `
    :root[data-theme="dark"] { --bg: #111827; --card: #1f2937; --text: #f3f4f6; --muted: #9ca3af; --border: #374151; }
  `;
  document.head.append(style);

  const apply = (theme) => {
    document.documentElement.dataset.theme = theme;
    button.textContent = theme === 'dark' ? '☀️ โหมดสว่าง' : '🌙 โหมดมืด';
  };

  const button = document.createElement('button');
  button.onclick = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    saveTheme(next);
    apply(next);
  };
  ctx.header.append(button);
  apply(readTheme() || 'light');

  ctx.addItemHook((item, { time }) => {
    time.title = time.textContent;
    time.textContent = relativeTime(item.createdAt);
  });
  ctx.render();
}
