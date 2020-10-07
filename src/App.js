import React from 'react';
import './App.css';

import Calendar from './components/Calendar/Calendar';
import Modal from './components/Modal/Modal';
import useModal from './components/Modal/useModal';

const App = () => {
  const { isShowing, toggleModal } = useModal();
  return (
    <>
      <div className="section calendar">
        <Calendar onCellClick={toggleModal} />
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggleModal}
      />
    </>
  );
}

export default App;