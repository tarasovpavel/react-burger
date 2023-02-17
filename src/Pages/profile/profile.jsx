import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Input, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import utils from '../../Utils/utils';

function ProfilePage() {
  const dispatch = useDispatch();
  
  const userData = useSelector((store) => store.userData); 

  const [nameValue, setName] = React.useState(userData.userName);
  const [passwordValue, setPasswordValue] = React.useState(userData.password);
  const [eMailValue, setEMailValue] = React.useState(userData.email);


  const [userDataChanged, setUserDataChanged] = React.useState(false);

  const onNameChange = e => {
    setName(e.target.value);
    setUserDataChanged(true);
  }

  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
    setUserDataChanged(true);
  }

  const onEMailChange = e => {
    setEMailValue(e.target.value);
    setUserDataChanged(true);
  }

  function onLogout() {
    dispatch(utils.logout());
  }

  function onReset() {
    //dispatch(utils.logout());
    //console.log(userData);
    setName(userData.userName);
    setPasswordValue(userData.password);
    setEMailValue(userData.email);
    
    console.log(userData);
    document.getElementById('name').value = (userData.userName!==undefined) ? userData.userName : '';
    document.getElementById('email').value = userData.email;
    document.getElementById('password').value = userData.password;
  

  
    setUserDataChanged(false);
  }

  const onSave =(e) => {
//сохраняем данные на сервер Сохраняем данные  в стор
    console.log('onSave');
    e.preventDefault();
    dispatch(utils.updateUserData(eMailValue, nameValue, passwordValue));
    setUserDataChanged(false);
  }  


  

  return (
    < div className={styles.container} >

      < div className={styles.container_div_left} >
        <nav>
          <ul className={`text text_type_main-medium text_color_inactive`} >
            <li className={"mb-10"}>
              <NavLink
                className= {`text text_type_main-medium text_color_inactive mb-6`}
                to={'/profile'} exact
              >Профиль
              </NavLink>
            </li>
            <li className={"mb-10"}>
              <NavLink
                className={`text text_type_main-medium text_color_inactive mb-6`}

                to={'/profile/orders'} exact
              >История заказов
              </NavLink>
            </li>
            <li className={"mb-10"}>
              <button
                className={`text text_type_main-medium text_color_inactive`}
                onClick={onLogout}
              >Выход</button>
            </li>
          </ul>
        </nav>

        <div className={"mb-10"}>
          <p className={`text_type_main-default text_color_inactive`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </div>
      < div className={styles.container_div_right} >

        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            onChange={onNameChange}
            value={nameValue}
            id = {"name"}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"E-mail"}
            onChange={onEMailChange}
            value={eMailValue}
            id = {"email"}
          />

        </div>
        <div className="mb-10">
          <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={'passwordValue'}
            extraClass="mb-4"
            id = {"password"}
          />
        </div>
        {
          (userDataChanged) && (
          <div className="mb-10"  style={{float:"right"}}>
                <Button htmlType="button" type="primary" size="medium" onClick={onReset}>                    
                    Отменить
                </Button>
                <p></p>
                <Button htmlType="button" type="primary" size="medium" onClick={onSave}>                    
                    Сохранить
                </Button>
          </div>)
        }

      </div>

    </div>
  )
}

export default ProfilePage;