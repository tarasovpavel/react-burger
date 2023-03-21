import React, { FC } from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useMemo } from 'react';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import ConstructorCard from '../constructor-card/constructor-card';
import utils from "../../Utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { ORDERDETAILS_DELETE } from "../../services/actions/order-details-actions";
import { BURGER_CONSTRUCTOR_ADD_INGREDIENT, BURGER_CONSTRUCTOR_CHANGE_BUN } from "../../services/actions/burger-constructor-actions";
import {
  BURGER_INGREDIENTS_INCREASECOUNTER, BURGER_INGREDIENT_CHANGE_BUN
} from "../../services/actions/burger-ingredients-actions";
import { useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { getOrderNumberPost } from '../../services/actions/redux-functions';
import { StateType } from 'typesafe-actions';
import { IIngredient, nullIngredient } from '../../services/reducers/burger-ingredients-reducer';

import rootReducer from "../../services/reducers/reducer";
export type Store = StateType<typeof rootReducer>;


const BurgerConstructor: FC = () => {
  //const [ingredients, setIngredients] = useState(null);

  //const { dataIngredient, setData } = useState(null);
  const dispatch = useDispatch();





  const dataIngredient = useSelector((store: Store) => store.burgerConstructorData); // только ингредиенты контсруктора, и bun
  const dataIngredients = useSelector((store: Store) => store.burgerIngredientsData.items); //Все существующие компоненты
  const orderNumber = useSelector((store: Store) => store.orderDetailsData.item);
  //console.log (dataIngredient);
  //console.log (dataIngredients);
  //console.log (orderNumber);
  // Расчет фиктивной полной стоимости, потом будем считать только выбранные
  const SumPrice = useMemo(() => {
    //console.log('getSumPrice');
    //console.log( dataIngredient.items);
    let total = 0;

    if (dataIngredient.items.length > 0) {
      var i: number;
      for (i = 0; i < dataIngredient.items.length; i++) {
        total += dataIngredient.items[i].data.price;
        //console.log(dataIngredient.items[i].price);
      }

      /* total =
         dataIngredient.items.   reduce((prevValue:number, currentValue:any) => {
           //console.log(dataIngredient);
           if (currentValue !== undefined)
             return prevValue + currentValue.data.price
           //else
           // return prevValue;
         }
           , 0);*/
    }
    //console.log(total);
    //console.log (dataIngredient.bun + "1");
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
    //console.log(utils.getCookie( 'accessToken')!== 'undefined');

    if (((document.cookie.indexOf('accessToken') >= 0) && (utils.getCookie('accessToken') !== 'undefined') && (localStorage.getItem('refreshToken') !== '')))

      postOrder();
    else {
      //console.log('handleOrderClick');
      navigate('/login');
    }
    // console.log('handleOrderClick');
    // console.log(orderNumber);
    //setIsModalVisible(true);

  }

  function handleOrderClose() {
    //setIsModalVisible(false);
    dispatch<any>({
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
    dispatch<any>(getOrderNumberPost(ingredientsList));


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



  function onDropHandler(data: any) {
    //const { _id, type } = data;

    //  console.log(data);

    (data.type !== 'bun') &&
      dispatch<any>({
        type: BURGER_CONSTRUCTOR_ADD_INGREDIENT,
        item: { data, sortedId: data._id, uuid: uuid() }
      }) &&
      dispatch<any>({
        type: BURGER_INGREDIENTS_INCREASECOUNTER,
        item: data,
      })

      ;

    (data.type === 'bun') &&
      dispatch<any>({
        type: BURGER_CONSTRUCTOR_CHANGE_BUN,
        bun: data._id,
      }) &&
      dispatch<any>({
        type: BURGER_INGREDIENT_CHANGE_BUN,
        item: data,
      });
  };

  //console.log(dataIngredient);


  return (
    < div ref={dropTargetRef} >
      <p className="text text_type_main-medium pt-20 pb-10"> </p>

      <div >
        {/*Если bun-пустой, то рисуем картинки))*/}
        <div >
          {!(dataIngredient.bun) &&
            <ConstructorCard item={nullIngredient} type="bunUp" key={"emptyBun"} ></ConstructorCard>}
        </div>
        <div >
          {/*Вставляем одну булку- верх, а потом и низ))*/}
          {(dataIngredient.bun) &&
            <ConstructorCard item={bunIngredients[0]} type="bunUp" key={bunIngredients[0]._id + "bunUp"}  ></ConstructorCard>}
        </div>

        <div className={`${styles.container} custom-scroll mt-10 pr-2`}  >

          {/*Если sauseMain-пустой, то рисуем приглашение))*/}

          {(dataIngredient.items.length === 0) &&
            <ConstructorCard item={nullIngredient} key={"emptyMain"} type="sausemain" ></ConstructorCard>}

          {(dataIngredient.items.length > 0) && (sauseMainIngredients.map((item, index) => (

            <ConstructorCard item={item.data} key={item.uuid} type="sausemain" index={index}></ConstructorCard>

          )))}
        </div>
        {/*Вставляем одну булку- верх, а потом и низ))*/}
        <div>
          {(dataIngredient.bun) &&
            <ConstructorCard item={bunIngredients[0]} type="bunDown" key={bunIngredients[0]._id + "bunDown"}  ></ConstructorCard>
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
            <Modal onClose={handleOrderClose} >
              <OrderDetails />
            </Modal>
          }
        </div>
      }
    </div >


  );

}

export default BurgerConstructor;