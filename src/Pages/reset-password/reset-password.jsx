import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../reset-password/reset-password.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { createNewPassword } from '../../services/actions/redux-functions';

export default function ResetPasswordPage() {
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');

    const dispatch = useDispatch();
    const location = useLocation();



    const navigate = useNavigate();

    //const userData = useSelector((store) => store.userData);
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

        //    if (userData)
        //    {
        //        (location.state && location.state.previousLocation) ? navigate(location.state.previousLocation.pathname) : navigate('/');
        //    }
        //    else
        !location?.state?.resetPassword && navigate('/forgot-password')
    }, [location.state, navigate]);



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
                                <Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
                            </span>
                        </div>
                    </div>
                </form>
            )));

}