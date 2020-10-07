import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useStateValue } from '../../StateProvider';
import DatePicker from '../DatePicker/DatePicker'
import './Modal.css';

const Modal = ({ isShowing, hide }) => {
  const [{ currentDateClick }] = useStateValue()

  const [date, setDate] = useState(null)

  const [datePickerOpen, setdatePickerOpen] = useState(false)
  const handleDataChange = (date) => {
    console.log(date);
    setDate(date)
  }
  const setNullDateandClose = () => {
    hide()
    setDate(null);

  }
  return (
    isShowing ? ReactDOM.createPortal(
      <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="modal">
            <div className="modal-header">
              <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={setNullDateandClose}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h2>New event</h2>
            <p>
              {currentDateClick}
            </p>

            <label htmlFor="title">Title</label>
            <input type="text" name="" id="title" /> <br />

            <label htmlFor="place">Place</label>
            <input type="text" name="" id="place" /><br />

            <label htmlFor="start">Start</label>
            <input type="text" value={(date && date.toLocaleDateString()) || currentDateClick} name="" id="start" />
            <button onClick={() => { setdatePickerOpen(!datePickerOpen) }}>Choose Date start</button>
            <DatePicker
              onChange={handleDataChange}
              toggle={datePickerOpen}
            />
          </div>
        </div>
      </>, document.body
    ) : null
  )
}


export default Modal;