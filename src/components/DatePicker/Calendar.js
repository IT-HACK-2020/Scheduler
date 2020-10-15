const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAY_IN_WEEK = 7;

export function isLeapYear(year) {
  return !(year % 4 || (!(year % 100) && year % 400));
}

export function areEqual(a, b) {
  if (!a || !b) return false;

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  Novermber: 10,
  December: 11,
};

// const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

export function getDaysInMonth(date) {
  const month = date.getMonth();
  const year = date.getFullYear();

  if (isLeapYear(year) && month === Month.February) {
    return DAYS_IN_MONTH[month] + 1;
  } else {
    return DAYS_IN_MONTH[month];
  }
}

export function getDateOfWeek(date) {
  const dayOfWeek = date.getDay();

  if (getDateOfWeek === 0) return 6;

  return dayOfWeek - 1;
}

export function getMonthData(year, month) {
  const result = [];
  const date = new Date(year, month);
  const days_in_month = getDaysInMonth(date);
  const month_starts_On = getDateOfWeek(date);
  let day = 1;

  for (let i = 0; i < (days_in_month + month_starts_On) / DAY_IN_WEEK; i++) {
    result[i] = [];
    for (let j = 0; j < DAY_IN_WEEK; j++) {
      if ((i === 0 && j < month_starts_On) || day > days_in_month) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }

  return result;
}
