import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import {  BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appHeader.module.css' ;
import { NavLink, Link } from "react-router-dom";


class AppHeader extends React.Component {
  state = { isOpen: false };

  onButtonClick = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
  
  
  render() {
    return (

      <header className={styles.header } style = {{backgroundColor: '#1C1C21', height:'88px', top:'40px', height:'40px', width:'100%'}}>
      <nav className={styles.menu}>
        <ul className={styles.menu_up}>
          <li className={styles.menu_up_punkt}>
              <NavLink
                  className={styles.link}
                  to='/' >
                  <>
                  <BurgerIcon type="primary"/>
                  <p className="p-1"></p>
                  <p className="text text_type_main-default"  style={{ color: '#8585AD' }} >Конструктор</p>
                  </>
              </NavLink>
          </li>
          <li className={styles.menu_up_punkt}>
            <NavLink
              className={styles.link}
              to='/' >
                <>
              <ListIcon type="primary" />
              <p className="p-1"></p>
              <p className="text text_type_main-default" style={{ color: '#8585AD' }} >Лента заказов</p>
              </>
             </NavLink>  
          </li>
          <li className={styles.menu_up_punkt}>
            <NavLink to='/' className={styles.link}>
              <Logo />
            </NavLink>
          </li>
          <li className={styles.menu_up_punkt}>
          <NavLink
              className={styles.link}
              to='/' >
                <>
                <ProfileIcon type="primary" />
                <p className="p-1"></p>
              <p className="text text_type_main-default" style={{ color: '#8585AD' }} >
                  Личный кабинет
              </p>
            </>
          </NavLink>
          </li>
        </ul>
      </nav>
    </header>    

  



    );
  }
}

export default AppHeader; 
