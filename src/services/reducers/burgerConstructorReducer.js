import {
  
    BURGER_CONSTRUCTOR_ADD_INGREDIENT,
    BURGER_CONSTRUCTOR_CHANGE_BUN,
    BURGER_CONSTRUCTOR_DELETE,
    BURGER_CONSTRUCTOR_SORT,
    BURGER_CONSTRUCTOR_MOVE,
    BURGER_CONSTRUCTOR_CLEAR,
  } from '../actions/burgerConstructorActions';
  
   
  
  
  
  // список всех ингредиентов в текущем конструкторе бургера,
  const burgerConstructorInitialState = { items: [], bun:  null }
 export  const burgerConstructorReducer = (state = burgerConstructorInitialState, action) => {
    switch (action.type) {
      case BURGER_CONSTRUCTOR_ADD_INGREDIENT: {
        return {
          ...state,
          items: 
                [...state.items , action.item  ],
       
      }
    }
      case BURGER_CONSTRUCTOR_CHANGE_BUN: {
        return {
          ...state,
          bun: action.bun,
        };
      }
      case   BURGER_CONSTRUCTOR_DELETE: {
        //console.log(BURGER_CONSTRUCTOR_DELETE);
        //console.log(action);
        return {
          ...state,
          items:  [...state.items].filter(
            item => item.sortedId !== action.sortedId) }
        };
      case BURGER_CONSTRUCTOR_SORT: {
        let tempArray = [...state.items].sort((a,b) => a.sortedId > b.sortedId)
        
        return {
          ...state,
          items: tempArray,
        };
      }
      case BURGER_CONSTRUCTOR_CLEAR: {
        //console.log('BURGER_CONSTRUCTOR_CLEAR');
        return {
          items: [], 
          bun:  null,
        };
      }    
      case BURGER_CONSTRUCTOR_MOVE: {
       // console.log(BURGER_CONSTRUCTOR_MOVE);
        let tempArray = [...state.items];
        [ tempArray[action.dragIndex], 
        tempArray[action.hoverIndex] ] = 
            [ tempArray[action.hoverIndex], 
            tempArray[action.dragIndex] ];
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
  