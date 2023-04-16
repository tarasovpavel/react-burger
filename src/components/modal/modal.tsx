
import { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalRouteProps } from '../../types/types';


const modalRoot = document.getElementById("modal");




export const Modal: FC<ModalRouteProps> = (props) => {



  const escClick = (e: KeyboardEvent) => {
    if (e.key === "Escape") {

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
      <ModalOverlay children={props.children} onClose={props.onClose} />
      <>

        <div className={styles.modal}>
          <div>
            <div className={styles.header}>
              <CloseIcon onClick={props.onClose} type="primary" />
            </div>

            <div className={styles.bottom}>
              {props.children}
            </div>
          </div>
        </div>


      </>

    </div>
    ,
    modalRoot!
  );
}


//Modal.propTypes = {};