import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from "react-router-dom";


class AppHeader extends React.Component {
  state = { isOpen: false };

  onButtonClick = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }


  render() {
    return (

      <header className={styles.header} >
        <nav className={styles.menu}>
          <ul className={styles.menu_up}>
            <li className={styles.menu_up_punkt}>
              <NavLink
                className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
                to='/' >
                <>
                  <BurgerIcon type="primary" />
                  <p className="p-1"></p>
                  <p className="text text_type_main-default"  >Конструктор</p>
                </>
              </NavLink>
            </li>
            <li className={styles.menu_up_punkt}>
              <NavLink
                className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
                to='/' >
                <>
                  <ListIcon type="primary" />
                  <p className="p-1"></p>
                  <p className="text text_type_main-default" >Лента заказов</p>
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
                className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
                to='/profile' >
                <>
                  <ProfileIcon type="primary" />
                  <p className="p-1"></p>
                  <p className="text text_type_main-default" >
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
