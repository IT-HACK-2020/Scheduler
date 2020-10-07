import React, { useState } from 'react';
import './Popup.css';

function Popup() {
  const [toggleOpen, setToggleOpen] = useState(false)

  const [moreDetails, setMoreDetails] = useState(false)

  const [index, setIndex] = useState(null)

  const [value, setValue] = useState('')

  const validateIputDate = (e) => {
    if ((e.keyCode < 47 || e.keyCode > 57) || e.target.value.length > 5) {
      e.preventDefault();
    } else {
      if (e.keyCode === 48) {
        console.log(0);
      }
      setValue(e.target.value)
    }

  }
  return (
    <>
      {Array(5)
        .fill()
        .map((_, index) => (
          <div key={index} className='cell' onClick={() => {
            setToggleOpen(true)
            setMoreDetails(false)
            setIndex(index)
          }}>

          </div>
        ))}


      <div className={'popup' + ((toggleOpen) ? ' show' : '')}>
        <button onClick={() => {
          setToggleOpen(false)
        }}>Close</button>
        <br />
        <input type="text" name="" id="" />
        <p>All day {index + 1}</p>
        <button onClick={() => {
          setMoreDetails(true)
          setToggleOpen(false)
        }}>MoreDetails</button>
        <button>Save</button>
      </div>

      <div className={'more-details' + ((moreDetails) ? ' show' : '')}>
        <p>New event</p>
        <span>Title</span>
        <input type="text" name="" id="" />
        <br />
        <span>Location</span>
        <input type="text" name="" id="" />
        <br />
        <p>Time</p>
        <span>Start</span>
        <input type="text" name="" id="" placeholder='HH:MM' value={value} onChange={validateIputDate} />
        <br />
        <span>End</span>
        <input type="text" name="" id="" />
        <br />
        <p>Description</p>
        <textarea name="" id="" cols="30" rows="10"></textarea>


      </div>
    </>
  );
}

export default Popup;

