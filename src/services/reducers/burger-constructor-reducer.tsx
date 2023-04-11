import {
  BURGER_CONSTRUCTOR_ADD_INGREDIENT,
  BURGER_CONSTRUCTOR_CHANGE_BUN,
  BURGER_CONSTRUCTOR_DELETE,
  BURGER_CONSTRUCTOR_SORT,
  BURGER_CONSTRUCTOR_MOVE,
  BURGER_CONSTRUCTOR_CLEAR,
  TBurgerIngredientsActions
} from '../actions/burger-constructor-actions';
import {IburgerIngredientsState, IIngredient} from '../../types/types';


const burgerConstructorInitialState: IburgerIngredientsState = {
  items: [],
  bun: '',
}



// список всех ингредиентов в текущем конструкторе бургера,


export const burgerConstructorReducer = (state = burgerConstructorInitialState as IburgerIngredientsState, action: TBurgerIngredientsActions) => {
  //console.log('BURGER_CONSTRUCTOR_ADD_INGREDIENT');
 //  console.log(action);
  switch (action.type) {
    case BURGER_CONSTRUCTOR_ADD_INGREDIENT: {
      //action.item.sortedId = action.sortedId;
      //action.item.uuid = action.uuid;
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
     //   console.log(BURGER_CONSTRUCTOR_DELETE);
     //   console.log(action);
     //   console.log(state.items);
      return {
        ...state,
        items: [...state.items].filter(
          item => item.sortedId !== action.sortedId)
      }
    };
    case BURGER_CONSTRUCTOR_SORT: {
      let tempArray = [...state.items].sort((a, b): number => Number(a.sortedId > b.sortedId))

      return {
        ...state,
        items: tempArray,
      };
    }
    case BURGER_CONSTRUCTOR_CLEAR: {
      //console.log('BURGER_CONSTRUCTOR_CLEAR');
      return {
        items: [],
        bun: null,
      };
    }
    case BURGER_CONSTRUCTOR_MOVE: {
      // console.log(BURGER_CONSTRUCTOR_MOVE);
      let tempArray = [...state.items];
      [tempArray[action.dragIndex],
      tempArray[action.hoverIndex]] =
        [tempArray[action.hoverIndex],
        tempArray[action.dragIndex]];
      //tempArray[action.dragIndex].sortedId=  tempArray[action.hoverIndex].sortedId;
      return {
        ...state,
        items: tempArray,
      };
    }
    default:
      return state;
  }
}
