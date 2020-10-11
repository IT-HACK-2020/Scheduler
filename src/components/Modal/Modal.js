import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useStateValue } from "../../StateProvider";
import DatePicker from "../DatePicker/DatePicker";
import { TimePicker } from "../TimePicker/TimePicker";
import "./Modal.css";

const Modal = ({ isShowing, hide }) => {
  const [{ currentDateClick, saveData }, dispatch] = useStateValue();

  const [dateStart, setDateStart] = useState(currentDateClick);

  const [dateEnd, setDateEnd] = useState(currentDateClick);

  const [datePickerOpen, setdatePickerOpen] = useState(false);

  const [datePickerEndOpen, setdatePickerEndOpen] = useState(false);

  const currentHoursAndMinutes = `${new Date().getHours().toString().length < 2
    ? "0" + new Date().getHours().toString()
    : new Date().getHours()
    }:${new Date().getMinutes().toString().length < 2
      ? "0" + new Date().getMinutes().toString()
      : new Date().getMinutes()
    }`;

  const [timeStart, setTimeStart] = useState(currentHoursAndMinutes);

  const [timeEnd, setTimeEnd] = useState(currentHoursAndMinutes);

  //save event's data
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");

  // INPUT
  const [inputValueDateStart, setInputValueDateStart] = useState(null);
  const [inputValueDateEnd, setInputValueDateEnd] = useState(null);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeLocation = (e) => {
    setLocation(e.target.value);
  };
  const onChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleDataChange = (date) => {
    setInputValueDateStart(null);
    setDateStart(date);
    setdatePickerOpen(false);
  };

  const handleDataChangeEnd = (date) => {
    setInputValueDateEnd(null);
    setDateEnd(date);
    setdatePickerEndOpen(false);
  };
  const handleTimeChangeStart = (time) => {
    setTimeStart(time);
  };
  const handleTimeChangeEnd = (time) => {
    setTimeEnd(time);
  };
  const onChangeTimeEndInput = (e) => {
    setTimeEnd(e.target.value);
    console.log(timeEnd);
  };
  const onChangeTimeStartInput = (e) => {
    setTimeStart(e.target.value);
    console.log(timeStart);
  };

  const InputOnChangeDateStart = (e) => {
    setInputValueDateStart(e.target.value);
  };

  const InputOnChangeDateEnd = (e) => {
    setInputValueDateEnd(e.target.value);
  };

  const setNullDateandClose = () => {
    hide();
    setDateStart("");
    setDateEnd("");
    setdatePickerOpen(false);
    setdatePickerEndOpen(false);
    setTimeEnd(currentHoursAndMinutes);
    setTimeStart(currentHoursAndMinutes);
    setTitle("");
    setLocation("");
    setInputValueDateStart(null);
    setInputValueDateEnd(null);
  };

  const saveDataOnClick = (
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    currentDateClick
  ) => {
    dispatch({
      type: "SAVE_DATE",
      day: currentDateClick.toLocaleDateString(),
      title: title,
      location: location,
      dateStart:
        inputValueDateStart ||
        dateStart ||
        currentDateClick.toLocaleDateString(),
      dateEnd:
        inputValueDateEnd || dateEnd || currentDateClick.toLocaleDateString(),
      timeStart: timeStart,
      timeEnd: timeEnd,
      description: desc,
    });
    console.log(saveData);
    setNullDateandClose();
  };

  return isShowing
    ? ReactDOM.createPortal(
      <>
        <div className="modal-overlay" />
        <div
          className="modal-wrapper"
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal">
            <div className="modal-intro">
              <p>
                {`Selected date:  ${currentDateClick.toLocaleDateString()}`}
              </p>
            </div>
            <div className="modal-header">
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={setNullDateandClose}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h2>New event</h2>

            <form className="form">
              <div className="form-item">
                <label htmlFor="title">Title</label>
                <br />
                <input
                  type="text"
                  name=""
                  id="title"
                  value={title}
                  onChange={(e) => onChangeTitle(e)}
                />
              </div>
              <div className="form-item">
                <label htmlFor="place">Place</label>
                <br />
                <input
                  type="text"
                  name=""
                  id="place"
                  value={location}
                  onChange={(e) => onChangeLocation(e)}
                />
              </div>
              <div className="form-item">
                <p
                  class="far fa-calendar-alt icon"
                  onClick={() => {
                    setdatePickerOpen(!datePickerOpen);
                    setdatePickerEndOpen(false);
                  }}
                ></p>
                <label htmlFor="start">Date start</label>
                <br />
                <input
                  type="text"
                  name=""
                  value={
                    inputValueDateStart ||
                    (dateStart && `${dateStart.toLocaleDateString()}`) ||
                    currentDateClick.toLocaleDateString()
                  }
                  onChange={(e) => InputOnChangeDateStart(e)}
                  id="start"
                />
                <DatePicker
                  onChangehandle={handleDataChange}
                  toggle={datePickerOpen}
                />
              </div>
              <div className="form-item">
                <p
                  onClick={() => {
                    setdatePickerEndOpen(!datePickerEndOpen);
                    setdatePickerOpen(false);
                  }}
                  class="far fa-calendar-alt icon"
                ></p>
                <label htmlFor="end">Date end</label>
                <br />
                <input
                  type="text"
                  value={
                    inputValueDateEnd ||
                    (dateEnd && `${dateEnd.toLocaleDateString()}`) ||
                    currentDateClick.toLocaleDateString()
                  }
                  name=""
                  onChange={(e) => InputOnChangeDateEnd(e)}
                  id="end"
                />
                <DatePicker
                  onChangehandle={handleDataChangeEnd}
                  toggle={datePickerEndOpen}
                />
              </div>
              <div className="form-item">
                <p className="far fa-clock icon"></p>
                <label htmlFor="time-start">Time start</label>
                <br />
                <input
                  type="text"
                  onChange={onChangeTimeStartInput}
                  value={timeStart}
                  name=""
                  id="time-start"
                />
                <TimePicker onChangehandle={handleTimeChangeStart} />
              </div>
              <div className="form-item">
                <p className="far fa-clock icon"></p>
                <label htmlFor="time-end">Time end</label>
                <br />
                <input
                  type="text"
                  onChange={onChangeTimeEndInput}
                  value={timeEnd}
                  name=""
                  id="time-end"
                />

                <TimePicker onChangehandle={handleTimeChangeEnd} />
              </div>
              <div className="form-item w-100">
                <label htmlFor="desc">Description</label>
                <br />
                <textarea
                  type="text"
                  name=""
                  id="desc"
                  value={desc}
                  onChange={(e) => onChangeDesc(e)}
                />
              </div>
              <div className="btn-container">
                <button className="btn-delete">Delete</button>
                <div className="btn-wrapper">
                  <button
                    onClick={() => {
                      saveDataOnClick(
                        dateStart,
                        dateEnd,
                        timeStart,
                        timeEnd,
                        currentDateClick
                      );
                    }}
                    className="btn-save"
                  >
                    Save
                    </button>
                  <button
                    className="btn-cancel"
                    onClick={setNullDateandClose}
                  >
                    Cancel
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>,
      document.body
    )
    : null;
};

export default Modal;
