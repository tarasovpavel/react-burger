import React, {  useEffect, FC } from "react";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./register.module.css";
import { registerUser } from '../../services/actions/redux-functions';
import utils from '../../Utils/utils';
import {useDispatch} from '../../hooks/hooks';

const RegisterPage: FC = () => {
  const dispatch = useDispatch();


  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');


  const onButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    //console.log('register');

    if ((name.length > 0) && (email.length > 0) && (password.length > 0)) {
      e.preventDefault();
      dispatch(registerUser(email, password, name));
      //const userAuthorized = document.cookie.indexOf('accessToken') >= 0;
      //if (userAuthorized) 
      navigate('/login');
    }
  }

  const navigate = useNavigate();



  useEffect(() => {
    //setUserAuthorized(document.cookie.indexOf('accessToken') >= 0)
    if ((document.cookie.indexOf('accessToken') >= 0) && (utils.getCookie('accessToken') !== 'undefined')) navigate(-1);

  }, []);




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
          <Button htmlType="submit" type="primary" size="medium" >
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