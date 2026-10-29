// Consultation time slots, in Indian Standard Time. Mirrors backend/src/routes/registrations/notice-response/slots.js,
// which decides what can actually be booked and paid for; this file draws the calendar.

const IST_OFFSET_MINUTES = 330;

export const DAYS_AHEAD = 30; // a slot can be booked from today up to this many days ahead
export const LEAD_MINUTES = 30; // today's slots must start at least this long from now
const FIRST_SLOT = 10 * 60; // 10:00 AM
const LAST_SLOT = 17 * 60 + 30; // 5:30 PM
const SLOT_STEP = 30;

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const pad = (n) => String(n).padStart(2, '0');
const toDateString = (d) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;

/** Today's date and minutes since midnight on the wall clock in India, wherever the browser is. */
export function istNow(now = new Date()) {
  const ist = new Date(now.getTime() + IST_OFFSET_MINUTES * 60000);
  return { date: toDateString(ist), minutes: ist.getUTCHours() * 60 + ist.getUTCMinutes() };
}

export function addDays(date, days) {
  const [y, m, d] = date.split('-').map(Number);
  return toDateString(new Date(Date.UTC(y, m - 1, d + days)));
}

export const slotTimes = () =>
  Array.from({ length: (LAST_SLOT - FIRST_SLOT) / SLOT_STEP + 1 }, (_, i) => {
    const minutes = FIRST_SLOT + i * SLOT_STEP;
    return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
  });

// 2026-02-31 matches the pattern but rolls over to March, so it is not a real date.
const isRealDate = (date) => DATE_RE.test(date) && addDays(date, 0) === date;

export function isSlotAvailable(date, time, now = new Date()) {
  if (typeof date !== 'string' || typeof time !== 'string') return false;
  if (!isRealDate(date) || !slotTimes().includes(time)) return false;
  const today = istNow(now);
  if (date < today.date || date > addDays(today.date, DAYS_AHEAD)) return false;
  if (date === today.date) {
    const [h, m] = time.split(':').map(Number);
    if (h * 60 + m < today.minutes + LEAD_MINUTES) return false;
  }
  return true;
}

/** "13:30" -> "1:30 PM" */
export function formatSlotTime(time) {
  const [h, m] = time.split(':').map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`;
}

/** "2026-10-28" -> "Wed, 28 Oct 2026" */
export function formatSlotDate(date) {
  const [y, m, d] = date.split('-').map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return `${WEEKDAYS[weekday]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

export const monthLabel = (year, month) => `${MONTH_NAMES[month - 1]} ${year}`;

/** The cells of a Sunday-first month calendar, padded with the neighbouring months' days. month is 1-12. */
export function monthGrid(year, month) {
  const lead = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells = Math.ceil((lead + daysInMonth) / 7) * 7;
  return Array.from({ length: cells }, (_, i) => {
    const d = new Date(Date.UTC(year, month - 1, 1 - lead + i));
    return { date: toDateString(d), day: d.getUTCDate(), inMonth: d.getUTCMonth() === month - 1 };
  });
}
