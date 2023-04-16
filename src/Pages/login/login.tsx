import React, { useEffect, FC } from "react";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "../../hooks/hooks";
import styles from "./login.module.css";
import { authorization } from '../../services/actions/redux-functions';
import { useLocation } from 'react-router-dom';
import utils from "../../Utils/utils";
import { StateType } from 'typesafe-actions';

//import Store  from '../../services/reducers/reducer';
import rootReducer from "../../services/reducers/reducer";
export type Store = StateType<typeof rootReducer>;


const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const location = useLocation();
  const from = location.state?.from || '/';
  const [eMailValue, setEMailValue] = React.useState<string>('');
  const [passwordValue, setPasswordValue] = React.useState<string>('');
  const [userAuthorized, setUserAuthorized] = React.useState<boolean | undefined>(false);
  const userData = useSelector((state: Store) => state.userData);





  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEMailValue(e.target.value)
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPasswordValue(e.target.value)
  }

  const onButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
  
    if ((eMailValue.length > 0) && (passwordValue.length > 0)) {
      //localStorage.setItem('refreshToken', '');
      e.preventDefault();
      dispatch(authorization(eMailValue, passwordValue));


      if ((utils.getCookie('accessToken') && utils.getCookie('accessToken') !== 'undefined')) {

        navigate(from);
      }
    }
  }

  useEffect(() => {
    if ((utils.getCookie('accessToken') && utils.getCookie('accessToken') !== 'undefined')) {

      navigate(from);
    }
  }, [userData]);


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