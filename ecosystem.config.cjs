// Deploy ด้วย PM2:  pm2 start ecosystem.config.cjs
// เปิดเว็บที่ http://localhost:3000
module.exports = {
  apps: [
    {
      name: 'practice-app',
      script: 'src/server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      // ถ้าแอปใช้หน่วยความจำเกินนี้ PM2 จะ restart ให้เอง
      max_memory_restart: '200M',
      // ถ้าแอปล่มติดกันเร็ว ๆ ให้รอนานขึ้นเรื่อย ๆ ก่อน restart
      exp_backoff_restart_delay: 200,
      time: true,
      out_file: 'logs/out.log',
      error_file: 'logs/error.log',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DEPLOY_TARGET: 'pm2',
        DATA_FILE: 'data/announcements.json',
      },
    },
  ],
};
