import React from 'react';
import { Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
//import data from '../../Data/data.json';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerIngredients.module.css';
//import imageSelected from '../../images/selected.jpg';
import { useState, useMemo } from 'react';
//import userDetailContext from '../App/App';
import { Modal } from '../Modal/modal';
import { IngredientDetail } from '../IngredientDetail/ingredientDetail';
import PropTypes from 'prop-types';

function BurgerIngredients(props) {
  //const ingredients = useContext(userDetailContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingredient, setIngredient] = useState({});



  const bunIngredients = useMemo(() => {
    return props.ingredients.filter((item) => item.type === "bun");
  }, [props.ingredients]);

  const sauceIngredients = useMemo(() => {
    return props.ingredients.filter((item) => item.type === "sauce");
  }, [props.ingredients]);

  const mainIngredients = useMemo(() => {
    return props.ingredients.filter((item) => item.type === "main");
  }, [props.ingredients]);

  function handleIngredientClick(item) {
    setIngredient(item);
//console.log('1');
    setIsModalVisible(true);
  }

  function handleIngredientClose() {
    setIngredient({});
    setIsModalVisible(false);
  }



  return (

    <>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="bun"  >
          Булки
        </Tab>
        <Tab value="sauce"  >
          Соусы
        </Tab>
        <Tab value="main" >
          Начинки
        </Tab>
      </div>


      <div className={styles.container}>
        <>
          <p className="text text_type_main-medium pr-1">Булки</p>

          {bunIngredients.map((item) => (
            <div className={styles.container_div_left} onClick={() => handleIngredientClick(item)} >
              <div >
                <div className={styles.display_selected} >
                  <Counter count={1} size="default" extraClass="m-1" />

                </div>

                <img src={item.image} alt={item.name}/>
                <div >
                  <p className="text text_type_main-default pr-1 m-1 p-1">{item.price + " "}
                    <CurrencyIcon type='primary' />
                  </p>
                </div>
                <div >
                  <p className="text text_type_main-default pr-1">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </>


        <>
          <p className="text text_type_main-medium pr-1">Соусы</p>

          {sauceIngredients.map((item) => (
            <div className={styles.container_div_left} onClick={() => handleIngredientClick(item)}>
              <div>
                <img src={item.image} alt={item.name}/>
                <div >
                  <p className="text text_type_main-default pr-1">{item.price + " "}
                    <CurrencyIcon type='primary' />
                  </p>
                </div>
                <div >
                  <p className="text text_type_main-default pr-1">{item.name}</p>
                </div>

              </div>
            </div>
          ))}
        </>


        <>
          <p className="text text_type_main-medium pr-1">Начинка</p>

          {mainIngredients.map((item) => (
            <div className={styles.container_div_left} onClick={() => handleIngredientClick(item)}>
              <div>
                <img src={item.image} alt={item.name}/>
                <div >
                  <p className="text text_type_main-default pr-1">{item.price + " "}
                    <CurrencyIcon type='primary' />
                  </p>
                </div>
                <div >
                  <p className="text text_type_main-default pr-1">{item.name}</p>
                </div>

              </div>
            </div>
          ))}
        </>
      </div>
      {isModalVisible &&
        <div style={{ overflow: 'hidden' }}>
          {
            <Modal header="Внимание!" onClose={handleIngredientClose} >
              <IngredientDetail props={ingredient} />
            </Modal>
          }
        </div>
      }

    </>



  );
}

export default BurgerIngredients; 
