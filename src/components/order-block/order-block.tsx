import { FC } from "react";
import { useSelector } from "../../hooks/hooks";
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { useLocation } from "react-router-dom";
import Utils from '../../Utils/utils';
import { TIngredientItem } from '../../types/types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-block.module.css';
import { StateType } from 'typesafe-actions';
import rootReducer from "../../services/reducers/reducer";
import { TOrderBlockProps, TDict } from "../../types/types";
export type Store = StateType<typeof rootReducer>;


const OrderBlock: FC<TOrderBlockProps> =
    ({ number, name, createdAt, ingredients }) => {

        const ingredientsData =
            useSelector((store: Store) => store.burgerIngredientsData.items);
        const location = useLocation();

        let isBun: boolean = false;

        let price: number = 0;
        if (ingredients.length > 0) {
            price = ingredients.reduce((accum: any, id: string) => {

                const item = ingredientsData.find((item: TIngredientItem) => item._id === id);
 
                if ((item?.type) && (item.type === 'bun')) {
                    if (isBun) return accum;
                    isBun = true;
                }

                if (item !== undefined) {


                    return accum + (item.type === 'bun' ? item.price * 2 : item.price);
                }
            }, 0)
        }

        const imageList = Array.from(
            new Set(ingredients.map((key) =>
                ingredientsData.find((item: TIngredientItem) =>
                    item._id === key)?.image_mobile)
            )
        ).sort();


        return (
            <li className={`${styles.card} text text_type_digits-default`}>
                <div className={styles.header}>
                    <span >{`#${number}`}</span>
                    <span className={`${styles.dateColor} text_type_main-default`}>{Utils.getTime(createdAt) + ' i-GMT+3'}</span>
                </div>


                <h1 className={`text_type_main-medium mt-6 `}>{name}</h1>

                <div className={styles.bottomLine}>
                    <ul className={styles.ingredientsList}>
                        {
                            imageList

                                .map((image: any, i: number) => {
                                    if (i > 5) return;
                                    return (

                                        <li key={i + 10}>
                                            <IngredientIcon
                                                image={image}

                                            />


                                        </li>


                                    )
                                })
                                .reverse()
                        }
                    </ul>
                    <div className={`${styles.price} text_type_main-medium mr-4`}>
                    
                        <span className="text text_type_digits-small m-2">{`${price} `}</span>
                        <CurrencyIcon type="secondary" />
                    </div>
                </div>
            </li>
        )
    }

export default OrderBlock;