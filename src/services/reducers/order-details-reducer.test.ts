import { mockBunFirst } from '../../Data/test-data';
import { IIngredientDetails } from '../../types/types';
import {
  ORDERDETAILS_SUCCESS,
  ORDERDETAILS_ERROR,
  ORDERDETAILS_DELETE,

  TOrderDetailsActions

} from '../actions/order-details-actions';
import { orderDetailsReducer } from './order-details-reducer';

// бъект текущего просматриваемого ингредиента,
const orderDetailsInitialState: IIngredientDetails = {
  item: null,
  requestError: false,
}


describe('orderDetailsReducer', () => {
  it('initialState', () => {
    expect(orderDetailsReducer(undefined, {} as any)).toEqual(orderDetailsInitialState);
  });

  it('ORDERDETAILS_SUCCESS', () => {
    const action = {
      type: ORDERDETAILS_SUCCESS,
      item: mockBunFirst,
    };
    expect(orderDetailsReducer(undefined, action)).toEqual({
      ...orderDetailsInitialState,
      requestError: false,
      item: mockBunFirst,
    });
  

 
  });

  it('ORDERDETAILS_ERROR', () => {
    const action = {
      type: ORDERDETAILS_ERROR,
    };
    expect(orderDetailsReducer(undefined, action)).toEqual({
      ...orderDetailsInitialState,
      requestError: true,
      item: null,
    });  

  });

  it('ORDERDETAILS_DELETE', () => {
    const action = {
      type: ORDERDETAILS_DELETE,
    };
    expect(orderDetailsReducer(undefined, action)).toEqual({
      ...orderDetailsInitialState,
      requestError: false,
      item: null,
    });  

  });


});
