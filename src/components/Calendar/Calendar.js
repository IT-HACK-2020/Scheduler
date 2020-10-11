import React from 'react';
import CalendarUse from './useCalendar';
import './Calendar.css';
import { useStateValue } from '../../StateProvider';

const Calendar = ({ onCellClick }) => {
  const { days, month, todayDateFormatted, calendarRows, selectedDate, getNextMonth, getPrevMonth } = CalendarUse();

  const [{ saveData }, dispatch] = useStateValue()

  const dateClickHandler = date => {
    console.log(date);
    onCellClick();

    dispatch({
      type: 'SET_DATE',
      date: date
    })

  };

  return (
    <>
      <div className="header">
        <button className="button" onClick={getPrevMonth}>Previous</button>
        <p>{`${month[selectedDate.getMonth()]} - ${selectedDate.getFullYear()}`}</p>
        <button className="button" onClick={getNextMonth}>Next</button>
      </div>
      <table className="table">
        <thead className='week'>
          <tr className="week-day">
            {days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            Object.values(calendarRows).map(cols => {
              return <tr key={cols[0].date}>
                {cols.map(col => (
                  JSON.stringify(col.date) === JSON.stringify(todayDateFormatted)
                    ? <td key={col.date} className={`${col.classes} day today`}

                    >{col.value}
                      <span className="create-event" onClick={() => {
                        dateClickHandler(col.date);
                      }}>+</span>
                    </td>
                    : <td key={col.date} className={`${col.classes} day`}
                    >
                      {col.value}
                      <span className="create-event" onClick={() => {
                        dateClickHandler(col.date);
                        console.log(col.date.toLocaleDateString())
                        console.log(saveData)
                      }}>+</span>

                      {saveData.map((el) => {
                        if (el.day === col.date.toLocaleDateString()) {
                          return (
                            <div className='event'>
                              <label htmlFor="status">
                                <input type="checkbox" id="status" />
                                <span className="event__time-start">{el.timeStart}</span>
                                <span className='event__title'>{el.title}</span>
                              </label>
                            </div>
                          )
                        }
                      }).sort(function (a, b) {
                        return new Date(a.dateStart + " " + a.timeStart) - new Date(b.dateStart + " " + b.timeStart);
                      })}
                    </td>
                ))}
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default Calendar;