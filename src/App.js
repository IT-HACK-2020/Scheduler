import React, { useEffect, useState } from "react";
import "./App.scss";

import Calendar from "./components/Calendar/Calendar";
import Modal from "./components/Modal/Modal";
import ModalEdit from "./components/ModalEdit/ModalEdit";
import useModal from "./components/Modal/useModal";
import Login from "./components/Login/Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./components/Login/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const App = () => {

  const { isShowing, toggleModal } = useModal();
  const { isShowingEdit, toggleModalEdit } = useModal();
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [{ saveData }] = useStateValue();

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    console.log("УСТАНОВИЛИ В ЛОКАЛКУ");
    localStorage.setItem("events", JSON.stringify(saveData));
  }, [saveData]);

  const [{ }, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);


  return (
    <>
      <div className="menu">
        <button className="button-sign" onClick={toggleLogin}>Sign-in</button>
        {isLogin && <Login hide={toggleLogin}></Login>}
      </div>
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
