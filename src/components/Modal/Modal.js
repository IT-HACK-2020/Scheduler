import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useStateValue } from "../../StateProvider";
import { TimePicker } from "../TimePicker/TimePicker";
import "./Modal.scss";
import InputMask from "react-input-mask";

const Modal = ({ isShowing, hide, closeModal, days, month, selectedDate }) => {
  const [{ currentDateClick, saveData }, dispatch] = useStateValue();

  const currentHoursAndMinutes = `${new Date().getHours().toString().length < 2
      ? "0" + new Date().getHours().toString()
      : new Date().getHours()
    }:${new Date().getMinutes().toString().length < 2
      ? "0" + new Date().getMinutes().toString()
      : new Date().getMinutes()
    }`;

  //status checkbox
  const [allDayChecked, setAllDayChecked] = useState(false);

  const [timeStart, setTimeStart] = useState(currentHoursAndMinutes);

  const [timeEnd, setTimeEnd] = useState(currentHoursAndMinutes);

  const onHandleChangeAllDay = (el) => {
    console.log(el);
    if (!el) {
      setTimeStart("00:00");
      setTimeEnd("23:59");

      setAllDayChecked(true);
    } else {
      setTimeStart(currentHoursAndMinutes);
      setTimeEnd(currentHoursAndMinutes);

      setAllDayChecked(false);
    }
  };

  //save event's data
  // console.log("FOREDIT ---", eventForEdit);
  const [title, setTitle] = useState("");

  const [desc, setDesc] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDesc = (e) => {
    setDesc(e.target.value);
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

  const setNullDateandClose = () => {
    hide();
    setTimeEnd(currentHoursAndMinutes);
    setTimeStart(currentHoursAndMinutes);
    setTitle("");
    setDesc("");
    setAllDayChecked(false);
    closeModal(false);
  };

  const validationOK = () => {
    console.log(timeEnd.length);
    if (
      title.length == 0 ||
      timeStart.includes("_") ||
      timeEnd.includes("_") ||
      timeStart[0] > 2 ||
      timeStart[3] > 5 ||
      timeEnd[0] > 2 ||
      timeEnd[3] > 5
    ) {
      return false;
    }
    return true;
  };
  const [validError, setValidError] = useState("");
  const saveDataOnClick = (timeStart, timeEnd, currentDateClick) => {
    if (validationOK()) {
      setValidError("");
      dispatch({
        type: "SAVE_DATE",
        id: `${title}${timeStart}`,
        day: currentDateClick.toLocaleDateString("en-EN"),
        title: title,
        timeStart: allDayChecked ? "00:00" : timeStart,
        timeEnd: allDayChecked ? "23:59" : timeEnd,
        description: desc,
        allDay: allDayChecked,
        done: false,
      });
      // console.log(initialState.saveData);
      setNullDateandClose();
      // console.log(dispatch.title);
    } else {
      setTimeout(() => {
        setValidError("..Checking ");
      }, 0);
      setTimeout(() => {
        setValidError("....Checking ");
      }, 100);

      setTimeout(() => {
        setValidError(".....Checking ");
      }, 200);
      setTimeout(() => {
        setValidError("ERROR");
      }, 300);
    }

    // setValidError("ERROR");
  };

  return isShowing
    ? ReactDOM.createPortal(
      <>
        <div
          className="modal-wrapper"
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal">
            <button
              type="button"
              className="modal-close-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={setNullDateandClose}
            >
              <span aria-hidden="true">
                <img
                  src="/group.png"
                  srcSet="/group@2x.png 2x, /group@3x.png 3x"
                  className="Group"
                  alt=""
                />
              </span>
            </button>
            <div className="modal__title"></div>
            <div className="form">
              <input
                type="text"
                name=""
                id="title"
                className="modal-first-input"
                value={title}
                placeholder="Добавьте название"
                onChange={(e) => onChangeTitle(e)}
              />
              <textarea
                type="text"
                name=""
                id="desc"
                className="modal-text-area"
                rows="1"
                value={desc}
                placeholder="Добавьте описание"
                onChange={(e) => onChangeDesc(e)}
              />
              <div className="modal__date">
                <div>
                  {`${days[currentDateClick.getDay() - 1] || days[6]
                    }, ${currentDateClick.getDate()} ${month[currentDateClick.getMonth()]
                    }`}
                </div>
              </div>
              <div className="timepicker">
                <div className="form-item">
                  <InputMask
                    type="text"
                    onChange={onChangeTimeStartInput}
                    value={timeStart}
                    name=""
                    id="time-start"
                    mask="99:99"
                  />
                  {/* <TimePicker onChangehandle={handleTimeChangeStart} /> */}
                </div>
                <div className="form-item">
                  <InputMask
                    type="text"
                    onChange={onChangeTimeEndInput}
                    value={timeEnd}
                    name=""
                    id="time-end"
                    mask="99:99"
                  />
                  {/* <TimePicker onChangehandle={handleTimeChangeEnd} /> */}
                </div>
                <div className="show-status">
                  <label htmlFor="all-day">
                    <input
                      type="checkbox"
                      id="all-day"
                      checked={allDayChecked}
                      onChange={() => onHandleChangeAllDay(allDayChecked)}
                    />
                      Весь день
                    </label>
                </div>
              </div>
              <p className="error">{validError}</p>
              <div className="btn-container">
                <div className="layout-btn-delete">
                  <button className="btn-delete">Удалить</button>
                </div>
                <div className="layout-btn-save">
                  <button
                    onClick={() => {
                      saveDataOnClick(timeStart, timeEnd, currentDateClick);
                    }}
                    className="btn-save"
                  >
                    Сохранить
                    </button>
                  {/* <button
                    className="btn-cancel"
                    onClick={setNullDateandClose}
                  >
                    Cancel
                    </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    )
    : null;
};

export default Modal;
