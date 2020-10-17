import React, { useState } from "react";
import "./Calendar.scss";
import { useStateValue } from "../../StateProvider";

const Calendar = ({
  days,
  month,
  todayDateFormatted,
  calendarRows,
  onCellClick,
  onCellClickEdit,
  getEventForEdit,
}) => {
  const [{ currentDateClick, saveData }, dispatch] = useStateValue();

  const dateClickHandler = (date) => {
    console.log(date);
    onCellClick();

    dispatch({
      type: "SET_DATE",
      date: date,
    });
  };

  const SetStatusDone = (el) => {
    console.log(el);
    dispatch({
      type: "SET_STATUS_DONE",
      done: !el.done,
      id: el.id,
    });
  };

  const editClick = (el, day) => {
    getEventForEdit(el);
    onCellClickEdit();
    console.log(el);
    dispatch({
      type: "SET_DATE",
      date: day,
    });
  };

  function compareObjectsByTimeStart(a, b) {
    return a.timeStart.localeCompare(b.timeStart);
  }

  const [ShowMobileEvents, setShowMobileEvents] = useState(null);

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
                    onClick={() => setShowMobileEvents(col.date)}
                    id={col.date}
                    key={col.date}
                    className={
                      col.date.getTime() < todayDateFormatted.getTime()
                        ? "day prev-today"
                        : "day" &&
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
                      <img
                        src="/plus.png"
                        srcSet="/plus@2x.png 2x, /plus@3x.png 3x"
                        className="Plus"
                        alt=""
                      />
                    </div>
                    {saveData.sort(compareObjectsByTimeStart).map((el) => {
                      if (el.day === col.date.toLocaleDateString("en-EN")) {
                        return (
                          <div
                            className={`event ${el.done ? "done" : ""}`}
                            id={`${el.day}.${el.timeStart}`}
                          >
                            <span className="event__title">{`${
                              el.title.split("").length <= 14
                                ? el.title
                                : `${el.title.substr(0, 14)}...`
                            }`}</span>
                            <div className="event__btns">
                              <input
                                type="checkbox"
                                id="event__status"
                                checked={el.done}
                                onChange={() => {
                                  SetStatusDone(el);
                                }}
                              />
                              <span
                                className=" fas fa-edit event__edit"
                                onClick={() => {
                                  editClick(el, col.date);
                                }}
                              ></span>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mobile_events">
        {ShowMobileEvents && (
          <>
            {" "}
            <p className="mobile_events_date">
              {`${
                days[ShowMobileEvents.getDay() - 1] || days[6]
              }, ${ShowMobileEvents.getDate()} ${
                month[ShowMobileEvents.getMonth()]
              }`}
            </p>
            <div className="mobile_events_buttons">
              <button
                onClick={() =>
                  setShowMobileEvents(
                    (prevValue) =>
                      new Date(
                        prevValue.getFullYear(),
                        prevValue.getMonth(),
                        prevValue.getDate() - 1
                      )
                  )
                }
              >
                {"<"}
              </button>
              <button
                onClick={() =>
                  setShowMobileEvents(
                    (prevValue) =>
                      new Date(
                        prevValue.getFullYear(),
                        prevValue.getMonth(),
                        prevValue.getDate() + 1
                      )
                  )
                }
              >
                {">"}
              </button>
            </div>
          </>
        )}
        <div className="mobile_events_list">
          {ShowMobileEvents &&
            saveData.sort(compareObjectsByTimeStart).map((el) => {
              if (el.day === ShowMobileEvents.toLocaleDateString("en-EN")) {
                return (
                  <>
                    <div
                      className={`event ${el.done ? "done" : ""}`}
                      id={`${el.day}.${el.timeStart}`}
                    >
                      <span className="event__title">{`${
                        el.title.split("").length <= 14
                          ? el.title
                          : `${el.title.substr(0, 14)}...`
                      }`}</span>
                      <div className="event__btns">
                        <input
                          type="checkbox"
                          id="event__status"
                          checked={el.done}
                          onChange={() => {
                            SetStatusDone(el);
                          }}
                        />
                        <span
                          className=" fas fa-edit event__edit"
                          onClick={() => {
                            editClick(el, setShowMobileEvents.date);
                          }}
                        ></span>
                      </div>
                    </div>
                  </>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default Calendar;

// Получаем массив из текущих дат [day, month, year]
