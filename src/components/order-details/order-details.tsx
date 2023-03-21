import doneImage from '../../images/done.png';

import { useSelector } from "react-redux";
import { FC } from 'react';
import { StateType } from 'typesafe-actions';

//import Store  from '../../services/reducers/reducer';
import rootReducer from "../../services/reducers/reducer";
export type Store = StateType<typeof rootReducer>;


export const OrderDetails: FC = () => {

    const orderNumber = useSelector((store: Store) => store.orderDetailsData);

    return (
        <div >

            <p className="text text_type_digits-large pb-16" >
                {orderNumber.item}
            </p>
            <p className=" text text_type_main-medium">
                идентификатор заказа
            </p>
            <img src={doneImage} className='pt-14 pb-14' alt="Заказ сделан" />
            <p className="text text_type_main-default pb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive" >
                Дождитесь готовности на орбитальной станции
            </p>

        </div>
    )
}



