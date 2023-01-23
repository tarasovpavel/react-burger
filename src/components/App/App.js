  import React, { useState, useEffect } from 'react';
import './App';
import styles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients/burgerIngredients';
import BurgerConstructor from '../BurgerConstructor/burgerConstructor';
import AppHeader from '../AppHeader/appHeader';
import { BrowserRouter } from 'react-router-dom';
//import data1 from  '../../Data/data';
import utils from "../../Utils/utils";
import { BurgerConstructorContext} from "../../services/burgerConstructorContext";



function App() {
  const [dataIngredient, setData] = useState({});
  const [isLoad, setIsLoad] = useState(false);

 
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
/*
useEffect(() => { setData(data1);setIsLoad (true);
});
*/


useEffect(() => {
  if (!isLoad) {
    utils
      .getIngredients()
      .then(({ data }) => {
          setData(data);
          setIsLoad(true);
      })
      .catch(console.log);
  }
}, []);





  return (
      
    
      <main className={`${styles.page} `}>

        <BrowserRouter>
          <AppHeader />
          
        {isLoad &&  (
          <BurgerConstructorContext.Provider value={{dataIngredient, setData}}>
          < div className={styles.container} >
            <div className={styles.container_div_left}>
              <BurgerIngredients ingredients={dataIngredient}/>
            </div>
            <div className={styles.container_div_left}>
              <BurgerConstructor />
            </div>
          </div>
          </BurgerConstructorContext.Provider>)}
         
        </BrowserRouter>
      </main>

  );
}

export default App;
