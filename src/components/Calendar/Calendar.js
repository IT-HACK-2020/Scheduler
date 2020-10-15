import React from "react";
import CalendarUse from "./useCalendar";
import "./Calendar.css";
import { useStateValue } from "../../StateProvider";

const Calendar = ({ onCellClick, onCellClickEdit, getEventForEdit }) => {
  const {
    days,
    month,
    todayDateFormatted,
    calendarRows,
    selectedDate,
    getNextMonth,
    getPrevMonth,
  } = CalendarUse();

  const [{ saveData }, dispatch] = useStateValue();

  const dateClickHandler = (date) => {
    console.log(date);
    onCellClick();

    dispatch({
      type: "SET_DATE",
      date: date,
    });
  };

  const editClick = (el) => {
    getEventForEdit(el);
    onCellClickEdit();
    console.log(el);
    const arrayStartDate = el.dateStart.split("/");
    dispatch({
      type: "SET_DATE",
      date: new Date(arrayStartDate[2], arrayStartDate[0], arrayStartDate[1]),
    });
  };

  function compareObjectsByTimeStart(a, b) {
    return a.timeStart.localeCompare(b.timeStart);
  }

  return (
    <>
      <div className="header">
        <button className="button" onClick={getPrevMonth}>
          Previous
        </button>
        <p>{`${
          month[selectedDate.getMonth()]
        } - ${selectedDate.getFullYear()}`}</p>
        <button className="button" onClick={getNextMonth}>
          Next
        </button>
      </div>
      <table className="table">
        <thead className="week">
          <tr className="week-day">
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(calendarRows).map((cols) => {
            return (
              <tr key={cols[0].date}>
                {cols.map((col) => (
                  <td
                    key={col.date}
                    className={
                      JSON.stringify(col.date) ===
                      JSON.stringify(todayDateFormatted)
                        ? `${col.classes} day today`
                        : `${col.classes} day`
                    }
                  >
                    <span className="number">{col.value}</span>
                    <span
                      className="create-event"
                      onClick={() => {
                        dateClickHandler(col.date);
                      }}
                    >
                      +
                    </span>
                    {saveData.sort(compareObjectsByTimeStart).map((el) => {
                      const arrayStartDate = el.dateStart.split("/");
                      const arrayEndDate = el.dateEnd.split("/");
                      // Получаем к-во дней Конечная - Текущая = (миллисекунды) / к-во млс в день
                      const countDays =
                        (new Date(
                          arrayEndDate[2],
                          arrayEndDate[0],
                          arrayEndDate[1]
                        ) -
                          new Date(
                            arrayStartDate[2],
                            arrayStartDate[0],
                            arrayStartDate[1]
                          )) /
                        (60 * 60 * 24 * 1000);
                      for (let i = 0; i <= countDays; i++) {
                        if (
                          new Date(
                            new Date(
                              arrayStartDate[2],
                              arrayStartDate[0] - 1,
                              arrayStartDate[1]
                            ).getTime() +
                              i * (60 * 60 * 24 * 1000)
                          ).toLocaleDateString("en-EN") ===
                          col.date.toLocaleDateString("en-EN")
                        ) {
                          return (
                            <div className="event">
                              <label htmlFor="status">
                                <input type="checkbox" id="status" />
                                <span className="event__time-start">
                                  {el.allDay ? "" : el.timeStart}
                                </span>
                                <span className="event__title">{el.title}</span>
                              </label>
                              <span
                                onClick={() => {
                                  editClick(el);
                                }}
                              >
                                <i class="fas fa-edit edit"></i>
                              </span>
                            </div>
                          );
                        }
                      }
                    })}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Calendar;

// Получаем массив из текущих дат [day, month, year]
