import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients-reducer';
import { burgerConstructorReducer } from './burger-constructor-reducer';
import { ingredientDetailReducer } from './ingredient-details-reducer';
import { orderDetailsReducer } from './order-details-reducer';
import { userInitialReducer } from './user-data';
import { StateType } from 'typesafe-actions';
import {webSocketReducer} from './websocket';



const rootReducer = combineReducers({
  burgerIngredientsData: burgerIngredientsReducer,
  burgerConstructorData: burgerConstructorReducer,
  ingredientDetailData: ingredientDetailReducer,
  orderDetailsData: orderDetailsReducer,
  userData: userInitialReducer,
  webSocket: webSocketReducer,
});
export default rootReducer;

export type Store = StateType<typeof rootReducer>;

