import React, { useEffect } from "react";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
import { authorization } from '../../services/actions/reduxFunctions';



function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eMailValue, setE_MailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [userAuthorized, setUserAuthorized] = React.useState(false);

  const onChange = e => {
    setE_MailValue(e.target.value)
  }

  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }

  const onButtonClick = async (e) => {
    console.log('onSubmit');
    if ((eMailValue.length > 0) && (passwordValue.length > 0)) {
      //localStorage.setItem('refreshToken', '');
      e.preventDefault();
      dispatch(authorization(eMailValue, passwordValue));

      // console.log(localStorage.getItem('refreshToken'));
      if (localStorage.getItem('refreshToken') !== '') {
        //console.log(localStorage.getItem('refreshToken'));
        navigate("/");
      }
    }
  }


  useEffect(() => {
    //setUserAuthorized(document.cookie.indexOf('accessToken') >= 0)
    if (document.cookie.indexOf('accessToken') >= 0) navigate("/");

  }, []);



  return (


    (
      <form onSubmit={onButtonClick}>
        < div className={styles.container} >

          <h1 className="text text_type_main-medium mb-6">   Вход  </h1>

          <div className=" mb-6 mt-6">
            <Input
              type={"text"}
              placeholder={"E-mail"}
              onChange={onChange}
              value={eMailValue}
              size={"default"}
              extraClass="mb-2"

            />
          </div>


          <div className={styles.displayflex}>
            <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={'password'}
              extraClass="mb-2"
            />

          </div>

          <Button htmlType="submit" type="primary" size="large" >Войти</Button>

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