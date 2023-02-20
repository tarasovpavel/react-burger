import React from "react";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
import utils from '../../Utils/utils';



function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [e_MailValue, setE_MailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const onChange = e => {
    setE_MailValue(e.target.value)
  }

  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }

  const onButtonClick = async (e) => {
    //console.log('onSubmit');
    if ((e_MailValue.length > 0) && (passwordValue.length > 0)) {
      //localStorage.setItem('refreshToken', '');
      e.preventDefault();
      dispatch(utils.Authorization(e_MailValue, passwordValue));

     // console.log(localStorage.getItem('refreshToken'));
      if (localStorage.getItem('refreshToken') !== '') {
        //console.log(localStorage.getItem('refreshToken'));
        navigate("/");
      }
    }
  }

  const userAuthorized = document.cookie.indexOf('accessToken') >= 0;

  return (console.log('авторизация') &&

    userAuthorized ? (
    navigate(-1)
  )
    :
    (
      <form onSubmit={onButtonClick}>
        < div className={styles.container} >

          <h1 className="text text_type_main-medium mb-6">   Вход  </h1>

          <div className=" mb-6 mt-6">
            <Input
              type={"text"}
              placeholder={"E-mail"}
              onChange={onChange}
              value={e_MailValue}
              size={"default"}
              extraClass="mb-2"

            />
          </div>


          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={'password'}
              extraClass="mb-2"
            />

          </div>

          <Button htmltype="submit" type="primary" size="large" >Войти</Button>

          <p className="text text_type_main-default text_color_inactive mt-20">Вы — новый пользователь?
            <Link to={"/register"} > Зарегистрироваться</Link>
          </p>

          <p className="text text_type_main-default text_color_inactive mt-4">Забыли пароль?
            <Link to={"/forgot-password"} > Восстановить пароль</Link>
          </p>

        </div>
      </form>
    )
  )
}

export default LoginPage;