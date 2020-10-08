import { useState } from 'react';
const daysNames = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const CalendarUse = (days = daysNames, month = monthNames) => {
  const todayDate = new Date();

  //todayFormatted will be used to compare dates to today’s date and add class to today’s date.
  const todayDateFormatted = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  //week order from Monday to Sunday
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 0];

  const [selectedDate, setSelectedDate] = useState(todayDate);
  const selectedMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const prevMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  //set days in one month
  const daysInMonth = selectedMonthDate.getDate();
  const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  //day on which selected month starts
  const startingPointMonth = daysOfWeek.indexOf(firstDayInMonth) + 1;
  let prevMonthStartingPoint = prevMonthDate.getDate() - daysOfWeek.indexOf(firstDayInMonth) + 1;

  //counters for selected month and next month
  let curMonthCounter = 1;
  let nextMonthCounter = 1;

  //one month can have days spread up to 6 weeks
  const rows = 6;
  //7 days in a week
  const cols = 7;

  //object of data(days) *each object will have 3 properties(classes, date and output value)*
  const calendarRows = {};

  for (let i = 1; i < rows + 1; i++) {
    for (let j = 1; j < cols + 1; j++) {
      if (!calendarRows[i]) {
        calendarRows[i] = [];
      }

      if (i === 1) {
        if (j < startingPointMonth) {
          calendarRows[i] = [...calendarRows[i], {
            classes: 'in-prev-month',
            date: new Date(
              selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear(),
              selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth() - 1 ,
              prevMonthStartingPoint
            ),
            value: prevMonthStartingPoint
          }];
          prevMonthStartingPoint++;
        } else {
          calendarRows[i] = [...calendarRows[i], {
            classes: '',
            date: new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              curMonthCounter
            ),
            value: curMonthCounter
          }];
          curMonthCounter++;
        }
      } else if (i > 1 && curMonthCounter < daysInMonth + 1) {
        calendarRows[i] = [...calendarRows[i], {
          classes: '',
          date: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            curMonthCounter
          ),
          value: curMonthCounter
        }];
        curMonthCounter++;
      } else {
        calendarRows[i] = [...calendarRows[i], {
          classes: 'in-next-month',
          date: new Date(
            selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear(),
            selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 1,
            nextMonthCounter
          ),
          value: nextMonthCounter
        }];
        nextMonthCounter++;
      }
    }
  }

  //to change the selectedDate to the  previous month's first day 
  const getPrevMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1));
  };
  //to change the selectedDate to the next month's first day  
  const getNextMonth = () => {
    setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1));
  };

  return {
    days,
    month,
    todayDateFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth
  };
};

export default CalendarUse;