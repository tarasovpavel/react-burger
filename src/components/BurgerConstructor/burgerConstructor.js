import React from 'react';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructor.module.css';
import { useState, useMemo, useContext } from 'react';
import { Modal } from '../Modal/modal';
import { OrderDetails } from '../OrderDetails/orderDetails';
import utils from "../../Utils/utils";
import { useSelector, useDispatch } from "react-redux";
import {ORDERDETAILS_SUCCESS} from  "../../services/actions/actions";



function BurgerConstructor() {
  //const [ingredients, setIngredients] = useState(null);

  //const { dataIngredient, setData } = useState(null);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);


  const  dataIngredient  = useSelector((store) => store.burgerConstructorData); // только ингредиенты контсруктора, и bun
  const  dataIngredients  = useSelector((store) => store.burgerIngredientsData.items); //Все существующие компоненты


  // Расчет фиктивной полной стоимости, потом будем считать только выбранные
  const getSumPrice = useMemo(() => {
    //console.log('getSumPrice');
    //console.log(dataIngredient);
    let total = 0;
    
    if (dataIngredient.items.length > 0) 
    {
    total =
      dataIngredient.items.reduce((prevValue, currentValue) => {
        return prevValue + currentValue.price;
      }
        , 0);
    }
    total+= 2*dataIngredients.filter((item) => item._id === dataIngredient.bun)[0].price;
    return total;
  }, [dataIngredient]);



  const bunIngredients = useMemo(() => {
    return dataIngredients.filter((item) => item._id === dataIngredient.bun);
    // this.setState({price: sumPrice});
  }, [dataIngredient]);


  const sauseMainIngredients = useMemo(() => {
    return dataIngredient.items;
    // this.setState({price: sumPrice});
  }, [dataIngredient]);


  function handleOrderClick() {
    postOrder();
    console.log('handleOrderClick');
    console.log(orderNumber);
    setIsModalVisible(true);
  }

  function handleOrderClose() {
    setIsModalVisible(false);
  }

  //const selectedBunIngredients = dataIngredient.filter((item) => item.type === "bun");

  function postOrder() {
    // Посылаем на данный момент  все ингредиенты 

    let ingredientsList = [];


    for (let item of sauseMainIngredients) {
      ingredientsList.push(item._id);
    }
    for (let item of bunIngredients) {
      ingredientsList.push(item._id);
    }


// Сервис перестал работать правильно.
 /*     dispatch({ 
        type: ORDERDETAILS_SUCCESS, 
        item: '11223344',
      });
*/

    utils
      .getOrderNumberPost(ingredientsList)
      .then((data) => {
        console.log(data);
        console.log(data.order.number);
        setOrderNumber(data.order.number);

        // посылаем данные о номере заказа
        dispatch({ 
          type: ORDERDETAILS_SUCCESS, 
          item: data.order.number,
        });
      })
      .catch(
        console.log
    );
      
  }



  //Пока отображаю часть компонентов, а не выбранные. Стоимость,- по все существующим
  return (
    <>
      <p className="text text_type_main-medium pt-20 pb-10"> </p>

      <div className={styles.container}>
        {/*Вставляем одну булку- верх, а потом и низ))*/}
        <div className={styles.box1} >
          <DragIcon type="primary" />
        </div>
        <div className={styles.box2}>
          <ConstructorElement
            text={bunIngredients[0].name + "  верх"}
            price={bunIngredients[0].price}
            thumbnail={bunIngredients[0].image_mobile}
          />
        </div>


        {sauseMainIngredients.map((item) => (
          <>
            <div className={styles.box1} >
              <DragIcon type="primary" />
            </div>
            <div className={styles.box2}>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            </div>

          </>

        ))}


        {/*Вставляем одну булку- верх, а потом и низ))*/}
        <div className={styles.box1} >
          <DragIcon type="primary" />
        </div>
        <div className={styles.box2}>
          <ConstructorElement
            text={bunIngredients[0].name + "  низ"}
            price={bunIngredients[0].price}
            thumbnail={bunIngredients[0].image_mobile}
          />
        </div>

      </div>



      <div style={{ float: 'right' }}>

        <p className="text text_type_main-default pr-4 pt-20 pb-10">

          {getSumPrice + ' '}
          <CurrencyIcon type='primary' />
          <Button htmlType="button" type="primary" size="medium" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        </p>
      </div>
      {isModalVisible &&
        <div style={{ overflow: 'hidden' }}>
          {
              <Modal header="Внимание!" onClose={handleOrderClose} >
                <OrderDetails  />
              </Modal>
          }
        </div>
      }
    </>


  );

}

export default BurgerConstructor;