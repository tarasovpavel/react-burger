import React from "react";
import PropTypes from 'prop-types';
import styles from "./ingredientDetail.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "react-redux";


export function IngredientDetail(props) {

    const  dataIngredient  = useSelector((store) => store.ingredientDetailData);

    return   (
        <div>
            <p style={{ float: 'right' }}>
                <CloseIcon type="primary" className={styles.modal_image} />
            </p>
            <p>
                <img src={dataIngredient.item.image} className={styles.image} alt={dataIngredient.item.name} />
            </p>
            <p className=" text text_type_main-medium pt-4 pb-8" >
                {dataIngredient.item.name}
            </p>


            <div className={styles.description + " pr-15 pl-15"} style={{ width: '500px' }}>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{dataIngredient.item.calories}</p>
                </div>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{dataIngredient.item.proteins}</p>
                </div>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{dataIngredient.item.fat}</p>
                </div>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{dataIngredient.item.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}



