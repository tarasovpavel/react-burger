import { FC } from "react";
import { useSelector } from "../../hooks/hooks";
import { TWSOrder } from '../../types/types';

import styles from './feed-data.module.css';
import { StateType } from 'typesafe-actions';
import rootReducer from "../../services/reducers/reducer";
export type Store = StateType<typeof rootReducer>;


const FeedData: FC = () => {

    const { orders, total, totalToday }: 
    { orders: TWSOrder[], total: number, totalToday: number } = useSelector((store: Store) => store.webSocket);

    const doneOrders: TWSOrder[] = orders.filter(order => order.status === 'done');
    const ordersProgress: TWSOrder[] = orders.filter(order => order.status === 'created');

   

   

    return (
        <div >
            <div className={`${styles.flex} mb-15`}>
                <div className={styles.half}>
                                <span className={`text_type_main-medium mb-6 mt-1`}>Готовы:</span>
                                <ul className={styles.orderNumbers}>
                                    {
                                        doneOrders.map((order: TWSOrder, i: number) => (                               
                                            <li className={` text_type_digits-default    ${styles.colorDone}` } key={i}> {order.number}
                                            </li>))
                                    }
                                </ul>
                </div>




                <div className={styles.half}>
                    <span className={`text_type_main-medium mb-6 mt-1`}>В работе:</span>
                    <ul className={styles.orderNumbers}>
                        {
                            ordersProgress.map((order: TWSOrder, i: number) => (                               
                                <li className={`text_type_digits-default ${styles.colorProgress}`} key={i}>{order.number}
                                </li>))
                        }
                    </ul>
                </div>

            </div>
            <div className={`${styles.ready} mb-15`}>
                <span className={`text_type_main-medium`}>{'Выполнено за все время:'}</span>
                <p className={`${styles.text} text_type_digits-large`}>{total}</p>
            </div>
            <div className={`${styles.ready} mb-15`}>
                <span className={`text_type_main-medium`}>{'Выполнено за сегодня:'}</span>
                <p className={`${styles.text} text_type_digits-large`}>{totalToday}</p>
            </div>
 
        </div>
    )
}

export default FeedData;