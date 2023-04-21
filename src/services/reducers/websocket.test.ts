import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS
} from '../actions/websocket';

import { TWebSocketState } from '../../types/types';
import { TWSOrdersActions } from '../actions/websocket';
import { webSocketReducer } from './websocket';
import { mockWSOrdersPayloadResponse, mockWSOrder } from '../../Data/test-data';


const webSocketInitialState: TWebSocketState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
};

describe('wsReducer', () => {
    it('initialState', () => {
      expect(webSocketReducer(undefined, {} as any)).toEqual(webSocketInitialState);
    });

    it('WS_CONNECTION_START', () => {
        const action = {
          type: WS_CONNECTION_START,
          payload: 'http://localhost',
        };
        expect(webSocketReducer(undefined, action)).toEqual({
          ...webSocketInitialState,
          
        })
      });


      it('WS_CONNECTION_SUCCESS', () => {
        const action = {
          type: WS_CONNECTION_SUCCESS,
        };
        expect(webSocketReducer(undefined, action)).toEqual({
          ...webSocketInitialState,
          wsConnected: true,
        })
      });      

      it('WS_CONNECTION_ERROR', () => {
        const action = {
          type: WS_CONNECTION_ERROR,
        };
        expect(webSocketReducer(undefined, action)).toEqual({
          ...webSocketInitialState,
          wsConnected: false,
        })
      });      

      it('WS_CONNECTION_CLOSED', () => {
        const action = {
          type: WS_CONNECTION_CLOSED,
        };
        expect(webSocketReducer(undefined, action)).toEqual({
          ...webSocketInitialState,
          wsConnected: false,
        })
      });      

      it('WS_GET_ORDERS', () => {
        const action = {
          type: WS_GET_ORDERS,
          payload: mockWSOrdersPayloadResponse,
        };
        expect(webSocketReducer(undefined, action)).toEqual({
          ...webSocketInitialState,
          orders: [mockWSOrder],
                total: mockWSOrdersPayloadResponse.total,
                totalToday: mockWSOrdersPayloadResponse.totalToday,
        })
      });      

});
/*
       
       

      
        case WS_GET_ORDERS: {
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        }
        default: return state;
    }
}*/