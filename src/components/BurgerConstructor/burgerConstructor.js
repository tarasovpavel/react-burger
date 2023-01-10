import React from 'react';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import data from  '../../Data/data.json';

class BurgerConstructor  extends React.Component {
  state = { 
    ingredients: data
};

  
 getSumPrice =  () => {
       let sumPrice = 0;
        this.state.ingredients.filter((item) => item.type === "bun").map((item) => (
        
          sumPrice = sumPrice + item.Price
        ))
        return sumPrice;
       // this.setState({price: sumPrice});
        
      };



  render() {
   
        return (
 <>
          <p className="text text_type_main-medium pt-20 pb-10"> </p>

          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
             // thumbnail={img}
            />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
             // thumbnail={img}
            />
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
            //  thumbnail={img}
            />
          </div>


        <div style={{ float: 'right'}}>
     
          <p className="text text_type_main-default pr-4 pt-20 pb-10">
                
          {this.getSumPrice () + ' '}
                  <CurrencyIcon type='primary' />
          <Button htmlType="button" type="primary" size="medium">
            Оформить заказ
          </Button>
          </p>
          </div>          
 </>             
        ); 
           
  }
}

export default BurgerConstructor; 
