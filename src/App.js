import React, { useState } from "react";
import "./App.css";

import Calendar from "./components/Calendar/Calendar";
import Modal from "./components/Modal/Modal";
import useModal from "./components/Modal/useModal";

const App = () => {
  const { isShowing, toggleModal } = useModal();
  const [eventToEdit, setEventToEdit] = useState(null);
  return (
    <>
      <div className="section calendar">
        <Calendar
          getEventForEdit={(event) => setEventToEdit(event)}
          onCellClick={toggleModal}
        />
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggleModal}
        eventForEdit={eventToEdit}
        closeModal={(el) => setEventToEdit(el)}
      />
    </>
  );
};

export default App;
