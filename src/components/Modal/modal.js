
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../ModalOverlay/modalOverlay";
import styles from './modal.module.css';

const modalRoot = document.getElementById("modal");

export function Modal(props) {



  const escClick = (event_) => {
    if (event_.key === "Escape") {

      props.onClose();
    }
  };


  useEffect(() => {
    document.addEventListener("keydown", escClick, false);
    return () => {
      document.removeEventListener("keydown", escClick);
    };
  }, [escClick]);


  // Возвращаем ReactDOM.createPortal,
  // который поместит дочерние элементы в modalRoot
  return ReactDOM.createPortal(
    <ModalOverlay onClose={props.onClose} >
      <>
        <div className={styles.modal}>
          {props.children}
        </div>
        <p />

      </>
    </ModalOverlay>
    ,
    modalRoot
  );
}
