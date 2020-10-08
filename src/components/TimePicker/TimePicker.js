import React from 'react'

export const TimePicker = () => {

  const time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  return (
    <div>
      <select name="" id="">
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
