import React, { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useStateValue } from "../../StateProvider";
import { TimePicker } from "../TimePicker/TimePicker";
import "../Modal/Modal.scss";
import InputMask from "react-input-mask";
import Popup from "../Popup/Popup";

const Modal = ({
  isShowing,
  hide,
  eventForEdit,
  closeModal,
  days,
  month,
  selectedDate,
}) => {
  const [{ currentDateClick, saveData }, dispatch] = useStateValue();

  const currentHoursAndMinutes = `${new Date().getHours().toString().length < 2
    ? "0" + new Date().getHours().toString()
    : new Date().getHours()
    }:${new Date().getMinutes().toString().length < 2
      ? "0" + new Date().getMinutes().toString()
      : new Date().getMinutes()
    }`;

  const [popupDelete, setPopupDelete] = useState(false);
  //status checkbox
  const [allDayChecked, setAllDayChecked] = useState(false);

  const [timeStart, setTimeStart] = useState(currentHoursAndMinutes);

  const [timeEnd, setTimeEnd] = useState(currentHoursAndMinutes);

  //save event's data
  // console.log("FOREDIT ---", eventForEdit);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // INPUT

  useEffect(() => {
    setTitle(eventForEdit ? eventForEdit.title : "");
    setTimeStart(eventForEdit ? eventForEdit.timeStart : "");
    setTimeEnd(eventForEdit ? eventForEdit.timeEnd : "");
    setDesc(eventForEdit ? eventForEdit.description : "");
    setAllDayChecked(eventForEdit ? eventForEdit.allDay : false);
  }, [eventForEdit]);

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
      timeStart.substr(0, 2) > 23 ||
      timeStart.substr(3, 5) > 59 ||
      timeEnd.substr(0, 2) > 23 ||
      timeEnd.substr(3, 5) > 59 ||
      timeStart.substr(0, 2) > timeEnd.substr(0, 2) ||
      parseInt(timeStart.substr(0, 2) * 60 + timeStart.substr(3, 5)) > parseInt(timeEnd.substr(0, 2) * 60) + timeStart.substr(3, 5)
    ) {
      return false;
    }
    return true;
  };
  const validationTitle = () => {
    if (
      title.length == 0
    ) {
      return false;
    }
    return true;
  };
  const [validError, setValidError] = useState("");

  const changeDataOnClick = (timeStart, timeEnd, currentDateClick) => {
    if (validationTitle()) {
      setValidError("");
      dispatch({
        type: "CHANGE_DATE",
        id: eventForEdit.id,
        day: currentDateClick.toLocaleDateString("en-EN"),
        title: title,
        timeStart: allDayChecked ? "00:00" : timeStart,
        timeEnd: allDayChecked ? "23:59" : timeEnd,
        description: desc,
        allDay: allDayChecked,
        done: false,
        changed: true,
      });
      console.log(saveData);
      setNullDateandClose();
    } else {
      setTimeout(() => {
        setValidError("..Проверка ");
      }, 0);
      setTimeout(() => {
        setValidError("....Проверка");
      }, 100);

      setTimeout(() => {
        setValidError(".....Проверка");
      }, 200);
      setTimeout(() => {
        setValidError("* Введите название и верное значение начала и окончания события");
      }, 300);
    }
  };

  const removeDataOnClick = (eventForEdit) => {
    dispatch({
      type: "DELETE_DATE",
      id: eventForEdit.id,
    });
    console.log(saveData);
    setNullDateandClose();
  };
  const deleteItemInPopup = () => {
    removeDataOnClick(eventForEdit);
    setPopupDelete(false);
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
          style={{ visibility: `${popupDelete ? "hidden" : "visible"}` }}
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
            <div className="form">
              <input
                type="text"
                name=""
                id="title"
                className={!validError ? 'modal-first-input' : 'modal-first-input errored'}
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
                <span>
                  {`${days[currentDateClick.getDay() - 1] || days[6]
                    }, ${currentDateClick.getDate()} ${month[currentDateClick.getMonth()]
                    }`}
                </span>
              </div>
              <div className="timepicker">
                <div className="form-item">
                  {/* <p className="far fa-clock icon"></p> */}
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
                  {/* <p className="far fa-clock icon"></p> */}
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
                  <button
                    className="btn-delete_edit"
                    onClick={(e) => {
                      e.preventDefault();
                      setPopupDelete(true);
                    }}
                  >
                    Удалить
                    </button>
                </div>
                <div className="layout-btn-save">
                  <button
                    onClick={() => {
                      changeDataOnClick(timeStart, timeEnd, currentDateClick);
                    }}
                    className={`btn-save `}
                  >
                    Редактировать
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {popupDelete && (
          <Popup
            hide={() => setPopupDelete(false)}
            remove={() => deleteItemInPopup()}
          ></Popup>
        )}
      </>,
      document.body
    )
    : null;
};

export default Modal;
