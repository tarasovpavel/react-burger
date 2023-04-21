import { mockIngredientForIngredientReducerFirst } from '../../Data/test-data';
import { IIngredientDetails } from '../../types/types';
import {


  INGREDIENTDETAILS_QUERY,
  INGREDIENTDETAILS_CLOSE,
  INGREDIENTDETAILS_ERROR, TIngredientDetailsActions
} from '../actions/ingredient-details-actions';
import { ingredientDetailReducer } from './ingredient-details-reducer';

//объект созданного заказа.



const ingredientDetailsInitialState: IIngredientDetails =
{
  item: null,
  requestError: false
}


describe('ingredientDetailsReducer', () => {


  it('initialState', () => {
    expect(ingredientDetailReducer(undefined, {} as any)).toEqual(ingredientDetailsInitialState);
  });

  it('INGREDIENTDETAILS_QUERY', () => {
    const action = {
      type: INGREDIENTDETAILS_QUERY,
      item: mockIngredientForIngredientReducerFirst,
    };
    expect(ingredientDetailReducer(undefined, action)).toEqual({
      ...ingredientDetailsInitialState,
      item: mockIngredientForIngredientReducerFirst,
      requestError: false,
    });
  });


  it('INGREDIENTDETAILS_CLOSE', () => {
    const action = {
      type: INGREDIENTDETAILS_CLOSE,
    };
    expect(ingredientDetailReducer(undefined, action)).toEqual({
      ...ingredientDetailsInitialState,
      requestError: false,
    });
  });

  it('INGREDIENTDETAILS_ERROR', () => {
    const action = {
      type: INGREDIENTDETAILS_ERROR,
    };
    expect(ingredientDetailReducer(undefined, action)).toEqual({
      ...ingredientDetailsInitialState,
      requestError: true,
    });
  });


});
/*
   
   
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
*/
