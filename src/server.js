import { config } from './config.js';
import { createApp } from './app.js';
import { createStore } from './store.js';

const store = createStore({ dataFile: config.dataFile });
const app = createApp({ store, config });

const server = app.listen(config.port, () => {
  console.log(`[practice-app] v${config.version} (${config.runtime}) → http://localhost:${config.port}`);
});

// Docker (docker stop) และ PM2 (pm2 stop/restart) ส่งสัญญาณนี้มา — ปิด server ให้เรียบร้อยก่อนออก
function shutdown(signal) {
  console.log(`[practice-app] ได้รับ ${signal} กำลังปิด...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000).unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
