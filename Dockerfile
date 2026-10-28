FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# ติดตั้ง dependencies ก่อนคัดลอกโค้ด เพื่อให้ Docker ใช้ cache ได้เมื่อแก้แค่โค้ด
COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY public ./public

# โฟลเดอร์ข้อมูล (mount volume ทับใน docker-compose.yml) — ให้ผู้ใช้ node เขียนได้
RUN mkdir -p /app/data && chown node:node /app/data
USER node

EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1
CMD ["node", "src/server.js"]
