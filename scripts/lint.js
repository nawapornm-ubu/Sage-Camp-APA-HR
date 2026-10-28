// Lint อย่างง่ายโดยไม่ต้องติดตั้งแพ็กเกจเพิ่ม: ตรวจ syntax ของไฟล์ .js ทุกไฟล์ด้วย node --check
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const dirs = ['src', 'src/features', 'public', 'public/features', 'test', 'scripts'];
let failed = 0;

for (const dir of dirs) {
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.js'))) {
    const path = join(dir, file);
    try {
      execFileSync(process.execPath, ['--check', path], { stdio: 'pipe' });
    } catch (err) {
      failed += 1;
      console.error(`✗ ${path}\n${err.stderr}`);
    }
  }
}

if (failed) {
  console.error(`lint ไม่ผ่าน ${failed} ไฟล์`);
  process.exit(1);
}
console.log('lint ผ่าน');
