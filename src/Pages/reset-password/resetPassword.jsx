import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "../reset-password/resetPassword.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import utils from '../../Utils/utils';

export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');

  const dispatch = useDispatch();

  const createNewPassword = () => {
      console.log('createNewPassword');
      if ((password.length > 0) && (token.length > 0))
          dispatch(utils.createNewPassword(password, token));
  }



  const  navigate= useNavigate();
  const userAuthorized = document.cookie.indexOf('accessToken') >=0;

  const userData = useSelector((store) => store.userData); 
//Если !userAuthorized то разрешать только если заходил на forgot и успешно получил сообщение о смене пароля
// 
  return (
     
    userAuthorized?(
      navigate (-1)
    )
    :
    (
       userData.ResetPasswordPage &&
   (
    <>
        <div className={styles.container}>
           
            
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>

            <div className="mb-6">
                <Input 
                    type={"password"} 
                    placeholder={"Введите новый пароль"} 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
           </div>
            <div className="mb-6">
                <Input 
                    type={"text"} 
                    placeholder={"Введите код из письма"} 
                    value={token}
                    onChange={(event) => setToken(event.target.value)}
                />
             </div>
             <div className="mb-6">
                <Button type="primary" size="small"  htmlType="button" onClick={() => createNewPassword()}>
                    <p className="text text_type_main-default">Сохранить</p>
                </Button>
             </div>
            <div >
                    <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                        <Link to="/register" className="text text_type_main-default pl-2">Войти</Link>
                    </span>
            </div>
        </div>
    </>)));
  
}