import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMaxTokens } from '../scripts/ai-review-config.js';

test('ใช้ค่าเริ่มต้น 4096 เมื่อไม่ได้กำหนด OPENROUTER_MAX_TOKENS', () => {
  assert.equal(parseMaxTokens(undefined), 4096);
});

test('แปลงค่าจำนวนเต็มบวกที่กำหนดเองเป็น number', () => {
  assert.equal(parseMaxTokens('2048'), 2048);
});

test('ปฏิเสธค่าว่างและค่าที่ไม่ใช่จำนวนเต็มบวก', () => {
  for (const value of ['', 'abc', '0', '-1', '1.5', '9007199254740992']) {
    assert.throws(() => parseMaxTokens(value), /OPENROUTER_MAX_TOKENS/);
  }
});