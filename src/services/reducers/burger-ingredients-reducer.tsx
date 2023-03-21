import {
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_ERROR,
  BURGER_INGREDIENTS_INCREASECOUNTER,
  BURGER_INGREDIENTS_DECREASECOUNTER,
  BURGER_INGREDIENT_CHANGE_BUN,
  BURGER_INGREDIENT_REQUEST
} from '../actions/burger-ingredients-actions';



export interface IIngredient {
  _id: string
  calories: number
  carbohydrates: number
  fat: number
  image: string
  image_large: string
  image_mobile: string
  name: string
  price: number
  proteins: number
  type: string
  uniqId: string
  counter: number
  sortedId: string

}

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

}



interface IIngredientsState {
  items: IIngredient[],
  queryError: boolean,

}

const burgerIngredientsInitialState: IIngredientsState = {
  items: [],
  queryError: false,


}




// список всех полученных ингредиентов
//const burgerIngredientsInitialState = { items:  [], queryError: false }




export const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action: any) => {
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
