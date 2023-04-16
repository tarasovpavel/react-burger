import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import rootReducer from './services/reducers/reducer';
import { Provider } from 'react-redux';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socketMiddleware';


import {
  WS_CONNECTION_START,  WS_CONNECTION_SUCCESS,  WS_CONNECTION_ERROR,  WS_CONNECTION_CLOSED,  WS_GET_ORDERS,  WS_SEND_ORDER} from '../src/services/actions/websocket';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendOrder: WS_SEND_ORDER,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS
};



const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;



const enhancer = composeEnhancers(applyMiddleware(thunk,  socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot((document.getElementById('root')) as HTMLElement);;
root.render(
  <React.StrictMode>
    

    <BrowserRouter>
      <Provider store={store}>

        <App />

      </Provider>
    </BrowserRouter>
    
  </React.StrictMode>
);

reportWebVitals();
