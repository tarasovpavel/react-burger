import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
//import data from '../../Data/data.json';
import styles from './burgerIngredients.module.css';
//import imageSelected from '../../images/selected.jpg';
import { useState, useMemo, useRef } from 'react';
import { Modal } from '../Modal/modal';
import { IngredientDetail } from '../IngredientDetail/ingredientDetail';
import { useSelector, useDispatch } from "react-redux";
import { INGREDIENTDETAILS_QUERY, INGREDIENTDETAILS_CLOSE } from "../../services/actions/ingredientDetailsActions";
import { IngredientCard } from '../IngredientCard/ingredientCard';

function BurgerIngredients() {


  const dispatch = useDispatch();
  const dataIngredient = useSelector((store) => store.burgerIngredientsData.items);
  const ingredientData = useSelector((store) => store.ingredientDetailData.item);

  const [activeTab, setActiveTab] = useState("bun");




  //Рефы на заголовки типов интгредиентов
  const bunMenuRef = useRef(null);
  const headerMenuRef = useRef(null);
  const sauceMenuRef = useRef(null);
  const mainMenuRef = useRef(null);



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

  function handleIngredientClick(item) {
    //setIngredient(item);
    //console.log('click');
    dispatch({
      type: INGREDIENTDETAILS_QUERY,
      item: item
    });


  }

  function handleIngredientClose() {
    //setIngredient({});
    dispatch({
      type: INGREDIENTDETAILS_CLOSE,
    });

  }


  function handleScroll(e) {
    //console.log('scr1');
    const bunDistance = headerMenuRef.current.getBoundingClientRect().top - bunMenuRef.current.getBoundingClientRect().top;
    const sauceDistance = headerMenuRef.current.getBoundingClientRect().top - sauceMenuRef.current.getBoundingClientRect().top;
    const mainDistance = headerMenuRef.current.getBoundingClientRect().top - mainMenuRef.current.getBoundingClientRect().top;

    // console.log("bunDistance  " + bunDistance);
    // console.log("sauceDistance" + sauceDistance);
    // console.log("mainDistance" + mainDistance);

    if ((Math.abs(bunDistance) < Math.abs(sauceDistance)) && (Math.abs(bunDistance) < Math.abs(mainDistance))) { setActiveTab("bun") }
    else {
      (Math.abs(mainDistance) < Math.abs(sauceDistance)) ? setActiveTab("main") : setActiveTab("sauce");

    }


    //setActiveTab
  }

  return (

    <>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }} ref={headerMenuRef}>
        <Tab value="bun" active={activeTab === 'bun'}>
          Булки
        </Tab>
        <Tab value="sauce" active={activeTab === 'sauce'} >
          Соусы
        </Tab>
        <Tab value="main" active={activeTab === 'main'}>
          Начинки
        </Tab>
      </div>


      <div className={`${styles.container} custom-scroll mt-10 pr-2` }  onScroll={handleScroll} >


        <div ref={bunMenuRef} >
          <p className="text text_type_main-medium pr-1" style={{ 'margin-top': '24px'}} >Булки</p>

          {bunIngredients.map((item) => (
            <div className={styles.container_div_left} onClick={() => handleIngredientClick(item)} >
              <div >
                <IngredientCard item={{ item }} type="dndIngredient" ></IngredientCard>
              </div>
            </div>
          ))}
        </div>

        
         
        <div ref={sauceMenuRef} >
          <p className="text text_type_main-medium pr-1"  style={{ 'margin-top': '24px'}} >Соусы</p>
          
          {sauceIngredients.map((item) => (
            <div className={styles.container_div_left} style={{ 'margin-top': '24px'}} onClick={() => handleIngredientClick(item)}>
              <div>
                <IngredientCard item={{ item }} type="dndIngredient" ></IngredientCard>
              </div>
            </div>
          ))}
        </div>


        <div ref={mainMenuRef}>
          <p className="text text_type_main-medium pr-1" style={{ 'margin-bottom': '24px'}} >Начинка</p>

          {mainIngredients.map((item) => (
            <div className={styles.container_div_left} style={{ 'margin-top': '24px'}}  onClick={() => handleIngredientClick(item)}>
              <div>
                <IngredientCard item={{ item }} type="dndIngredient" ></IngredientCard>
              </div>
            </div>
          ))}
        </div>


      </div>
      {ingredientData &&
        <div style={{ overflow: 'hidden' }}>
          {
            <Modal header="Внимание!" onClose={handleIngredientClose} >
              <IngredientDetail />
            </Modal>
          }
        </div>
      }

    </>



  );
}

export default BurgerIngredients; 
