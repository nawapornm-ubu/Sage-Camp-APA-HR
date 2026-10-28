// ไฟล์ร่วม — รายชื่อฟีเจอร์หน้าเว็บทั้งหมด (ลงทะเบียนไว้ครบแล้ว ทีมไม่ต้องแก้ไฟล์นี้)
import * as edit from './edit.js';
import * as search from './search.js';
import * as pin from './pin.js';
import * as category from './category.js';
import * as stats from './stats.js';
import * as ack from './ack.js';
import * as exportCsv from './export.js';
import * as theme from './theme.js';

export const FEATURES = { edit, search, pin, category, stats, ack, export: exportCsv, theme };
