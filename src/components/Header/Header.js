import React, { useState } from "react";
import './Header.scss';
import { auth } from "../Login/firebase";
import { useStateValue } from "../../StateProvider";

const Header = ({
  hide,
  month,
  selectedDate,
  getNextMonth,
  getPrevMonth,
}) => {

  const [{ user, saveData }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  const [status, setStatus] = useState();
  const toggleStatus = () => {
    setStatus(!status);
  }


  return (
    <div className="header">
      <div className="header__item">
        <span className="header__today">Сегодня</span>
        <a className='header__link'>Синхронизировать с Google Календарем</a>
      </div>
      <div className="header__item">
        <span className='arrow arrow-prev' onClick={getPrevMonth}></span>
        <p className='month'>{`${month[selectedDate.getMonth()]
          } - ${selectedDate.getFullYear()}`}</p>
        <span className='arrow arrow-next' onClick={getNextMonth}></span>
      </div>
      <div className="btns">
        <div className="btns__item">
          <span className="circle done"></span>
          <span className="done-event">1</span>
        </div>
        <div className="btns__item">
          <span className="circle current"></span>
          <span className="current-event">5</span>
        </div>
        <div className="btns__item">
          <span className="circle last"></span>
          <span className="last-event">1</span>
        </div>
      </div>
      <div className="register">
        <button className="button-sign" style={{ display: `${!user ? "" : "none"}` }} onClick={hide}>Войти</button>
        <div className="header__nav">
          <img className='user-photo' style={{ display: `${!user ? "none" : ""}` }} src={!user ? '' : user.photoURL} />
          <span className='nav' style={{ display: `${!user ? "none" : ""}` }} onClick={toggleStatus}></span>
        </div>
        {status && user &&
          <div className="dropdown">
            <span className="user-email" >Вошли в систему с помощью <b>{user.email}</b> </span>
            <span className="button-signOut" onClick={handleAuthenticaton}  >Выйти</span>
          </div>}
      </div>

    </div>
  );
};

export default Header;