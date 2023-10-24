export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const reverseMonthMap = {
  'jan': 0,
  'feb': 1,
  'mar': 2,
  'apr': 3,
  'may': 4,
  'jun': 5,
  'jul': 6,
  'aug': 7,
  'sep': 8,
  'oct': 9,
  'nov': 10,
  'dec': 11,
};

export function toDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function toVerboseDate(date) {
  const year = date.getFullYear();
  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();
  return `${monthName} ${day}, ${year}`;
}

export function toNumericMonth(monthName) {
  return reverseMonthMap[monthName];
}

export function truncateWords(text) {
  const bits = text.split(' ');
  let revised = bits.slice(0, 10).join(' ');

  if (revised.length != text.length) {
    revised = `${revised}...`;
  }

  return revised;
}
