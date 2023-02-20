import styles from "./emptyConstructorElement.module.css";


export function EmptyConstructorElement({ text }) {
  // const classNames = `${cardStyles.card} ${type ? type === BUN_TYPE.TOP ? cardStyles.card_top : cardStyles.card_bottom : ''}`;
  return (
    <div className={styles.constructorelement}>
      <p className="text text_type_main-default text_color_inactive">{text}</p>
    </div>
  )
}



