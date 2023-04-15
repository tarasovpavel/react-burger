import React, { FC } from "react";
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { TIngredientItem, TIngredientsLineProps } from '../../types/types';
import styles from './ingredients-line.module.css';
import { CurrencyIcon } from
    '@ya.praktikum/react-developer-burger-ui-components';



const IngredientsLine: FC<TIngredientsLineProps> =
    ({ ingredientId, ingredients, numbers }) => {
        let itemLine: TIngredientItem;
        itemLine =
            ingredients.find((item: TIngredientItem) =>
                item._id === ingredientId)!;

        return (
            <li className={`${styles.line} text text_type_digits-default`}>
                <div className={styles.ingredientName}>
                    <IngredientIcon image={itemLine.image} />
                    <span className={` text_type_main-default mr-6`}>
                        {itemLine.name}  </span>
                </div>
                <div className={styles.ingredientName}>
                    <span className={styles.price}>
                        {itemLine.type === 'bun' ? `2 x ${itemLine.price}` : `${numbers} x ${itemLine.price}`}
                    </span>
                    <CurrencyIcon type="secondary" />
                </div>
            </li>
        )
    }

export default IngredientsLine;