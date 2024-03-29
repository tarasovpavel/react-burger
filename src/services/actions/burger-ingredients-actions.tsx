// Ингредиенты- список
import { IIngredient } from "../../types/types";


export const BURGER_INGREDIENTS_SUCCESS = "BURGER_INGREDIENTS_SUCCESS";
export const BURGER_INGREDIENTS_ERROR = "BURGER_INGREDIENTS_ERROR";
export const BURGER_INGREDIENTS_INCREASECOUNTER = "BURGER_INGREDIENTS_INCREASECOUNTER";
export const BURGER_INGREDIENTS_DECREASECOUNTER = "BURGER_INGREDIENTS_DECREASECOUNTER";
export const BURGER_INGREDIENT_CHANGE_BUN = "BURGER_INGREDIENT_CHANGE_BUN";
export const BURGER_INGREDIENT_REQUEST = "BURGER_INGREDIENT_REQUEST";


export interface IBURGER_INGREDIENTS_SUCCESS {
    readonly type: typeof BURGER_INGREDIENTS_SUCCESS;
    readonly items: IIngredient[];
    readonly queryError?: boolean;
}

export interface IBURGER_INGREDIENTS_ERROR {
    readonly type: typeof BURGER_INGREDIENTS_ERROR;
}


export interface IBURGER_INGREDIENTS_INCREASECOUNTER {
    readonly type: typeof BURGER_INGREDIENTS_INCREASECOUNTER;
    readonly item: IIngredient;
}
export interface IBURGER_INGREDIENTS_DECREASECOUNTER {
    readonly type: typeof BURGER_INGREDIENTS_DECREASECOUNTER;
    readonly _id: string;
}
export interface IBURGER_INGREDIENT_CHANGE_BUN {
    readonly type: typeof BURGER_INGREDIENT_CHANGE_BUN;
    readonly item: IIngredient;
}

export interface IBURGER_INGREDIENT_REQUEST {
    readonly type: typeof BURGER_INGREDIENT_REQUEST;
    readonly items: IIngredient[];
}

export type TIngredientsActions =
    IBURGER_INGREDIENTS_SUCCESS |
    IBURGER_INGREDIENTS_ERROR |
    IBURGER_INGREDIENTS_INCREASECOUNTER |
    IBURGER_INGREDIENTS_DECREASECOUNTER |
    IBURGER_INGREDIENT_CHANGE_BUN |
    IBURGER_INGREDIENT_REQUEST;