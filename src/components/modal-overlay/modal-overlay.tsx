import styles from "./modal-overlay.module.css";
import { FC, ReactNode } from "react";


type ModalOverlayProps = {
  onClose: () => void,
  children: ReactNode,
}

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  return (
    <div className={styles.modalOverlay} onClick={props.onClose} >
      {props.children}
    </div>
  );
};


export default ModalOverlay;

//ModalOverlay.propTypes = {};
