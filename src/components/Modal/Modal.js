import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useStateValue } from '../../StateProvider';
import DatePicker from '../DatePicker/DatePicker';
import './Modal.css';

const Modal = ({ isShowing, hide }) => {
  const [{ currentDateClick }] = useStateValue();

  const [date, setDate] = useState(null);

  const [datePickerOpen, setdatePickerOpen] = useState(false);
  const handleDataChange = (date) => {
    console.log(date);
    setDate(date);
  };
  return (
    isShowing ? ReactDOM.createPortal(
      <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="modal">
            <div className="modal-intro">
              <p>
                {`Selected date:  ${currentDateClick}`}
              </p>
            </div>
            <div className="modal-header">
              <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h2>New event</h2>

            <form className="form">
              <div className="form-item">
                <label htmlFor="title">Title</label><br />
                <input type="text" name="" id="title" />
              </div>
              <div className="form-item">
                <label htmlFor="place">Place</label><br />
                <input type="text" name="" id="place" />
              </div>
              <div className="form-item">
                <label htmlFor="start">Time start</label><br />
                <input type="text" name="" id="start"></input>
              </div>
              <div className="form-item">
                <label htmlFor="end">Time end</label><br />
                <input type="text" name="" id="end" />
              </div>
              <div className="form-item w-100">
                <label htmlFor="desc">Description</label><br />
                <textarea type="text" name="" id="desc" />
              </div>


              {/* <label htmlFor="start">Start time</label>
            <input type="text" value={date && date.toLocaleDateString()} name="" id="start" /> */}
            </form>
            {/* <button className='data-picker' onClick={() => { setdatePickerOpen(!datePickerOpen) }}>Choose selected date</button>
            <DatePicker
              onChange={handleDataChange}
              toggle={datePickerOpen}
            /> */}
            <div className="btn-container">
              <button className="btn-delete">Delete</button>
              <div className="btn-wrapper">
                <button className="btn-save">Save</button>
                <button className="btn-cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </>, document.body
    ) : null
  )
}


export default Modal;