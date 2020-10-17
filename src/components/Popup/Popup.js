import React, { useState } from 'react';
import './Popup.scss';

const Popup = ({ hide, remove }) => {
  return (
    <div className="popup">
      <div className='popup-delete'>
        <span aria-hidden="true" onClick={hide}>
          <img src="/group.png" srcSet="/group@2x.png 2x, /group@3x.png 3x"
            className="Group" alt="" /></span>
        <h1 className='popup-delete__title'>Удалить событие</h1>
        <p className='popup-delete__text'>Вы уверены, что хотите удалить это событие?</p>
        <button className='popup-delete__btn' onClick={remove}>Удалить</button>
      </div>
    </div>
  );
};

export default Popup;


