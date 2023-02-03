import React, { useState, useEffect } from 'react';
import './App';
import styles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/burgerIngredients';
import BurgerConstructor from '../BurgerConstructor/burgerConstructor';
import AppHeader from '../AppHeader/appHeader';
import { BrowserRouter } from 'react-router-dom';
//import data1 from  '../../Data/data';
import utils from "../../Utils/utils";
import {BURGER_INGREDIENTS_ERROR, BURGER_INGREDIENTS_SUCCESS, BURGER_CONSTRUCTOR_CLEAR} from  "../../services/actions/actions";
import { useDispatch } from 'react-redux';


function App() {
  const [dataIngredient, setData] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();
 
    //const { data1, loading, error } = useFetch('https://norma.nomoreparties.space/api/ingredients');
   // console.log(data1) ;
   // setData(data1);setIsLoad (true);
 /*
  useEffect(() => {
    
          getIngredients()
              .then(data => {
                if (data) {
                  console.log(data);
                  setData(data)
                }
              })
              .catch(err => { console.log(err) })


              .finally(setIsLoad(true));
              
            }
    , []);

*/


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
          items: data
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
         
        </BrowserRouter>
      </main>

  );
}

export default App;
/*

            */