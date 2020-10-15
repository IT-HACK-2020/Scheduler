import React, { useState, useEffect } from "react";
import "./App.css";

import Calendar from "./components/Calendar/Calendar";
import Modal from "./components/Modal/Modal";
import ModalEdit from "./components/ModalEdit/ModalEdit";
import useModal from "./components/Modal/useModal";
import { useStateValue } from "./StateProvider";

const App = () => {
  const { isShowing, toggleModal } = useModal();
  const [{ saveData }, dispatch] = useStateValue();
  const { isShowingEdit, toggleModalEdit } = useModal();
  const [eventToEdit, setEventToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(saveData));
  });

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
