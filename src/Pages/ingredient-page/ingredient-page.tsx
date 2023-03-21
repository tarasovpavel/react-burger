import styles from "./ingredient-page.module.css";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, FC } from 'react';
import { StateType } from 'typesafe-actions';

import Store from '../../services/reducers/reducer';
import rootReducer from "../../services/reducers/reducer";
export type Store = StateType<typeof rootReducer>;



const IngredientPage: FC = () => {
    // По ID выбираем 
    //const dataIngredient = useSelector((store) => store.ingredientDetailData.item);
    const { id } = useParams();
    //const dataIngredient = useSelector((store) => store.burgerIngredientsData.items);
    let dataIngredient = useSelector((store: Store) => store.burgerIngredientsData.items);

    const mainIngredients = useMemo<any>(() => {
        return dataIngredient.filter((item) => item._id === id);
    }, [dataIngredient, id]);

    return (

        mainIngredients && (mainIngredients.length > 0) &&

        <div className={styles.container}>

            <p className=" text text_type_main-large pt-4 pb-8" >
                Детали ингредиента
            </p>
            <p>
                <img src={mainIngredients[0].image_large} className={styles.image} alt={mainIngredients[0].name} />
            </p>
            <p className=" text text_type_main-medium pt-4 pb-8" >
                {mainIngredients[0].name}
            </p>


            <div className={styles.description + " pr-15 pl-15"} >
                <div className={styles.flex25}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{mainIngredients[0].calories}</p>
                </div>
                <div className={styles.flex25}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{mainIngredients[0].proteins}</p>
                </div>
                <div className={styles.flex25}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{mainIngredients[0].fat}</p>
                </div>
                <div className={styles.flex25}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{mainIngredients[0].carbohydrates}</p>
                </div>
            </div>
        </div>

    ) as any;
}



export default IngredientPage;