import { IIngredient } from "../../types/types";


//Ингредиент
export const INGREDIENTDETAILS_QUERY: "INGREDIENTDETAILS_QUERY" = "INGREDIENTDETAILS_QUERY";
export const INGREDIENTDETAILS_CLOSE: "INGREDIENTDETAILS_CLOSE" = "INGREDIENTDETAILS_CLOSE";
export const  INGREDIENTDETAILS_ERROR: "ORDERDETAILS_ERROR"= 'ORDERDETAILS_ERROR';

export interface IINGREDIENTDETAILS_QUERY {
    readonly type: typeof INGREDIENTDETAILS_QUERY;
    readonly item: IIngredient; 
  
}
export interface IINGREDIENTDETAILS_CLOSE {
    readonly type: typeof INGREDIENTDETAILS_CLOSE;
    
   
}
export interface IINGREDIENTDETAILS_ERROR {
    readonly type: typeof INGREDIENTDETAILS_ERROR;
  
    
}

export type TIngredientDetailsActions =  
IINGREDIENTDETAILS_QUERY | 
IINGREDIENTDETAILS_CLOSE |
IINGREDIENTDETAILS_ERROR ;