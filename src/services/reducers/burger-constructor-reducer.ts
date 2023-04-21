import {
  BURGER_CONSTRUCTOR_ADD_INGREDIENT,
  BURGER_CONSTRUCTOR_CHANGE_BUN,
  BURGER_CONSTRUCTOR_DELETE,
 
  BURGER_CONSTRUCTOR_MOVE,
  BURGER_CONSTRUCTOR_CLEAR,
  TBurgerIngredientsActions
} from '../actions/burger-constructor-actions';
import { IburgerIngredientsState, IIngredient } from '../../types/types';


const burgerConstructorInitialState: IburgerIngredientsState = {
  
  items : [],
  bun: '',
}



// список всех ингредиентов в текущем конструкторе бургера,


export const burgerConstructorReducer = (state = burgerConstructorInitialState, action: TBurgerIngredientsActions) => {

  switch (action.type) {
    case BURGER_CONSTRUCTOR_ADD_INGREDIENT: {

      return {
        ...state,
        items:
          [...state.items, action.item],

      }
    }
    case BURGER_CONSTRUCTOR_CHANGE_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case BURGER_CONSTRUCTOR_DELETE: {

      return {
        ...state,
        items: [...state.items].filter(
          item => item.sortedId !== action.sortedId)
      }
    };
    
    case BURGER_CONSTRUCTOR_CLEAR: {
      
      return {
        items: [] as IIngredient[],
        bun: '',
      };
    }
    case BURGER_CONSTRUCTOR_MOVE: {
     
      let tempArray = [...state.items];
      [tempArray[action.dragIndex],
      tempArray[action.hoverIndex]] =
        [tempArray[action.hoverIndex],
        tempArray[action.dragIndex]];
      
      return {
        ...state,
        items: tempArray,
      };
    }
    default:
      return state;
  }
}
