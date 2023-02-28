import {
    ORDERDETAILS_SUCCESS,
    ORDERDETAILS_ERROR,
    ORDERDETAILS_DELETE
  
  } from '../actions/order-details-actions';
  
   

  // бъект текущего просматриваемого ингредиента,
  const orderDetailsInitialState = { item:null, requestError: false }
  export const orderDetailsReducer = (state=orderDetailsInitialState, action) => { 
    //console.log(action.item);
    switch (action.type) {
      case ORDERDETAILS_SUCCESS: {
       // console.log(ORDERDETAILS_SUCCESS);
       // console.log(action);
        return {
          item: action.item,
          requestError: false,
        };
      }
      case ORDERDETAILS_ERROR: {
        return {
            item: null,
            requestError: true,
        }
      }
      case ORDERDETAILS_DELETE: {
          return {
              item: null,
              requestError: false,
          }
    }
    default:
      return state 
   }
  }
