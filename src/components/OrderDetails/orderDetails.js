import React, {useContext} from "react";
import doneImage from '../../images/done.png';
import styles from './orderDetails.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerModalContext } from "../../context/burgerContext";

export function OrderDetails() {

    const { orderNumber, setOrderNumber } = useContext(BurgerModalContext);


    return (
        <div >
            <p style={{ float: 'right' }}>
                <CloseIcon type="primary" className={styles.modal_image} />
            </p>
            <p className="text text_type_digits-large pb-16" >
                {orderNumber}
            </p>
            <p className=" text text_type_main-medium">
                идентификатор заказа
            </p>
            <img src={doneImage} className='pt-14 pb-14' alt="" />
            <p className="text text_type_main-default pb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive" >
                Дождитесь готовности на орбитальной станции
            </p>

        </div>
    )
}



