import {


  INGREDIENTDETAILS_QUERY,
  INGREDIENTDETAILS_CLOSE,
  INGREDIENTDETAILS_ERROR
} from '../actions/ingredient-details-actions';
import { IIngredient, nullIngredient } from './burger-ingredients-reducer';
//объект созданного заказа.

interface IIngredientDetails {
  item: IIngredient,
  requestError: boolean,

}


const ingredientDetailsInitialState = 
    { item: null, 
      requestError: false 
    }


export const ingredientDetailReducer = (state = ingredientDetailsInitialState, action: any) => {
  //    console.log('ingredientDetailReducer');
  //    console.log(action);
  switch (action.type) {

    case INGREDIENTDETAILS_QUERY: {
      //console.log(action.item);
      return {
        item: action.item,
        requestError: false,
      };
    }
    case INGREDIENTDETAILS_CLOSE: {
      return {
        item: null,
        requestError: false
      }
    }
    case INGREDIENTDETAILS_ERROR: {
      return {
        item: null,
        requestError: true
      }
    }
    default:
      return state
  }
};

