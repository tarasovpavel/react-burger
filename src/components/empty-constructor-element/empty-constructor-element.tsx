import styles from "./empty-constructor-element.module.css";
import { FC } from "react";

type EmptyConstructorCardProps = {
  text: string,
}

const EmptyConstructorElement: FC<EmptyConstructorCardProps> = ({ text }) => {
  // const classNames = `${cardStyles.card} ${type ? type === BUN_TYPE.TOP ? cardStyles.card_top : cardStyles.card_bottom : ''}`;
  return (
    <div className={styles.constructorelement}>
      <p className="text text_type_main-default text_color_inactive">{text}</p>
    </div>
  )
}

export default EmptyConstructorElement;



