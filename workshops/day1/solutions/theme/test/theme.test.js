import { test } from 'node:test';
import assert from 'node:assert/strict';
import { relativeTime } from '../public/features/theme.js';

const now = new Date('2026-10-28T10:00:00Z');

test('relativeTime แปลงเวลาเป็นข้อความภาษาไทย', () => {
  assert.equal(relativeTime('2026-10-28T09:59:30Z', now), 'เมื่อสักครู่');
  assert.equal(relativeTime('2026-10-28T09:55:00Z', now), '5 นาทีที่แล้ว');
  assert.equal(relativeTime('2026-10-28T07:00:00Z', now), '3 ชั่วโมงที่แล้ว');
  assert.equal(relativeTime('2026-10-26T10:00:00Z', now), '2 วันที่แล้ว');
});
