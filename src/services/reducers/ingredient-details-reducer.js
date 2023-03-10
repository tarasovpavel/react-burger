import {
  

    INGREDIENTDETAILS_QUERY,
    INGREDIENTDETAILS_CLOSE,
    INGREDIENTDETAILS_ERROR
  } from '../actions/ingredient-details-actions';
  

  
  //объект созданного заказа.
  const ingredientDetailsInitialState = { item: null, requestError: false }
 export const ingredientDetailReducer = (state = ingredientDetailsInitialState, action) => {
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
      case  INGREDIENTDETAILS_ERROR: {
        return {
            item: null,
            requestError: true
        }
      }
      default:
        return state 
    }
  };

   