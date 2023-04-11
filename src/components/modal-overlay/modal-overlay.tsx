import styles from "./modal-overlay.module.css";
import { FC, } from "react";
import {ModalOverlayProps} from '../../types/types';


const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  return (
    <div className={styles.modalOverlay} onClick={props.onClose} >
      {props.children}
    </div>
  );
};


export default ModalOverlay;

//ModalOverlay.propTypes = {};
