import React, { useState, useRef } from "react";
import { Button, Input, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styles from "./register.module.css";
import utils from '../../Utils/utils';

function RegisterPage() {
  const dispatch = useDispatch();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onButtonClick = (e) => {
    //console.log('register');

    if ((name.length > 0) && (email.length > 0) && (password.length > 0)) {
      e.preventDefault();
      dispatch(utils.registerUser(email, password, name));
      const userAuthorized = document.cookie.indexOf('accessToken') >= 0;
      if (userAuthorized)  navigate('/login');
    }
  }

  const navigate = useNavigate();
  

  return (
    



        <form onSubmit={onButtonClick}>
          < div className={styles.container} >
            <p className="text text_type_main-medium mb-6">Регистрация</p>
            <div className="mb-6">
              <Input type={'text'}
                placeholder={'Имя пользователя'}
                onChange={e => setName(e.target.value)}
                value={name}
                name={'name'}
                errorText={'Ошибка'}
              />
            </div>
            <div className="mb-6">
              <Input type={'email'}
                placeholder={'E-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'email'}
                errorText={'Ошибка'}

              />
            </div>
            <div className="mb-6">
              <PasswordInput
                onChange={e => setPassword(e.target.value)}
                value={password}
                name={'password'}
              />
            </div>


            <div className="mb-6">
              <Button htmltype="submit" type="primary" size="medium" >
                Зарегистрироваться
              </Button>
            </div>


            <p className="text text_type_main-default text_color_inactive mt-20">
              {'Уже зарегистрированы?   '}
              <Link to="/login">
                Войти
              </Link>
            </p>

          </div>
        </form>
      
  )
}

export default RegisterPage;