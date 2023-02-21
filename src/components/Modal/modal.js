
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../ModalOverlay/modalOverlay";
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

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
    <div className={styles.overflowHidden}>
      <ModalOverlay onClose={props.onClose} />
      <>

        <div className={styles.modal}>
          <div>
            <div className={styles.header}>
              <CloseIcon onClick={props.onClose} type="primary" />
            </div>

            <div>
              {props.children}
            </div>
          </div>
        </div>


      </>

    </div>
    ,
    modalRoot
  );
}
