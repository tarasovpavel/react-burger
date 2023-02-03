import { combineReducers } from 'redux';
import {
  BURGER_INGREDIENTS_QUERY,
  BURGER_INGREDIENTS_SUCCESS,
  BURGER_INGREDIENTS_ERROR,
  BURGER_CONSTRUCTOR_ADD_INGREDIENT,
  BURGER_CONSTRUCTOR_CHANGE_BUN,
  BURGER_CONSTRUCTOR_DELETE,
  BURGER_CONSTRUCTOR_SORT,
  BURGER_CONSTRUCTOR_MOVE,
  BURGER_CONSTRUCTOR_CLEAR,
  ORDERDETAILS_QUERY,
  ORDERDETAILS_SUCCESS,
  ORDERDETAILS_ERROR,
  ORDERDETAILS_DELETE,
  INGREDIENTDETAILS_QUERY,
  INGREDIENTDETAILS_CLOSE,
  INGREDIENTDETAILS_ERROR
} from '../actions/actions';

 


// список всех полученных ингредиентов
let burgerIngredientsInitialState = { items: [], queryError: false }

const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action) => {
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

    default: {
      return state;
    }
  }
};

// список всех ингредиентов в текущем конструкторе бургера,
let burgerConstructorInitialState = { items: [], bun:  "60d3b41abdacab0026a733c6" }
const burgerConstructorReducer = (state = burgerConstructorInitialState, action) => {
  switch (action.type) {
    case BURGER_CONSTRUCTOR_ADD_INGREDIENT: {
      return {
        ...state,
        items: [...state.items , action.item ],
      };
    }
    case BURGER_CONSTRUCTOR_CHANGE_BUN: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case   BURGER_CONSTRUCTOR_DELETE
    : {
      return {
        ...state,
        items: [...state.items].filter(item => item.sortedId !== action.sortedId) }
        
      };
    case BURGER_CONSTRUCTOR_SORT: {
      let tempArray = [...state.items].sort((a,b) => a.sortedId > b.sortedId)
      
      return {
        ...state,
        items: tempArray,
      };
    }
    case BURGER_CONSTRUCTOR_CLEAR: {
      console.log('BURGER_CONSTRUCTOR_CLEAR');
      return {
        items: [], 
        bun:  "60d3b41abdacab0026a733c6"
      };
    }    
    case BURGER_CONSTRUCTOR_MOVE: {
      let tempArray = [...state.items];
      [ tempArray[action.dragIndex], tempArray[action.hoverIndex] ] = 
          [ tempArray[action.hoverIndex], tempArray[action.dragIndex] ];
      tempArray[action.dragIndex].sortedId=  tempArray[action.hoverIndex].sortedId;
      return {
        ...state,
        items: tempArray,
      };
    }
    default:
            return state;
  }
}

/*
MOVE
congredientsst newIn = [...state.ingredients];
      [ newIngredients[action.dragIndex], newIngredients[action.hoverIndex] ] = [ newIngredients[action.hoverIndex], newIngredients[action.dragIndex] ];
      return {
        ...state,
        ingredients: newIngredients,
        */    

  



  // бъект текущего просматриваемого ингредиента,
  const orderDetailsInitialState = { item:'', requestError: false }
  const orderDetailsReducer = (state=orderDetailsInitialState, action) => { 
    console.log(action.item);
    switch (action.type) {
      case ORDERDETAILS_SUCCESS: {
        return {
          item: action.item,
          requestError: false,
        };
      }
      case ORDERDETAILS_ERROR: {
        return {
            item: '',
            requestError: true,
        }
      }
      case ORDERDETAILS_DELETE: {
          return {
              item: '',
              requestError: false,
          }
    }
    default:
      return state 
   }
  }

  //объект созданного заказа.
  const ingredientDetailsInitialState = { item: {}, requestError: false }
  const ingredientDetailReducer = (state = ingredientDetailsInitialState, action) => {
//    console.log('ingredientDetailReducer');
//    console.log(action);
    switch (action.type) {
      
      case INGREDIENTDETAILS_QUERY: {
        return {
          item: action.item,
          requestError: false,
        };
      }
      case INGREDIENTDETAILS_CLOSE: {
        return {
            item: {},
            requestError: false
        }
      }
      case  INGREDIENTDETAILS_ERROR: {
        return {
            item: {},
            requestError: true
        }
      }
      default:
        return state 
    }
  };


  const rootReducer = combineReducers({
    burgerIngredientsData: burgerIngredientsReducer,
    burgerConstructorData: burgerConstructorReducer,
    ingredientDetailData: ingredientDetailReducer,
    orderDetailsData: orderDetailsReducer,
  });
  export default rootReducer;

  