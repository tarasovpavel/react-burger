import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
//import data from '../../Data/data.json';
import styles from './burger-ingredients.module.css';
//import imageSelected from '../../images/selected.jpg';
import { useState, useMemo, useRef } from 'react';

import { useSelector, useDispatch } from "../../hooks/hooks";
import { INGREDIENTDETAILS_QUERY } from "../../services/actions/ingredient-details-actions";
import IngredientCard from '../ingredient-card/ingredient-card';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { StateType } from 'typesafe-actions';
import { IIngredient } from '../../types/types';

import rootReducer from "../../services/reducers/reducer";
export type Store = StateType<typeof rootReducer>;


const BurgerIngredients: FC = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const dataIngredient = useSelector((store: Store) => store.burgerIngredientsData.items);
  //const ingredientData = useSelector((store) => store.ingredientDetailData.item);


  const [activeTab, setActiveTab] = useState<string | undefined>("bun");




  //Рефы на заголовки типов интгредиентов
  const bunMenuRef = useRef<HTMLDivElement>(null);
  const headerMenuRef = useRef<HTMLDivElement>(null);
  const sauceMenuRef = useRef<HTMLDivElement>(null);
  const mainMenuRef = useRef<HTMLDivElement>(null);



  // const { dataIngredient, setData } = useContext(BurgerIngredientsContext);


  const bunIngredients = useMemo(() => {
    //console.log('BurgerIngredientsSelector');
    //console.log(dataIngredient);
    return dataIngredient.filter((item) => item.type === "bun");
  }, [dataIngredient]);

  const sauceIngredients = useMemo(() => {
    return dataIngredient.filter((item) => item.type === "sauce");
  }, [dataIngredient]);

  const mainIngredients = useMemo(() => {
    return dataIngredient.filter((item) => item.type === "main");
  }, [dataIngredient]);
  const navigate = useNavigate();

  function handleIngredientClick(item: IIngredient) {
    //setIngredient(item);
    //console.log('click');
    dispatch({
      type: INGREDIENTDETAILS_QUERY,
      item: item
    });
    //console.log(item);
    const id = item._id;
    //console.log('/ingredients/${id}');
    navigate(`/ingredients/${id}`, { state: { background: location } });
  }

  function handleScroll(e: React.UIEvent<HTMLElement>) {
    //console.log('scr1');
    e.stopPropagation();
    let bunDistance = 0;
    if ((headerMenuRef.current != null) && (bunMenuRef.current != null))
      bunDistance = headerMenuRef.current.getBoundingClientRect().top - bunMenuRef.current.getBoundingClientRect().top;
    let sauceDistance = 0;
    if ((headerMenuRef.current != null) && (sauceMenuRef.current != null))
      sauceDistance = headerMenuRef.current.getBoundingClientRect().top - sauceMenuRef.current.getBoundingClientRect().top;
    let mainDistance = 0;
    if ((headerMenuRef.current != null) && (mainMenuRef.current != null))
      mainDistance = headerMenuRef.current.getBoundingClientRect().top - mainMenuRef.current.getBoundingClientRect().top;

    // console.log("bunDistance  " + bunDistance);
    // console.log("sauceDistance" + sauceDistance);
    // console.log("mainDistance" + mainDistance);

    if ((Math.abs(bunDistance) < Math.abs(sauceDistance)) && (Math.abs(bunDistance) < Math.abs(mainDistance))) { setActiveTab("bun") }
    else {
      (Math.abs(mainDistance) < Math.abs(sauceDistance)) ? setActiveTab("main") : setActiveTab("sauce");

    }


    //setActiveTab
  }

  function handleTabClick(value: string) {
    switch (value) {
      case 'bun':
        bunMenuRef.current?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'sauce':
        sauceMenuRef.current?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'main':
        mainMenuRef.current?.scrollIntoView({ behavior: 'smooth' })
        break
      default:
        console.log('ERR!!!')
    }
  }



  return (

    <>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styles.displayFlex} ref={headerMenuRef}>
        <Tab value="bun" active={activeTab === 'bun'} onClick={value => handleTabClick(value)}>
          Булки
        </Tab>
        <Tab value="sauce" active={activeTab === 'sauce'} onClick={value => handleTabClick(value)} >
          Соусы
        </Tab>
        <Tab value="main" active={activeTab === 'main'} onClick={value => handleTabClick(value)}>
          Начинки
        </Tab>
      </div>


      <div className={`${styles.container} custom-scroll mt-10 pr-2`} onScroll={handleScroll} >


        <div ref={bunMenuRef} >
          <p className="text text_type_main-medium pr-1" >Булки</p>

          {bunIngredients.map((item: IIngredient, i) => (
            <div className={styles.container_div_left} key={item._id} onClick={() => handleIngredientClick(item)} >
              <div >
                <IngredientCard item={item} type="dndIngredient" ></IngredientCard>
              </div>
            </div>
          ))}
        </div>



        <div ref={sauceMenuRef} >

          <p className="text text_type_main-medium pr-1"  >Соусы</p>

          {sauceIngredients.map((item: IIngredient, i) => (
            <div className={styles.container_div_left} key={item._id} onClick={() => handleIngredientClick(item)}>
              <div>
                <IngredientCard item={item} type="dndIngredient" ></IngredientCard>
              </div>
            </div>
          ))}
        </div>


        <div ref={mainMenuRef}>
          <p className="text text_type_main-medium pr-1"  >Начинка</p>

          {mainIngredients.map((item: IIngredient, i) => (
            <div className={styles.container_div_left} key={item._id} onClick={() => handleIngredientClick(item)}>
              <div>
                <IngredientCard item={item} type="dndIngredient"></IngredientCard>
              </div>
            </div>
          ))}
        </div>


      </div>



    </>



  );
}

export default BurgerIngredients; 
