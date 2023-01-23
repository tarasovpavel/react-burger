import React from "react";
import PropTypes from 'prop-types';
import styles from "./ingredientDetail.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function IngredientDetail(props) {


    return (
        <div>
            <p style={{ float: 'right' }}>
                <CloseIcon type="primary" className={styles.modal_image} />
            </p>
            <p>
                <img src={props.props.image} className={styles.image} alt={props.props.name} />
            </p>
            <p className=" text text_type_main-medium pt-4 pb-8" >
                {props.props.name}
            </p>


            <div className={styles.description + " pr-15 pl-15"} style={{ width: '500px' }}>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{props.props.calories}</p>
                </div>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{props.props.proteins}</p>
                </div>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{props.props.fat}</p>
                </div>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{props.props.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}
IngredientDetail.propTypes = {
    element: PropTypes.object.isRequired
}


