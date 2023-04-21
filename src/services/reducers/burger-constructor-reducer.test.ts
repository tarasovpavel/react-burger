import {
  BURGER_CONSTRUCTOR_ADD_INGREDIENT,
  BURGER_CONSTRUCTOR_CHANGE_BUN,
  BURGER_CONSTRUCTOR_DELETE,
 
  BURGER_CONSTRUCTOR_MOVE,
  BURGER_CONSTRUCTOR_CLEAR,
  TBurgerIngredientsActions
} from '../actions/burger-constructor-actions';
import { IburgerIngredientsState, IIngredient } from '../../types/types';
import { burgerConstructorReducer } from './burger-constructor-reducer';
import { mockChangeBun, mockIngredientFirst, mockIngredientSecond } from '../../Data/test-data';


const burgerConstructorInitialState: IburgerIngredientsState = {

  items: [],
  bun: '',
}



// список всех ингредиентов в текущем конструкторе бургера,
describe('burgerConstructorReducer', () => {

  it('Должен вернуть initialState', () => {
    expect(burgerConstructorReducer(undefined, {} as any)).toEqual(burgerConstructorInitialState);
  });

 
  it('BURGER_CONSTRUCTOR_ADD_INGREDIENT', () => {
    const action = {
      type: BURGER_CONSTRUCTOR_ADD_INGREDIENT,
      item: mockIngredientFirst,
    };
    expect(burgerConstructorReducer(undefined, action)).toEqual({
      ...burgerConstructorInitialState,
      items: [mockIngredientFirst],
    });
  });

  it('BURGER_CONSTRUCTOR_CHANGE_BUN', () => {
    const action = {
      type: BURGER_CONSTRUCTOR_CHANGE_BUN,
      bun: mockChangeBun,
    };
    expect(burgerConstructorReducer(undefined, action)).toEqual({
      ...burgerConstructorInitialState,
      bun: mockChangeBun,
    });
  });  

  it('BURGER_CONSTRUCTOR_DELETE', () => {
    const action = {
      type: BURGER_CONSTRUCTOR_DELETE,
      sortedId: mockIngredientFirst.sortedId,
    };
    expect(burgerConstructorReducer({
      ...burgerConstructorInitialState, items: [mockIngredientFirst]}, action)).toEqual({
      ...burgerConstructorInitialState,
      items: [],
    });
  });

  it('BURGER_CONSTRUCTOR_CLEAR', () => {
    const action = {
      type: BURGER_CONSTRUCTOR_CLEAR,
    };
    expect(burgerConstructorReducer({   
      ...burgerConstructorInitialState,  items: [mockIngredientFirst, mockIngredientFirst], bun:mockChangeBun},   action)).toEqual({
      ...burgerConstructorInitialState,
      items: [],
      bun: '',
    });
  });
  it('BURGER_CONSTRUCTOR_MOVE', () => {
    const action = {
      type: BURGER_CONSTRUCTOR_MOVE,
      dragIndex: 0,
      hoverIndex: 1,
    };
    expect(burgerConstructorReducer({
      ...burgerConstructorInitialState,
      items: [mockIngredientFirst, mockIngredientSecond],
    }, action)).toEqual({
      ...burgerConstructorInitialState,
      items: [mockIngredientSecond, mockIngredientFirst],
    });
  });



 
});
