const months = {
  0: {
    short: 'jan',
    long: 'January',
  },
  1: {
    short: 'feb',
    long: 'February',
  },
  2: {
    short: 'mar',
    long: 'March',
  },
  3: {
    short: 'apr',
    long: 'April',
  },
  4: {
    short: 'may',
    long: 'May',
  },
  5: {
    short: 'jun',
    long: 'June',
  },
  6: {
    short: 'jul',
    long: 'July',
  },
  7: {
    short: 'aug',
    long: 'August',
  },
  8: {
    short: 'sep',
    long: 'September',
  },
  9: {
    short: 'oct',
    long: 'October',
  },
  10: {
    short: 'nov',
    long: 'November',
  },
  11: {
    short: 'dec',
    long: 'December',
  },
};

const reverseMonthMap = {};

Object.keys(months).map((numericMonth) => {
  const shortName = months[numericMonth]['short'];
  reverseMonthMap[shortName] = numericMonth;
});

export function toYMD(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function toVerboseDate(date) {
  const year = date.getFullYear();
  const monthName = months[date.getMonth()]['long'];
  const day = date.getDate();
  return `${monthName} ${day}, ${year}`;
}

export function fromShortMonth(monthName) {
  return reverseMonthMap[monthName];
}

export function toShortMonth(numericMonth) {
  return months[numericMonth]['short'];
}

export function toFullMonth(numericMonth) {
  return months[numericMonth]['long'];
}
