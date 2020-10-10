import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useStateValue } from '../../StateProvider';
import DatePicker from '../DatePicker/DatePicker';
import { TimePicker } from '../TimePicker/TimePicker';
import './Modal.css';

const Modal = ({ isShowing, hide }) => {


  const [{ currentDateClick, saveData }, dispatch] = useStateValue();

  const [dateStart, setDateStart] = useState(null);

  const [dateEnd, setDateEnd] = useState(null);

  const [datePickerOpen, setdatePickerOpen] = useState(false);

  const [datePickerEndOpen, setdatePickerEndOpen] = useState(false);

  const [timeStart, setTimeStart] = useState(null)
  const [timeEnd, setTimeEnd] = useState(null)

  const handleDataChange = (date) => {
    console.log(date);
    setDateStart(date);
    setdatePickerOpen(false)
  };

  const handleDataChangeEnd = (date) => {
    console.log(date);
    setDateEnd(date);
    setdatePickerEndOpen(false)
  };
  const handleTimeChangeStart = (time) => {
    setTimeStart(time)
  }
  const handleTimeChangeEnd = (time) => {
    setTimeEnd(time)
  }
  const setNullDateandClose = () => {
    hide()
    setDateStart(null)
    setDateEnd(null)
    setdatePickerOpen(false)
    setdatePickerEndOpen(false)
    setTimeEnd(false);
    setTimeStart(false);
  }


  const saveDataOnClick = (dateStart, dateEnd, timeStart, timeEnd, currentDateClick) => {
    dispatch({
      type: "SAVE_DATE",
      day: currentDateClick.toLocaleDateString(),
      title: 'title',
      location: 'location',
      dateStart: dateStart,
      //  (dateStart
      //   &&
      //   `${dateStart.toLocaleDateString()}`)
      //   ||
      //   currentDateClick.toLocaleDateString(),
      dateEnd: dateEnd,
      // (dateEnd
      //   &&
      //   `${dateEnd.toLocaleDateString()}`)
      //   ||
      //   currentDateClick.toLocaleDateString(),
      timeStart: timeStart,
      timeEnd: timeEnd
    });
    console.log(saveData);
    setNullDateandClose()
  }
  return (
    isShowing ? ReactDOM.createPortal(
      <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="modal">
            <div className="modal-intro">
              <p>
                {`Selected date:  ${currentDateClick.toLocaleDateString()}`}
              </p>
            </div>
            <div className="modal-header">
              <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={setNullDateandClose}>
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
                <p class="far fa-calendar-alt icon" onClick={() => {
                  setdatePickerOpen(!datePickerOpen)
                  setdatePickerEndOpen(false)
                }}></p>
                <label htmlFor="start">Date start</label>
                <br />
                <input type="text" name="" value={(dateStart
                  &&
                  `${dateStart.toLocaleDateString()}`)
                  ||
                  currentDateClick.toLocaleDateString()} id="start" />
                <DatePicker
                  onChangehandle={handleDataChange}
                  toggle={datePickerOpen}
                />
              </div>
              <div className="form-item">
                <p onClick={() => {
                  setdatePickerEndOpen(!datePickerEndOpen)
                  setdatePickerOpen(false)
                }} class="far fa-calendar-alt icon"></p>
                <label htmlFor="end">Date end</label><br />
                <input type="text" value={(dateEnd
                  &&
                  `${dateEnd.toLocaleDateString()}`)
                  ||
                  currentDateClick.toLocaleDateString()} name="" id="end" />
                <DatePicker
                  onChangehandle={handleDataChangeEnd}
                  toggle={datePickerEndOpen}
                />
              </div>
              <div className="form-item">
                <p className="far fa-clock icon"></p>
                <label htmlFor="time-start">Time start</label><br />
                <input type="text" value={timeStart
                  ||
                  `${(new Date().getHours().toString().length < 2 ?
                    ("0" + new Date().getHours().toString()) :
                    (new Date().getHours()))}:${new Date().getMinutes().toString().length < 2 ?
                      ("0" + new Date().getMinutes().toString()) :
                      (new Date().getMinutes())}`}
                  name=""
                  id="time-start" />
                <TimePicker
                  onChangehandle={handleTimeChangeStart}
                />
              </div>
              <div className="form-item">
                <p className="far fa-clock icon"></p>
                <label htmlFor="time-end">Time end</label><br />
                <input type="text" value={timeEnd
                  ||
                  `${(new Date().getHours().toString().length < 2 ?
                    ("0" + new Date().getHours().toString()) :
                    (new Date().getHours()))}:${new Date().getMinutes().toString().length < 2 ?
                      ("0" + new Date().getMinutes().toString()) :
                      (new Date().getMinutes())}`
                } name="" id="time-end" />
                <TimePicker
                  onChangehandle={handleTimeChangeEnd}
                />
              </div>
              <div className="form-item w-100">
                <label htmlFor="desc">Description</label><br />
                <textarea type="text" name="" id="desc" />
              </div>
            </form>
            <div className="btn-container">
              <button className="btn-delete">Delete</button>
              <div className="btn-wrapper">
                <button
                  onClick={() => { saveDataOnClick(dateStart, dateEnd, timeStart, timeEnd, currentDateClick) }}
                  className="btn-save">Save</button>
                <button className="btn-cancel" onClick={setNullDateandClose}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </>, document.body
    ) : null
  )
}


export default Modal;