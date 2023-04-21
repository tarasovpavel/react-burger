import { IIngredientDetails } from '../../types/types';
import {
  ORDERDETAILS_SUCCESS,
  ORDERDETAILS_ERROR,
  ORDERDETAILS_DELETE,

  TOrderDetailsActions

} from '../actions/order-details-actions';

// бъект текущего просматриваемого ингредиента,
const orderDetailsInitialState: IIngredientDetails = {
  item: null,
  requestError: false,
}


export const orderDetailsReducer = (state = orderDetailsInitialState, action: TOrderDetailsActions) => {
 
  switch (action.type) {
    case ORDERDETAILS_SUCCESS: {

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
