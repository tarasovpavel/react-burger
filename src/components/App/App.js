import React, { useState, useEffect } from 'react';
import './App';
import styles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/burgerIngredients';
import BurgerConstructor from '../BurgerConstructor/burgerConstructor';
import AppHeader from '../AppHeader/appHeader';
import { BrowserRouter } from 'react-router-dom';
//import data1 from  '../../Data/data';
import utils from "../../Utils/utils";
import {BURGER_INGREDIENTS_ERROR, BURGER_INGREDIENTS_SUCCESS} from  "../../services/actions/burgerIngredientsActions";
import { BURGER_CONSTRUCTOR_CLEAR} from  "../../services/actions/burgerConstructorActions";

import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();
 
    //const { data1, loading, error } = useFetch('https://norma.nomoreparties.space/api/ingredients');
   // console.log(data1) ;
   // setData(data1);setIsLoad (true);

   useEffect(()=> {
  // Отправляем экшен-функцию
  dispatch(getRecommendedItems())
 // setIsLoad(true);
}, [dispatch]) 

function getRecommendedItems() {
  return function(dispatch) {
 //   dispatch({
 //     type: GET_RECOMMENDED_ITEMS_REQUEST
 //   });
    utils
    .getIngredients()
      .then(({ data }) => {
      if (data ) {
        dispatch({ 
          type: BURGER_INGREDIENTS_SUCCESS, 
          items:data.map(item => ({ ...item, counter: 0 })),

        });
        dispatch({ 
          type: BURGER_CONSTRUCTOR_CLEAR,
        });
        setIsLoad(true)
        } else {
        dispatch({
          type: BURGER_INGREDIENTS_ERROR
        })
        }

      })
        .catch(err => { console.log(err) })
        //.finally(setIsLoad(true));
      
      
  
  };

}
/*


useEffect(() => {
  if (!isLoad) {
    utils
      .getIngredients()
      .then(({ data }) => {
          setData(data);
          setIsLoad(true);
          console.log(data);
          dispatch({ 
            type: BURGER_INGREDIENTS_SUCCESS, 
            items: data
          });
      })
      .catch(console.log);
  }
}, []);
*/




  return (
      
    
      <main className={`${styles.page} `}>

        <BrowserRouter>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
           {isLoad &&  (

                      < div className={styles.container} >
                        <div className={styles.container_div_left}>
                          
                            <BurgerIngredients />
                          
                        </div>
                        <div className={styles.container_div_left}>
                      
                          <BurgerConstructor />
                  
                        </div>           

                      </div>
            )}
            </DndProvider>
        </BrowserRouter>
      </main>

  );
}

export default App;
/*

            */