import { useDrag } from "react-dnd";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';
import { FC } from "react";
import  {IngredientCardProps} from '../../types/types';

const IngredientCard: FC<IngredientCardProps> = ({ item, type }) => {

  // console.log(item) ;

  const [, dragRef] = useDrag({
    type: type,
    item: item,
  });

  //console.log(item.counter);

  return  (
    <div ref={dragRef} className={styles.stylerelative}>
      <img src={item.image} alt={item.name} />
      <div >
        <p className="text text_type_main-default pr-1">{item.price + " "}
          <CurrencyIcon type='primary' />
        </p>
      </div>
      <div >
        <p className="text text_type_main-default pr-1">{item.name}</p>
        <div >
          {
            (item.counter > 0) && <Counter count={item.counter} size="default" />
            
          }
        </div>
      </div>
    </div>
  );
};


export default IngredientCard;

