import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingEdit, setIsShowingEdit] = useState(false);

  const toggleModal = () => {
    setIsShowing(!isShowing);
    setIsShowingEdit(!isShowingEdit);
  };
  const toggleModalEdit = () => {
    setIsShowingEdit(!isShowingEdit);
  };

  return {
    isShowing,
    isShowingEdit,
    toggleModal,
    toggleModalEdit,
  };
};

export default useModal;
