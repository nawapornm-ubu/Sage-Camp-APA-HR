// ไฟล์ร่วม — แกนหลักของหน้าเว็บ (โหลดรายการ แสดงการ์ด ฟอร์มเพิ่มประกาศ)
// ฟีเจอร์ของแต่ละทีมอยู่ใน public/features/<ชื่อ>.js และได้รับ ctx ด้านล่างผ่าน init(ctx)
//
// ctx ที่ฟีเจอร์ใช้ได้:
//   ctx.api(path, options)   เรียก API → { ok, status, data }  เช่น ctx.api('/api/stats')
//   ctx.reload()             โหลดรายการจาก server ใหม่แล้ววาดหน้าใหม่
//   ctx.render()             วาดรายการใหม่จากข้อมูลเดิม (ใช้หลังเปลี่ยนตัวกรอง)
//   ctx.getItems()           รายการประกาศล่าสุดที่โหลดมา
//   ctx.addItemHook(fn)      fn(item, parts) ถูกเรียกทุกการ์ด — parts = { card, title, body, meta, time, actions }
//   ctx.addFilter(fn)        fn(item) → true = แสดง / false = ซ่อน
//   ctx.addSorter(fn)        fn(a, b) แบบ Array.sort — ตัวที่เพิ่มก่อนมีผลก่อน
//   ctx.onReload(fn)         fn(items) ถูกเรียกทุกครั้งหลังโหลดรายการใหม่
//   ctx.toolbar              แถบเครื่องมือเหนือรายการ (ใส่ช่องค้นหา ตัวกรอง ปุ่ม)
//   ctx.panel                พื้นที่ใต้ฟอร์ม (ใส่กล่องสรุป)
//   ctx.header               หัวเว็บ (ใส่ปุ่มสลับธีม)
//   ctx.notify(message)      แสดงข้อความแจ้งเตือนสั้น ๆ
import { FEATURES } from './features/index.js';

const list = document.getElementById('list');
const form = document.getElementById('form');
const notice = document.getElementById('notice');

let items = [];
const itemHooks = [];
const filters = [];
const sorters = [];
const reloadHooks = [];

async function api(path, options = {}) {
  const init = { ...options };
  if (init.body !== undefined && typeof init.body !== 'string') {
    init.headers = { 'content-type': 'application/json', ...init.headers };
    init.body = JSON.stringify(init.body);
  }
  const res = await fetch(path, init);
  const type = res.headers.get('content-type') || '';
  const data = type.includes('application/json') ? await res.json() : await res.text();
  return { ok: res.ok, status: res.status, data };
}

function notify(message) {
  notice.textContent = message;
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => { notice.textContent = ''; }, 4000);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderCard(item) {
  const card = el('article', 'item');
  const title = el('h2', '', item.title);
  const body = el('p', '', item.body);
  const meta = el('div', 'meta');
  const time = el('span', 'time', new Date(item.createdAt).toLocaleString('th-TH'));
  const actions = el('div', 'actions');
  const del = el('button', 'link', 'ลบ');
  del.onclick = async () => {
    await api(`/api/announcements/${item.id}`, { method: 'DELETE' });
    reload();
  };
  actions.append(del);
  meta.append(time, actions);
  card.append(title, body, meta);
  for (const hook of itemHooks) hook(item, { card, title, body, meta, time, actions });
  return card;
}

function render() {
  const visible = items.filter((item) => filters.every((fn) => fn(item)));
  visible.sort((a, b) => {
    for (const fn of sorters) {
      const result = fn(a, b);
      if (result) return result;
    }
    return 0;
  });
  list.replaceChildren(...visible.map(renderCard));
  if (!visible.length) list.append(el('p', 'empty', 'ไม่มีประกาศ'));
}

async function reload() {
  const res = await api('/api/announcements');
  items = res.ok ? res.data : [];
  render();
  for (const hook of reloadHooks) hook(items);
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const res = await api('/api/announcements', { method: 'POST', body: Object.fromEntries(new FormData(form)) });
  if (!res.ok) return notify(res.data.error);
  form.reset();
  reload();
};

const ctx = {
  api,
  reload,
  render,
  notify,
  getItems: () => items,
  addItemHook: (fn) => itemHooks.push(fn),
  addFilter: (fn) => filters.push(fn),
  addSorter: (fn) => sorters.push(fn),
  onReload: (fn) => reloadHooks.push(fn),
  toolbar: document.getElementById('toolbar'),
  panel: document.getElementById('panel'),
  header: document.querySelector('header'),
};

// ฟีเจอร์หนึ่งพังต้องไม่ทำให้ทั้งหน้าพัง (init จะเป็น async ก็ได้)
for (const [name, feature] of Object.entries(FEATURES)) {
  Promise.resolve()
    .then(() => feature.init(ctx))
    .catch((err) => console.error(`[feature:${name}]`, err));
}

api('/api/config').then(({ data }) => {
  document.getElementById('title').textContent = data.appTitle;
  document.title = data.appTitle;
  document.getElementById('runtime').textContent = `v${data.version} · รันบน ${data.runtime}`;
});
reload();
