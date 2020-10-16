import React, { useState } from "react";
import './Menu.scss';
import { auth } from "../Login/firebase";
import { useStateValue } from "../../StateProvider";

const Menu = ({ hide }) => {

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
    <div className="menu">
      <div className="menu__header">
        {/* <span className="menu__text">Hello,  {!user ? 'Guest!' : `${user.displayName}!`}</span> */}
        <button className="button-sign" style={{ display: `${!user ? "" : "none"}` }} onClick={hide}>Sign-in</button>
      </div>
      <div className="header__nav">
        <img class='user-photo' style={{ display: `${!user ? "none" : ""}` }} src={!user ? '' : user.photoURL} />
        <span className='nav' style={{ display: `${!user ? "none" : ""}` }} onClick={toggleStatus}></span>
      </div>
      {status && user &&
        <div className="dropdown">
          <span className="user-email" >Signed in with <b>{user.email}</b> </span>
          <span className="button-signOut" onClick={handleAuthenticaton}  >Sign Out</span>
        </div>}

    </div>
  );
};

export default Menu;