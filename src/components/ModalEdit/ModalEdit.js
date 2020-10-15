import React, { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useStateValue } from "../../StateProvider";
import DatePicker from "../DatePicker/DatePicker";
import { TimePicker } from "../TimePicker/TimePicker";
import "../Modal/Modal.css";
import InputMask from "react-input-mask";


const Modal = ({ isShowing, hide, eventForEdit, closeModal }) => {


  const [{ currentDateClick, saveData }, dispatch] = useStateValue();
  // eventForEdit && console.log(eventForEdit);
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

  //status checkbox
  const [timeZoneChecked, setTimeZoneChecked] = useState(false);
  const [allDayChecked, setAllDayChecked] = useState(true);

  const onHandleChangeTimeZone = () => {
    setTimeZoneChecked(!timeZoneChecked);
    setAllDayChecked(false);
  };
  const onHandleChangeAllDay = () => {
    setAllDayChecked(!allDayChecked);
    setTimeZoneChecked(false);
  };

  const [timeStart, setTimeStart] = useState(currentHoursAndMinutes);

  const [timeEnd, setTimeEnd] = useState(currentHoursAndMinutes);

  //save event's data
  // console.log("FOREDIT ---", eventForEdit);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");

  // INPUT
  const [inputValueDateStart, setInputValueDateStart] = useState(null);
  const [inputValueDateEnd, setInputValueDateEnd] = useState(null);

  useEffect(() => {
    setTitle(eventForEdit ? eventForEdit.title : "");
    setLocation(eventForEdit ? eventForEdit.location : "");
    setDateStart(eventForEdit ? eventForEdit.dateStart : "");
    setDateEnd(eventForEdit ? eventForEdit.dateEnd : "");
    setTimeStart(eventForEdit ? eventForEdit.timeStart : "");
    setTimeEnd(eventForEdit ? eventForEdit.timeEnd : "");
    setDesc(eventForEdit ? eventForEdit.description : "");
  }, [eventForEdit]);

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
    setDateStart(date.toLocaleDateString("en-EN"));
    setdatePickerOpen(false);
  };

  const handleDataChangeEnd = (date) => {
    setInputValueDateEnd(null);
    setDateEnd(date.toLocaleDateString("en-EN"));
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
    setDesc("");
    setInputValueDateStart(null);
    setInputValueDateEnd(null);
    setTimeZoneChecked(false);
    setAllDayChecked(true);
    closeModal(false);
  };

  const changeDataOnClick = (
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    currentDateClick
  ) => {
    dispatch({
      type: "CHANGE_DATE",
      id: eventForEdit.id,
      day: currentDateClick.toLocaleDateString("en-US"),
      title: title,
      location: location,
      dateStart:
        inputValueDateStart ||
        dateStart ||
        currentDateClick.toLocaleDateString("en-US"),
      dateEnd:
        inputValueDateEnd ||
        dateEnd ||
        currentDateClick.toLocaleDateString("en-US"),
      timeStart: allDayChecked ? "00:00" : timeStart,
      timeEnd: allDayChecked ? "23:59" : timeEnd,
      description: desc,
      allDay: allDayChecked,
      changed: true,
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
            <h2 style={{ display: `${eventForEdit ? "none" : ""}` }}>
              New event
              </h2>
            <h2 style={{ display: `${eventForEdit ? "" : "none"}` }}>
              Edit event
              </h2>

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
                    dateStart ||
                    currentDateClick.toLocaleDateString("en-US")
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
                    dateEnd ||
                    currentDateClick.toLocaleDateString("en-US")
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
              <div className="form-item show-status">
                <label htmlFor="all-day">
                  <input
                    type="checkbox"
                    id="all-day"
                    checked={allDayChecked}
                    onChange={onHandleChangeAllDay}
                  />
                    All day
                  </label>
                <label htmlFor="time-zone">
                  <input
                    type="checkbox"
                    id="time-zone"
                    checked={timeZoneChecked}
                    onChange={onHandleChangeTimeZone}
                  />
                    Time-zone
                  </label>
              </div>

              {timeZoneChecked && (
                <div className="timepicker">
                  <div className="form-item">
                    <p className="far fa-clock icon"></p>
                    <label htmlFor="time-start">Time start</label>
                    <br />
                    <InputMask
                      type="text"
                      onChange={onChangeTimeStartInput}
                      value={timeStart}
                      name=""
                      id="time-start"
                      mask="99:99"
                    />
                    <TimePicker onChangehandle={handleTimeChangeStart} />
                  </div>
                  <div className="form-item">
                    <p className="far fa-clock icon"></p>
                    <label htmlFor="time-end">Time end</label>
                    <br />
                    <InputMask
                      type="text"
                      onChange={onChangeTimeEndInput}
                      value={timeEnd}
                      name=""
                      id="time-end"
                      mask="99:99"
                    />

                    <TimePicker onChangehandle={handleTimeChangeEnd} />
                  </div>
                </div>
              )}
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
                      changeDataOnClick(
                        dateStart,
                        dateEnd,
                        timeStart,
                        timeEnd,
                        currentDateClick
                      );
                    }}
                    className="btn-save"
                  >
                    Edit
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
