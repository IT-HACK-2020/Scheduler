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
  getToday
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
      <div className="layout-header-today">
        <span className="header__today" onClick={getToday} >Сегодня</span>
        <a className='header__link'>Синхронизировать с Google</a>
      </div>
      <div className="layout-header-month">
        <span onClick={getPrevMonth}>
          <img src="/arrow.png" srcSet="/arrow@2x.png 2x, /arrow@3x.png 3x"
               className="Arrow" alt=""/>
        </span>
        <p className='month'>{`${month[selectedDate.getMonth()]
          } - ${selectedDate.getFullYear()}`}</p>
        <span onClick={getNextMonth}>
          <img src="/arrow.png" srcSet="/arrow@2x.png 2x, /arrow@3x.png 3x"
               className="Arrow arrow-next" alt=""/>
        </span>
      </div>
      <div className="layout-header-btns">
        <div className="layout-header-btns__item">
          <span className="circle done"></span>
          <span className="done-event">1</span>
        </div>
        <div className="layout-header-btns__item">
          <span className="circle current"></span>
          <span className="current-event">5</span>
        </div>
        <div className="layout-header-btns__item">
          <span className="circle last"></span>
          <span className="last-event">1</span>
        </div>
      </div>
      <div className="layout-header-register">
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