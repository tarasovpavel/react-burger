import React from 'react';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructor.module.css';
import { useState, useMemo, useContext } from 'react';
import { Modal } from '../Modal/modal';
import { OrderDetails } from '../OrderDetails/orderDetails';
import { BurgerConstructorContext } from "../../services/burgerConstructorContext";
import utils from "../../Utils/utils";

function BurgerConstructor(props) {
  //const data = useContext(userDetailContext);
  //const [ingredients, setIngredients] = useState(null);

  const { dataIngredient, setData } = useContext(BurgerConstructorContext);


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);


  // Расчет фиктивной полной стоимости, потом будем считать только выбранные
  const getSumPrice = useMemo(() => {
    const total =
      dataIngredient.reduce((prevValue, currentValue) => {
       if (currentValue.type === "bun") { prevValue = prevValue + currentValue.price; }
       return prevValue + currentValue.price;
      }
        , 0);
    return total;
  }, [dataIngredient]);



  const bunIngredients = useMemo(() => {
    return dataIngredient.filter((item) => item.type === "bun");
    // this.setState({price: sumPrice});
  }, [dataIngredient]);


  const sauseMainIngredients = useMemo(() => {
    return dataIngredient.filter((item) => item.type !== "bun");
    // this.setState({price: sumPrice});
  }, [dataIngredient]);


  function handleOrderClick() {
    postOrder();
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
      ingredientsList.push(item._id) ;
    }
    

    utils
    .getOrderNumberPost(ingredientsList)
    .then(( data ) => {
      console.log(data.order.number);
      setOrderNumber(data.order.number);
    })
    .catch(console.log);

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
                text={bunIngredients[1].name  + "  верх"} 
                price={bunIngredients[1].price}
                thumbnail={bunIngredients[1].image_mobile}
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
                text={bunIngredients[1].name  + "  низ"} 
                price={bunIngredients[1].price}
                thumbnail={bunIngredients[1].image_mobile}
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
              <OrderDetails orderNumber={orderNumber}/>
            </Modal>
          }
        </div>
      }
    </>


  );

}

export default BurgerConstructor;