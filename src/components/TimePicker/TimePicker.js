import React from 'react'
import { useState } from 'react'
import { useStateValue } from '../../StateProvider';
import './TimePicker.css';

export const TimePicker = ({ onChangehandle }) => {

  const [{ currentDateClick }] = useStateValue();

  const time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  const minutes = ['00', '30']

  const [selectValue, setSelectValue] = useState()

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
            return (
              <>
                <option
                  selected={(
                    el === new Date().getHours())
                    && new Date().getMinutes() > minutes[1] < minutes[1]}
                  key={index}
                  value={((el + '').length < 2 ? '0' + el : el) + ':' + minutes[0]}>
                  {((el + '').length < 2 ? '0' + el : el) + ':' + minutes[0]}
                </option>
                <option
                  selected={(el === new Date().getHours()) && new Date().getMinutes() >= minutes[1]}
                  key={index + '100'}
                  value={((el + '').length < 2 ? '0' + el : el) + ':' + minutes[1]}>
                  {((el + '').length < 2 ? '0' + el : el) + ':' + minutes[1]}
                </option>)
              </>
            )
          })}
      </select>
    </div>
  )
}


// ((new Date().getMinutes().toString().length < 2) ?
//   ("0" + new Date().getMinutes().toString()) :
//   (new Date().getMinutes())
// )