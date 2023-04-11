import type { Middleware, MiddlewareAPI } from "redux";
import { TWSActions } from '../../types/types';

export const socketMiddleware = (wsActions: TWSActions): Middleware => {
    return ((store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch } = store;
            const { 
                wsInit, wsSendOrder, onOpen, onClose, onError, onMessage 
            } = wsActions;
            const { type, payload } = action;

            if(type === wsInit){
                console.log(payload);
                socket = new WebSocket(payload);
                console.log(socket);
            }
            if(type === onClose && socket){
                console.log('onClose');
                socket.close();
            }
            if(socket){
                socket.onopen = event => {
                    console.log('onOpen');
                    dispatch({
                        type: onOpen,
                        payload: event
                    });
                };
                socket.onerror = event => {
                    console.log('onerr');
                    dispatch({
                        type: onError,
                        payload: event
                    });
                };
                socket.onmessage = event => {
                    console.log('onMessage');
                    console.log(event);
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...rest } = parsedData;
                    dispatch({
                        type: onMessage,
                        payload: rest
                    });
                };
                socket.onclose = event => {
                    dispatch({
                        type: onClose,
                        payload: event
                    });
                };
                
                if(type === wsSendOrder){
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }
            next(action);
        };
    }) as Middleware;
}