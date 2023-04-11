import { IIngredientDetails } from '../../types/types';
import {


  INGREDIENTDETAILS_QUERY,
  INGREDIENTDETAILS_CLOSE,
  INGREDIENTDETAILS_ERROR, TIngredientDetailsActions
} from '../actions/ingredient-details-actions';

//объект созданного заказа.



const ingredientDetailsInitialState : IIngredientDetails = 
    { item: null, 
      requestError: false 
    }


export const ingredientDetailReducer = (state = ingredientDetailsInitialState, action: TIngredientDetailsActions) => {
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

