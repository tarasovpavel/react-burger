import { useEffect, FC } from "react";



import { Link, NavLink, useLocation, useResolvedPath, useNavigate } from "react-router-dom";
import { TOrder } from '../../types/types';

import styles from './orders-array-no-profile.module.css';
import { StateType } from 'typesafe-actions';
import rootReducer from "../../services/reducers/reducer";
import utils from '../../Utils/utils';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/websocket';
import { WS_ORDERS_ALL, WS_ORDERS } from '../../constant';

import OrderBlock from '../order-block/order-block';
import { useDispatch, useSelector } from "../../hooks/hooks";
import { logOut } from '../../services/actions/redux-functions';

export type Store = StateType<typeof rootReducer>;



const OrdersArrayNoProfile: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const url = useResolvedPath("").pathname;
    const navigate = useNavigate();

    const wsUrl = `${WS_ORDERS_ALL}`;
    let wsUrlToken: string | undefined = '';


    //Последние заказы
    const { orders }: { orders: TOrder[] } = useSelector((store: Store) => store.webSocket);

    useEffect(() => {
        //console.log(wsUrlToken);
        dispatch({
            type: WS_CONNECTION_START,
            payload: wsUrl
        });

        //console.log('WS_CONNECTION_CLOSED');
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        }
    }, [dispatch]);


    function onLogout(e: React.SyntheticEvent) {
        e.preventDefault();
        dispatch(logOut());
        navigate('/');
    }


    console.log(url);
    //navigate(`/feed/${id}`, { state: { background: location } });



    return (




        < div className={styles.container_div_right} >
            <ul >
                {
                    orders.map((order: TOrder, i: number) => (
                        <Link to={{ pathname: `${url}/${order.number}`, }}

                            className={`${styles.linkStyle} `} key={i}
                            state={{ background: location }}
                        >
                            <OrderBlock {...order} key={order.number} />
                        </Link>
                    )
                    )
                }
            </ul>
        </div>


    )
}



export default OrdersArrayNoProfile;