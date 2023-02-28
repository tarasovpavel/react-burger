import { useDrag } from "react-dnd";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from "../../types";

export function IngredientCard({ item, type, counter }) {

  const [, dragRef] = useDrag({
    type: type,
    item: item.item,
  });

  return (
    <div ref={dragRef} className={styles.stylerelative}>
      <img src={item.item.image} alt={item.item.name} />
      <div >
        <p className="text text_type_main-default pr-1">{item.item.price + " "}
          <CurrencyIcon type='primary' />
        </p>
      </div>
      <div >
        <p className="text text_type_main-default pr-1">{item.item.name}</p>
        <div >
          {
            (item.item.counter > 0) && <Counter count={item.item.counter} size="default" />
          }
        </div>
      </div>
    </div>
  );
};


IngredientCard.propTypes = {
  item: ingredientType.isRequired,
  type: PropTypes.string.isRequired,
  counter: PropTypes.number,
};

