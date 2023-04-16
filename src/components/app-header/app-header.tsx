import { FC } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const AppHeader: FC = () => {
  const { pathname } = useLocation();

  return (

    <header className={styles.header} >
      <nav className={styles.menu}>
        <ul className={styles.menu_up}>
          <li className={styles.menu_up_punkt}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
              to='/' >

              <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />

              <p className="p-1"></p>
              <p className="text text_type_main-default"  >Конструктор</p>



            </NavLink>
          </li>
          <li className={styles.menu_up_punkt}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
              to='/feed' >
              <>
                <ListIcon type={pathname === '/feed' ? "primary" : "secondary"} />
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
                <ProfileIcon type={pathname === '/profile' ? "primary" : "secondary"} />
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

export default AppHeader; 
