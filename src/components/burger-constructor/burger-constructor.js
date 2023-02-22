import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerConstructor.module.css';
import { useMemo } from 'react';
import { Modal } from '../Modal/modal';
import { OrderDetails } from '../OrderDetails/orderDetails';
import { ConstructorCard } from '../ConstructorCard/constructorCard';
import utils from "../../Utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { ORDERDETAILS_DELETE } from "../../services/actions/orderDetailsActions";
import { BURGER_CONSTRUCTOR_ADD_INGREDIENT, BURGER_CONSTRUCTOR_CHANGE_BUN } from "../../services/actions/burgerConstructorActions";
import {
  BURGER_INGREDIENTS_INCREASECOUNTER, BURGER_INGREDIENT_CHANGE_BUN
} from "../../services/actions/burgerIngredientsActions";
import { useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';


function BurgerConstructor() {
  //const [ingredients, setIngredients] = useState(null);

  //const { dataIngredient, setData } = useState(null);
  const dispatch = useDispatch();




  const dataIngredient = useSelector((store) => store.burgerConstructorData); // только ингредиенты контсруктора, и bun
  const dataIngredients = useSelector((store) => store.burgerIngredientsData.items); //Все существующие компоненты
  const orderNumber = useSelector((store) => store.orderDetailsData.item);

  // Расчет фиктивной полной стоимости, потом будем считать только выбранные
  const SumPrice = useMemo(() => {
    //console.log('getSumPrice');
    //console.log( dataIngredient.items);
    let total = 0;

    if (dataIngredient.items.length > 0) {
      total =
        dataIngredient.items.reduce((prevValue, currentValue) => {
          return prevValue + currentValue.data.price;
        }
          , 0);
    }
    //console.log(total);
    if (dataIngredient.bun) { total += 2 * dataIngredients.filter((item) => item._id === dataIngredient.bun)[0].price };

    return total;
  }, [dataIngredients, dataIngredient]);



  const bunIngredients = useMemo(() => {
    return dataIngredients.filter((item) => item._id === dataIngredient.bun);
    // this.setState({price: sumPrice});
  }, [dataIngredients, dataIngredient]);


  const sauseMainIngredients = useMemo(() => {
    //console.log(dataIngredient.items);
    return dataIngredient.items;
    // this.setState({price: sumPrice});
  }, [dataIngredient]);


  const navigate = useNavigate();
  function handleOrderClick() {
    // При нажатии на кнопку «Оформить заказ» неавторизованный пользователь должен переадресовываться на маршрут /login
    console.log(localStorage.getItem('refreshToken'));
    
    if (((document.cookie.indexOf('accessToken') >= 0)  && (localStorage.getItem('refreshToken') !== '')))
      postOrder();
    else
      navigate('/login');
    // console.log('handleOrderClick');
    // console.log(orderNumber);
    //setIsModalVisible(true);

  }

  function handleOrderClose() {
    //setIsModalVisible(false);
    dispatch({
      type: ORDERDETAILS_DELETE,
    });
  }

  //const selectedBunIngredients = dataIngredient.filter((item) => item.type === "bun");

  function postOrder() {
    // Посылаем на данный момент  все ингредиенты 

    let ingredientsList = [];


    for (let item of sauseMainIngredients) {
      ingredientsList.push(item.data._id);
    }
    for (let item of bunIngredients) {
      ingredientsList.push(item._id);
    }
    //console.log(bunIngredients);
    //console.log(sauseMainIngredients);
    dispatch(utils.getOrderNumberPost(ingredientsList));


  }


  const [, dropTargetRef] = useDrop({



    accept: "dndIngredient",
    drop(data) {
      onDropHandler(data);
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    }
  });



  function onDropHandler(data) {
    //const { _id, type } = data;

    //console.log(data);
    let datenow = v4();
    (data.type !== 'bun') &&
      dispatch({
        type: BURGER_CONSTRUCTOR_ADD_INGREDIENT,
        item: { data, sortedId: data._id + datenow }
      }) &&
      dispatch({
        type: BURGER_INGREDIENTS_INCREASECOUNTER,
        item: data,
      })

      ;

    (data.type === 'bun') &&
      dispatch({
        type: BURGER_CONSTRUCTOR_CHANGE_BUN,
        bun: data._id,
      }) &&
      dispatch({
        type: BURGER_INGREDIENT_CHANGE_BUN,
        item: data,
      });
  };



  return (
    < div ref={dropTargetRef} >
      <p className="text text_type_main-medium pt-20 pb-10"> </p>

      <div >
        {/*Если bun-пустой, то рисуем картинки))*/}
        <div >
          {!(dataIngredient.bun) &&
            <ConstructorCard item={null} type="bunUp" key={v4()}></ConstructorCard>}
        </div>
        <div >
          {/*Вставляем одну булку- верх, а потом и низ))*/}
          {(dataIngredient.bun) &&
            <ConstructorCard item={bunIngredients[0]} type="bunUp" key={v4()} ></ConstructorCard>}
        </div>

        <div className={`${styles.container} custom-scroll mt-10 pr-2`}  key={v4()}>

          {/*Если sauseMain-пустой, то рисуем приглашение))*/}

          {(dataIngredient.items.length === 0) &&
            <ConstructorCard item={null} key={v4()} type="sausemain" ></ConstructorCard>}

          {(dataIngredient.items.length > 0) && (sauseMainIngredients.map((item, index) => (
            <ConstructorCard item={item} key={v4()} type="sausemain" index={index}></ConstructorCard>

          )))}
        </div>
        {/*Вставляем одну булку- верх, а потом и низ))*/}
        <div key={v4()}>
          {(dataIngredient.bun) &&
            <ConstructorCard item={bunIngredients[0]} type="bunDown" key={v4()}  ></ConstructorCard>
          }
        </div>

      </div>



      <div className={styles.floatright}>

        <p className="text text_type_main-default pr-4 pt-20 pb-10">

          {SumPrice + ' '}
          <CurrencyIcon type='primary' />
          <Button htmlType="button" type="primary" size="medium" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        </p>
      </div>
      {orderNumber &&
        <div className={styles.overflowHidden}>
          {
            <Modal header="Внимание!" onClose={handleOrderClose} >
              <OrderDetails />
            </Modal>
          }
        </div>
      }
    </div >


  );

}

export default BurgerConstructor;
