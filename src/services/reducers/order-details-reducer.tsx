import {
  ORDERDETAILS_SUCCESS,
  ORDERDETAILS_ERROR,
  ORDERDETAILS_DELETE

} from '../actions/order-details-actions';
import { IIngredient, nullIngredient } from './burger-ingredients-reducer';


interface IOrderDetails {
  item: IIngredient,
  requestError: boolean,

}

// бъект текущего просматриваемого ингредиента,
const orderDetailsInitialState = { 
  item: null, 
  requestError: false , 
}
export const orderDetailsReducer = (state = orderDetailsInitialState, action: any) => {
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
