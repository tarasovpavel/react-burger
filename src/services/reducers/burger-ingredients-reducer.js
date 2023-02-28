import {
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_ERROR,
  BURGER_INGREDIENTS_INCREASECOUNTER,
  BURGER_INGREDIENTS_DECREASECOUNTER,
  BURGER_INGREDIENT_CHANGE_BUN,
  BURGER_INGREDIENT_REQUEST
} from '../actions/burger-ingredients-actions';

// список всех полученных ингредиентов
const burgerIngredientsInitialState = { items: [], queryError: false }

export const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_ERROR: {
      return {
        items: burgerIngredientsInitialState.items,
        queryError: true,
      };
    }
    case BURGER_INGREDIENTS_SUCCESS: {
      //console.log('BURGER_INGREDIENTS_SUCCESS');
      //console.log([...action.items]);
      return {
        items: [...action.items],
        queryError: false,
      };
    }

    case BURGER_INGREDIENT_CHANGE_BUN: {
      // console.log(action.item);
      return {
        ...state,
        items: [...state.items].map(item => {
          if (item._id === action.item._id) return { ...item, counter: 2 };
          if ((item._id !== action.item._id) && (item.type === "bun")) return { ...item, counter: 0 };
          return item;
        })

      }
    }
    case BURGER_INGREDIENTS_INCREASECOUNTER: {
      //console.log(action.item);
      return {
        ...state,
        items: [...state.items].map(item => {
          if (item._id === action.item._id) return { ...item, counter: ++item.counter };
          return item;
        })

      }
    }
    case BURGER_INGREDIENTS_DECREASECOUNTER: {
      // console.log('BURGER_INGREDIENTS_DECREASECOUNTER');
      // console.log(action);
      return {
        ...state,
        items: [...state.items].map(item => {
          if (item._id === action._id) return { ...item, counter: --item.counter };
          return item;
        })

      }
    }
    case BURGER_INGREDIENT_REQUEST: {
      return {
        ...state,
      };
    }    
    default: {
      return state;
    }
  }
};
