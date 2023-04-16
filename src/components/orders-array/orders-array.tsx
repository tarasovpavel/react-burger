import { useEffect, FC } from "react";



import { Link, NavLink, useLocation, useResolvedPath, useNavigate } from "react-router-dom";
import { TOrder } from '../../types/types';

import styles from './orders-array.module.css';
import { StateType } from 'typesafe-actions';
import rootReducer from "../../services/reducers/reducer";
import utils from '../../Utils/utils';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/websocket';
import { WS_ORDERS_ALL, WS_ORDERS } from '../../constant';

import OrderBlock from '../order-block/order-block';
import { useDispatch, useSelector } from "../../hooks/hooks";
import { logOut } from '../../services/actions/redux-functions';

export type Store = StateType<typeof rootReducer>;



const OrdersArray: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const url = useResolvedPath("").pathname;
    const navigate = useNavigate();

    const wsUrl = `${WS_ORDERS_ALL}`;
    let wsUrlToken: string | undefined = '';


    if ((utils.getCookie('accessToken')) && (utils.getCookie('accessToken') !== 'undefined')) {
        wsUrlToken = `${WS_ORDERS}?token=${utils.getCookie('accessToken')}`;
    }
    //Последние заказы
    const { orders }: { orders: TOrder[] } = useSelector((store: Store) => store.webSocket);

    useEffect(() => {

        dispatch({
            type: WS_CONNECTION_START,
            payload: wsUrlToken,
        });

   
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);


    function onLogout(e: React.SyntheticEvent) {
        e.preventDefault();
        dispatch(logOut());
        navigate('/');
    }

    return (
        <div >
            < div className={styles.container} >

                < div className={styles.container_div_left} >
                    <nav>
                        <ul className={`text text_type_main-medium text_color_inactive `} >
                            <li className={`mb-10 ${styles.liststylenone}`}>
                                <NavLink

                                    className={
                                        `text text_type_main-medium text_color_inactive mb-6 ${styles.link}`}

                                    to={'/profile'}
                                >Профиль
                                </NavLink>
                            </li>
                            <li className={`mb-10 ${styles.liststylenone}`}>
                                <NavLink
                                    className={({ isActive }) =>
                                    (isActive ?
                                        `text text_type_main-medium text_color_inactive mb-6 ${styles.link_active}` :
                                        `text text_type_main-medium text_color_inactive mb-6 ${styles.link}`)}

                                    to={'/profile/orders'}
                                >История заказов
                                </NavLink>
                            </li>
                            <li className={`mb-10 ${styles.liststylenone}`}>
                                <NavLink

                                    className={
                                        `text text_type_main-medium text_color_inactive mb-6 ${styles.link}`}
                                    to={'/'}
                                    onClick={onLogout}
                                >Выход
                                </NavLink>
                            </li>

                        </ul>
                    </nav>
                </div>

                < div className={styles.container_div_right} >
                    <ul >
                        {
                            orders.map((order: TOrder, i: number) => (
                                <Link to={{ pathname: `${url}/${order.number}`, }}
                                    state={{ background: location }}
                                    className={`${styles.linkStyle} `} key={i}>
                                    <OrderBlock {...order} />

                                </Link>
                            )
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OrdersArray;