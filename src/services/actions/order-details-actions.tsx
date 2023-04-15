import { IIngredient } from "../../types/types";

//Номер заказа
export const ORDERDETAILS_SUCCESS = "ORDERDETAILS_SUCCESS";
export const ORDERDETAILS_ERROR = "ORDERDETAILS_ERROR";
export const ORDERDETAILS_DELETE = "ORDERDETAILS_DELETE";

export interface IORDERDETAILS_SUCCESS {
    readonly type: typeof ORDERDETAILS_SUCCESS;
    readonly item: IIngredient;

}

export interface IORDERDETAILS_ERROR {
    readonly type: typeof ORDERDETAILS_ERROR;

}

export interface IORDERDETAILS_DELETE {
    readonly type: typeof ORDERDETAILS_DELETE;

}

export type TOrderDetailsActions =
    IORDERDETAILS_SUCCESS |
    IORDERDETAILS_ERROR |
    IORDERDETAILS_DELETE;