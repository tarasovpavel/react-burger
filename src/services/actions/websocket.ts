
import { TWSOrder, TWSOrdersResponse } from '../../types/types';

export interface IConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload?: string;
}
export interface IConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IGetOrdersAction {
    readonly type: typeof WS_GET_ORDERS;
    readonly payload: TWSOrdersResponse;
}
export interface ISendOrderAction {
    readonly type: typeof WS_SEND_ORDER;
    readonly payload: TWSOrder;
}

export type TWSOrdersActions =
    IConnectionStartAction |
    IConnectionSuccessAction |
    IConnectionErrorAction |
    IConnectionClosedAction |
    IGetOrdersAction |
    ISendOrderAction;

export const WS_CONNECTION_START:"WS_CONNECTION_START" = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS:"WS_CONNECTION_SUCCESS" = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR:"WS_CONNECTION_ERROR" = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED:"WS_CONNECTION_CLOSED" = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS:"WS_GET_ORDERS" = 'WS_GET_ORDERS';
export const WS_SEND_ORDER:"WS_SEND_ORDER" = 'WS_SEND_ORDER';
