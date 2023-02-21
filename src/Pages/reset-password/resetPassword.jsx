import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../reset-password/resetPassword.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import {createNewPassword} from '../../services/actions/reduxFunctions';

export default function ResetPasswordPage() {
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');

    const dispatch = useDispatch();



    const navigate = useNavigate();

    const userData = useSelector((store) => store.userData);
    //Если !userAuthorized то разрешать только если заходил на forgot и успешно получил сообщение о смене пароля
    // 

    const createMyNewPassword = (e) => {
        e.preventDefault();
              console.log(token);
        if ((token.length > 0)) {
            dispatch(createNewPassword(password, token));
            navigate('/');
        }
    }

    useEffect(() => {
        //setUserAuthorized(document.cookie.indexOf('accessToken') >= 0)
        if (document.cookie.indexOf('accessToken') >= 0) navigate("/");
   //     if (!userData.requestChangePassword)
     //       navigate('/');
    }, []);


    return (


        (


            (

                <form onSubmit={createMyNewPassword}>
                    <div className={styles.container}>


                        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>

                        <div className="mb-6">
                            <PasswordInput
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
                            <Button type="primary" size="small" htmlType="submit" >
                                <p className="text text_type_main-default">Сохранить</p>
                            </Button>
                        </div>
                        <div >
                            <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                                <Link to="/register" className="text text_type_main-default pl-2">Войти</Link>
                            </span>
                        </div>
                    </div>
                </form>
            )));

}