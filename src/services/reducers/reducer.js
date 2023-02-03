import { combineReducers } from 'redux';
import {burgerIngredientsReducer} from './burgerIngredientsReducer';
import {burgerConstructorReducer} from './burgerConstructorReducer';
import {ingredientDetailReducer} from './ingredientDetailsReducer';
import {orderDetailsReducer} from './orderDetailsReducer';




  const rootReducer = combineReducers({
    burgerIngredientsData: burgerIngredientsReducer,
    burgerConstructorData: burgerConstructorReducer,
    ingredientDetailData: ingredientDetailReducer,
    orderDetailsData: orderDetailsReducer,
  });
  export default rootReducer;

  