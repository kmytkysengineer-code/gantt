const DAY_MS = 24 * 60 * 60 * 1000;

export function enumerateDays(start, end) {
  const current = new Date(start);
  const last = new Date(end);
  const days = [];

  while (current <= last) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

export function formatShortDate(dateInput) {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}

export function dateDiffInDays(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.floor((endDate - startDate) / DAY_MS);
}
