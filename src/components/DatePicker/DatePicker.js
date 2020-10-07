import React from 'react'
import { useState } from 'react'
import './DatePicker.css'
import * as Calendar from './Calendar'
import classnames from 'classnames'
import { useStateValue } from '../../StateProvider'

export default function DatePicker({ onChange, toggle }) {

  const [{ currentDateClick }] = useStateValue()
  const Default = {
    data: new Date(),
    years: Array(100).fill().map((el, index) => (
      new Date().getFullYear() - 50 + index
    )),
    month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
    onChange: Function.prototype
  }


  const [state, setState] = useState({
    data: new Date(),
    currentData: new Date(),
    selectDate: null
  })

  let monthData = Calendar.getMonthData(state.data.getFullYear(), state.data.getMonth())

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
    const year = yearSelect.value
    const month = monthSelect.value

    const date = new Date(year, month)
    setState({ ...state, data: date })
    console.log(date);
  }


  const handleDayClick = date => {
    console.log(date);
    setState({ ...state, selectDate: date })
    onChange(date)
  }

  return (
    toggle && <div className="calendar-picker">
      <header>
        <button onClick={handlePrevMonthButtonClick}>{'<'}</button>

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

        <button onClick={handleNextMonthButtonClick}>{'>'}</button>
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
                  : <td key={index}></td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
