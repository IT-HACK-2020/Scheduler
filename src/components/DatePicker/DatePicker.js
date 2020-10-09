import React from 'react'
import { useState } from 'react'
import './DatePicker.css'
import * as Calendar from './Calendar'
import classnames from 'classnames'
import { useStateValue } from '../../StateProvider'

export default function DatePicker({ onChangehandle, toggle }) {


  const Default = {
    data: new Date(),
    years: Array(100).fill().map((el, index) => (
      new Date().getFullYear() - 50 + index
    )),
    month: ['January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'],
    weekDays: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
    onChange: Function.prototype
  }

<<<<<<< HEAD
  const [{ currentDateClick }] = useStateValue();
=======
  const [{ currentDateClick }] = useStateValue()

>>>>>>> d37fe8af8d9c2f0df892cbeae55432f3730abc86
  const [state, setState] = useState({
    data: currentDateClick,
    currentData: new Date(),
    selectDate: currentDateClick
  })

  let monthData = Calendar.getMonthData(state.data.getFullYear(), state.data.getMonth());

  const handlePrevMonthButtonClick = () => {
    const date = new Date(
      state.data.getFullYear(),
      state.data.getMonth() - 1
    )
    console.log(date);
    setState({ ...state, data: date })
  }
  const handleNextMonthButtonClick = () => {
    const date = new Date(
      state.data.getFullYear(),
      state.data.getMonth() + 1
    )
    console.log(date);
    setState({ ...state, data: date })
  }

  let monthSelect, yearSelect

  const handleSelectChange = () => {
    const year = yearSelect.value;
    const month = monthSelect.value;

    const date = new Date(year, month);
    setState({ ...state, data: date });
    console.log(date);
  }


  const handleDayClick = date => {
    console.log(date);
    setState({ ...state, selectDate: date });
    onChangehandle(date);
  }

  return (
    toggle && <div className="calendar-picker">
      <header>
        <button className='arrow' onClick={(e) => {
          e.preventDefault()
          handlePrevMonthButtonClick()
        }}>↓</button>

        <select
          ref={el => monthSelect = el}
          value={state.data.getMonth()}
          onChange={handleSelectChange}>
          {Default.month.map((name, index) => {
            return (
              <option key={name} value={index}>{name}</option>
            )
          })}
        </select>

        <select
          ref={el => yearSelect = el}
          value={state.data.getFullYear()}
          onChange={handleSelectChange}>
          {Default.years.map((year, index) => {
            return (
              <option key={year} value={year}>{year}</option>
            )
          })}
        </select>

        <button className='arrow' onClick={(e) => {
          e.preventDefault()
          handleNextMonthButtonClick()
        }}>↑</button>
      </header>

      <table>
        <thead>
          <tr>
            {Default.weekDays.map((week, index) => {
              return (
                <th key={week}>{week}</th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {monthData.map((week, index) =>
            <tr key={index} className='week'>
              {week.map((date, index) =>
                date ?
                  <td
                    key={index}
                    className={classnames('day', {
                      'today': Calendar.areEqual(date, state.currentData),
                      'selected': Calendar.areEqual(date, state.selectDate)
                    })}
                    onClick={() => { handleDayClick(date) }}
                  >{date.getDate()}</td>
                  : <td key={index} className='empty'></td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
