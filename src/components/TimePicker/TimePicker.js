import React from 'react'
import { useState } from 'react'
import { useStateValue } from '../../StateProvider';

export const TimePicker = ({ onChangehandle }) => {

  const [{ currentDateClick }] = useStateValue();

  const time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  const [selectValue, setSelectValue] = useState(null)

  const handleChange = (e) => {
    setSelectValue(e.target.value)
    onChangehandle(e.target.value)
  }

  return (
    <div className="time-picker">
      <select
        value={selectValue}
        onChange={(e) => { handleChange(e) }}
        name="" id="">
        {
          time.map((el, index) => {
            return <option key={index} value={el}>{
              (el + '').length < 2 ? '0' + el : el
            }</option>
          })
        }
      </select>
    </div>
  )
}
