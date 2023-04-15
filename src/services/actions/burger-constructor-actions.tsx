import { IburgerIngredientsState } from "../../types/types";

//конструктор
export const BURGER_CONSTRUCTOR_ADD_INGREDIENT = "BURGER_CONSTRUCTOR_ADD_INGREDIENT";
export const BURGER_CONSTRUCTOR_CHANGE_BUN = "BURGER_CONSTRUCTOR_CHANGE_BUN";
export const BURGER_CONSTRUCTOR_DELETE = "BURGER_CONSTRUCTOR_DELETE";
export const BURGER_CONSTRUCTOR_SORT = "BURGER_CONSTRUCTOR_SORT";
export const BURGER_CONSTRUCTOR_MOVE = "BURGER_CONSTRUCTOR_MOVE";
export const BURGER_CONSTRUCTOR_CLEAR = "BURGER_CONSTRUCTOR_CLEAR";


export interface IBURGER_CONSTRUCTOR_ADD_INGREDIENT {
    readonly type: typeof BURGER_CONSTRUCTOR_ADD_INGREDIENT;
    readonly item: IburgerIngredientsState,

}

export interface IBURGER_CONSTRUCTOR_CHANGE_BUN {
    readonly type: typeof BURGER_CONSTRUCTOR_CHANGE_BUN;
    readonly bun: string;
}

export interface IBURGER_CONSTRUCTOR_DELETE {
    readonly type: typeof BURGER_CONSTRUCTOR_DELETE;
    readonly sortedId: string;
}

export interface IBURGER_CONSTRUCTOR_SORT {
    readonly type: typeof BURGER_CONSTRUCTOR_SORT;

}

export interface IBURGER_CONSTRUCTOR_MOVE {
    readonly type: typeof BURGER_CONSTRUCTOR_MOVE;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export interface IBURGER_CONSTRUCTOR_CLEAR {
    readonly type: typeof BURGER_CONSTRUCTOR_CLEAR;

}

export type TBurgerIngredientsActions =
    IBURGER_CONSTRUCTOR_ADD_INGREDIENT |
    IBURGER_CONSTRUCTOR_CHANGE_BUN |
    IBURGER_CONSTRUCTOR_DELETE |
    IBURGER_CONSTRUCTOR_SORT |
    IBURGER_CONSTRUCTOR_MOVE |
    IBURGER_CONSTRUCTOR_CLEAR;