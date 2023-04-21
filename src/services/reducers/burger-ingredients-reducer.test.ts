import {
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_ERROR,
  BURGER_INGREDIENTS_INCREASECOUNTER,
  BURGER_INGREDIENTS_DECREASECOUNTER,
  BURGER_INGREDIENT_CHANGE_BUN
} from '../actions/burger-ingredients-actions';

import { IIngredientsState } from '../../types/types';
import { IIngredient } from '../../types/types';
import { burgerIngredientsReducer } from './burger-ingredients-reducer';
import { mockIngredientForIngredientReducerFirst, mockBunFirst, mockBunSecond, mockIngredientsList } from '../../Data/test-data';

export const nullIngredient: IIngredient = {
  _id: "",
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: "",
  image_large: "",
  image_mobile: "",
  name: "",
  price: 0,
  proteins: 0,
  type: "",
  uniqId: "",
  counter: 0,
  sortedId: "",
  uuid: "",
}


const burgerIngredientsInitialState: IIngredientsState = {
  items: [],
  queryError: false,


}


describe('burgerIngredientsReducer',() => {
  it('Должен вернуть initialState', () => {
    expect(burgerIngredientsReducer(undefined, {} as any)).toEqual({
      ...burgerIngredientsInitialState,
    });
  });

  it('BURGER_INGREDIENTS_ERROR', () => {
    const action = {
      type: BURGER_INGREDIENTS_ERROR,
    };
    expect(burgerIngredientsReducer(undefined, action)).toEqual({
      ...burgerIngredientsInitialState,
      items: burgerIngredientsInitialState.items,
      queryError: true,
      
    });
  });

  it('BURGER_INGREDIENTS_SUCCESS', () => {
    const action = {
      type: BURGER_INGREDIENTS_SUCCESS,
      items: mockIngredientsList,
    };
    expect(burgerIngredientsReducer(undefined, action)).toEqual({
      ...burgerIngredientsInitialState,
      queryError: false,
      items: mockIngredientsList,
    });
  });  

  it('BURGER_INGREDIENT_CHANGE_BUN', () => {
    const action = {
      type: BURGER_INGREDIENT_CHANGE_BUN,
      item: mockBunSecond,
    };
    expect(burgerIngredientsReducer({
      ...burgerIngredientsInitialState,
      items: [{ ...mockBunFirst, counter: 2}, mockBunSecond]
    }, action)).toEqual({
      ...burgerIngredientsInitialState,
      items: [mockBunFirst, { ...mockBunSecond, counter: 2 }]
    });
  });

});

it('BURGER_INGREDIENTS_INCREASECOUNTER', () => {
  const action = {
    type: BURGER_INGREDIENTS_INCREASECOUNTER,
    item: mockIngredientForIngredientReducerFirst,
  };
  expect(burgerIngredientsReducer({
    ...burgerIngredientsInitialState,
    items: [mockIngredientForIngredientReducerFirst]
  }, action)).toEqual({
    ...burgerIngredientsInitialState,
    items: [{ ...mockIngredientForIngredientReducerFirst, counter: 2}],
  });
});


it('BURGER_INGREDIENTS_DECREASECOUNTER', () => {
  const action = {
    type: BURGER_INGREDIENTS_DECREASECOUNTER,
    _id: mockIngredientForIngredientReducerFirst._id,
  };
  expect(burgerIngredientsReducer({
    ...burgerIngredientsInitialState,
    items: [{ ...mockIngredientForIngredientReducerFirst, counter: 2 }]
  }, action)).toEqual({
    ...burgerIngredientsInitialState,
    items: [{ ...mockIngredientForIngredientReducerFirst, counter: 1 }],
  });

  

});
