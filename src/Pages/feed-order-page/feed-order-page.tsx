import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "../../hooks/hooks";
import { useLocation, useResolvedPath, useParams } from "react-router-dom";
import Utils from '../../Utils/utils';
import IngredientsLine from '../../components/ingredients-line/ingredients-line';

import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/websocket';
import { WS_ORDERS, WS_ORDERS_ALL } from '../../constant';
import { TWSOrder, TIngredientItem, IIngredient, TDict, TMap, TIngredient } from '../../types/types';

import { CurrencyIcon } from
    '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed-order-page.module.css';
import { StateType } from 'typesafe-actions';
import rootReducer from "../../services/reducers/reducer";
import utils from '../../Utils/utils';
import Loader from "../../components/loader/loader";
export type Store = StateType<typeof rootReducer>;



const FeedOrderPage: FC = () => {
    const { orders }: { orders: TWSOrder[] } = useSelector((store: Store) => store.webSocket);

    const { id } = useParams();


    const ingredientsData = useSelector((store: Store) => store.burgerIngredientsData.items);

    const dispatch = useDispatch();
    const location = useLocation();



    const getStatus: TDict = {
        done: 'Выполнен',
        pending: 'Готовится',
        created: 'Готов'
    }





    const wsUrl = `${WS_ORDERS_ALL}`;

    let wsUrlToken: string | undefined = '';

    if ((utils.getCookie('accessToken')) && (utils.getCookie('accessToken') !== 'undefined')) {
        wsUrlToken = `${WS_ORDERS}?token=${utils.getCookie('accessToken')}`;
    }



    let order;
    let priceSum;

    if ((orders.length) && (orders.length > 0)) {
        order = orders.find((order: TWSOrder) => order.number === Number(id));

        let bun = false;


        priceSum = order!.ingredients.reduce((summ: number, _id: string) => {
            const ingredientItem = ingredientsData.find((ingredientItem: TIngredientItem) => ingredientItem._id === _id);
            if (ingredientItem!.type === 'bun') {
                if (bun) return summ;
                bun = true;
            }

            return summ + (ingredientItem!.type === 'bun' ?
                ingredientItem!.price * 2 :
                ingredientItem!.price);
        }, 0);
    }

    return (
        <>
            {
                !order ? (
                    <Loader />) : (
                    <div className={`${styles.container} `}>

                        <div className={`${styles.orderNumber} text_type_digits-default`}>{`#${order.number}`}</div>


                        <span className={`${styles.left} text_type_main-medium mt-10 `}>   {order.name}  </span>

                        <span className={`${styles.left}  text_type_main-default mb-10  mt-4   ${order.status === 'done' && styles.done}`}>
                            {getStatus[order.status]} </span>

                        <span className={` ${styles.left}  text_type_main-medium `}>Состав:</span>
                        <div className={styles.ingredientsList}>

                            <ul className={styles.line}>
                                {
                                    Utils.getIngredientList(order.ingredients).map((ingredientData: TIngredient, i: number) => {
                                        return (
                                            <div className={styles.lineTop} key={i}>
                                                <IngredientsLine ingredients={ingredientsData} {...ingredientData} />
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={`${styles.bottom} text text_type_digits-default mt-10`}>

                            <span className={`${styles.dateColor} text_type_main-default`}>
                                {Utils.getTime(order.createdAt) + ' i-GMT+3'}
                            </span>

                            <div className={styles.picture}>
                                <span >{priceSum}</span>
                                <CurrencyIcon type="secondary" />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}


export default FeedOrderPage;