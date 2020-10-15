import React, { useEffect, useState } from "react";
import "./App.css";

import Calendar from "./components/Calendar/Calendar";
import Modal from "./components/Modal/Modal";
import ModalEdit from "./components/ModalEdit/ModalEdit";
import useModal from "./components/Modal/useModal";
import { useStateValue } from "./StateProvider";

const App = () => {
  const { isShowing, toggleModal } = useModal();
  const { isShowingEdit, toggleModalEdit } = useModal();
  const [eventToEdit, setEventToEdit] = useState(null);
  const [{ saveData }] = useStateValue();

  useEffect(() => {
    console.log("УСТАНОВИЛИ В ЛОКАЛКУ");
    localStorage.setItem("events", JSON.stringify(saveData));
  }, [saveData]);

  return (
    <>
      <div className="section calendar">
        <Calendar
          getEventForEdit={(event) => setEventToEdit(event)}
          onCellClick={toggleModal}
          onCellClickEdit={toggleModalEdit}
        />
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggleModal}
        closeModal={(el) => setEventToEdit(el)}
      />
      <ModalEdit
        isShowing={isShowingEdit}
        hide={toggleModalEdit}
        eventForEdit={eventToEdit}
        closeModal={(el) => setEventToEdit(el)}
      />
    </>
  );
};

export default App;
