import styles from "./ingredientPage.module.css";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from 'react';


export default function IngredientPage() {
    // По ID выбираем 
    //const dataIngredient = useSelector((store) => store.ingredientDetailData.item);
    const { id } = useParams();
    const dataIngredient = useSelector((store) => store.burgerIngredientsData.items);
    const mainIngredients = useMemo(() => {
        return dataIngredient.filter((item) => item._id === id);
      }, [dataIngredient, id]);

    return (
        
        mainIngredients && (mainIngredients.length>0) &&
        <div className={styles.container}>
            
            <p>
                <img src={mainIngredients[0].image} className={styles.image} alt={mainIngredients[0].name} />
            </p>
            <p className=" text text_type_main-medium pt-4 pb-8" >
                {mainIngredients[0].name}
            </p>


            <div className={styles.description + " pr-15 pl-15"} style={{ width: '500px' }}>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{mainIngredients[0].calories}</p>
                </div>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{mainIngredients[0].proteins}</p>
                </div>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{mainIngredients[0].fat}</p>
                </div>
                <div style={{ flex: '25%' }}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{mainIngredients[0].carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}



