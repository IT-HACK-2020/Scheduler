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

  function compareObjectsByTimeStart(a, b) {
    return a.timeStart.localeCompare(b.timeStart);
  }

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
                  <td key={col.date} className={JSON.stringify(col.date) === JSON.stringify(todayDateFormatted) ? `${col.classes} day today` : `${col.classes} day`}
                  >{col.value}
                    <span className="create-event" onClick={() => {
                      dateClickHandler(col.date);
                      console.log(col.date.toLocaleDateString())
                      console.log(saveData)
                    }}>+</span>
                    {saveData.sort(compareObjectsByTimeStart).map((el) => {
                      if (el.dateStart === col.date.toLocaleDateString()) {
                        return (
                          <div className='event'>
                            <label htmlFor="status">
                              <input type="checkbox" id="status" />
                              <span className="event__time-start">{el.allDay ? '' : el.timeStart}</span>
                              <span className='event__title'>{el.title}</span>
                            </label>
                          </div>
                        )
                      }
                    })}
                  </td>)
                )}
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default Calendar;