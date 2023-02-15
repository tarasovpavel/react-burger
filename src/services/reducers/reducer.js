import { combineReducers } from 'redux';
import {burgerIngredientsReducer} from './burgerIngredientsReducer';
import {burgerConstructorReducer} from './burgerConstructorReducer';
import {ingredientDetailReducer} from './ingredientDetailsReducer';
import {orderDetailsReducer} from './orderDetailsReducer';
import {userInitialReducer} from './userData';



  const rootReducer = combineReducers({
    burgerIngredientsData: burgerIngredientsReducer,
    burgerConstructorData: burgerConstructorReducer,
    ingredientDetailData: ingredientDetailReducer,
    orderDetailsData: orderDetailsReducer,
    userData: userInitialReducer,
  });
  export default rootReducer;

  