import React, { useState, useEffect, createContext } from 'react';
import logo from './logo.svg';
import './App';
import styles from './App.module.css';

import BurgerIngredients from '../BurgerIngredients/burgerIngredients';
import BurgerConstructor from '../BurgerConstructor/burgerConstructor';
import AppHeader from '../AppHeader/appHeader';
import { BrowserRouter } from 'react-router-dom';
import { dataPath } from '../../constant';


export const userDetailContext = React.createContext({});


function App() {
  const path = '';
  const [data, setData] = useState({});
  const [isFetch, setIsFetch] = useState(false);


  useEffect(() => {
    const fetchData = () => {
      fetch('https://norma.nomoreparties.space/api/ingredients')
        .then(response => response.json())
        .then(result => { setData(result); setIsFetch(true) })

        .catch(e => {
          console.log(e);
          setData({});
          setIsFetch(false);
        });
    }
    fetchData();
  }
    , []);




  return (
    <userDetailContext.Provider value={{ data} }>
      <main className={`${styles.page} `}>

        <BrowserRouter>
          <AppHeader />

          < div className={styles.container} >
            <div className={styles.container_div_left}>
              <BurgerIngredients />
            </div>
            <div className={styles.container_div_right}>
              <BurgerConstructor />
            </div>        
          </div>
        </BrowserRouter>
      </main>
    </userDetailContext.Provider>

  );
}

export default App;
