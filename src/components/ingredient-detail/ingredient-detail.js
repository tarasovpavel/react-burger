import React from "react";
import styles from "./ingredient-detail.module.css";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'


export default function IngredientDetail() {

    let dataIngredient = useSelector((store) => store.ingredientDetailData.item);
    const dataIngredients = useSelector((store) => store.burgerIngredientsData.items);
    const { id } = useParams();


    if (!(dataIngredient))
        dataIngredient = dataIngredients.find((item) => item._id === id);

    return (
        dataIngredient &&
        <div>
            <p className=" text text_type_main-large pt-4 pb-8" >
                Детали ингредиента
            </p>
            <p>
                <img src={dataIngredient.image_large} className={styles.image} alt={dataIngredient.name} />
            </p>
            <p className=" text text_type_main-medium pt-4 pb-8" >
                {dataIngredient.name}
            </p>


            <div className={styles.description + " pr-15 pl-15"} >
                <div className={styles.flex25}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{dataIngredient.calories}</p>
                </div>
                <div className={styles.flex25}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{dataIngredient.proteins}</p>
                </div>
                <div className={styles.flex25}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{dataIngredient.fat}</p>
                </div>
                <div className={styles.flex25}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{dataIngredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}



