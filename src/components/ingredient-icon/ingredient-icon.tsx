import { FC } from "react";
import { TIngredientIconProps } from "../../types/types";

import styles from './ingredient-icon.module.css';


const IngredientIcon: FC<TIngredientIconProps> = ({ image }) => {

   

    return (
       
            <div className={(styles.icon)}>
                
                <img src={image} alt="ингредиент бургера" className={styles.ingredientImage}/>
            </div>        
   
    )
}

export default IngredientIcon;