import React from "react";
import CalendarUse from "./useCalendar";
import "./Calendar.scss";
import { useStateValue } from "../../StateProvider";

const Calendar = ({ days,
  month,
  todayDateFormatted,
  calendarRows,
  selectedDate,
  getNextMonth,
  getPrevMonth, onCellClick, onCellClickEdit, getEventForEdit }) => {

  const [{ user, saveData }, dispatch] = useStateValue();

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
      date: new Date(arrayStartDate[2], arrayStartDate[0] - 1, arrayStartDate[1]),
    });
  };

  function compareObjectsByTimeStart(a, b) {
    return a.timeStart.localeCompare(b.timeStart);
  }

  return (
    <>
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
                    <div
                      className="create-event"
                      onClick={() => {
                        dateClickHandler(col.date);
                      }}
                    >
                      <img src="/plus.png" srcSet="/plus@2x.png 2x, /plus@3x.png 3x"
                           className="Plus" alt=""/>
                    </div>
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
                              <span className="event__time-start">
                                {el.allDay ? "" : el.timeStart}
                              </span>
                              <span className="event__title">{el.title}</span>
                              <div className="event__btns">
                                <input type="checkbox" id="event__status" />
                                <span className=' fas fa-edit event__edit'
                                  onClick={() => {
                                    editClick(el);
                                  }}
                                >
                                </span>
                              </div>
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
