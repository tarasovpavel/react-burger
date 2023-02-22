import styles from "./modalOverlay.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={styles.modalOverlay} onClick={props.onClose} >
      {props.children}
    </div>
  );
};


export default ModalOverlay;


