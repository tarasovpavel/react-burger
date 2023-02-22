
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { useDispatch } from 'react-redux';
import { passwordReset } from '../../services/actions/redux-functions';


export default function ForgotPasswordPage() {

    const [eMailValue, setEmailValue] = useState("");

    function onEMailChange(e) {
        setEmailValue(e.target.value);
    };

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const recreatePassword = (e) => {
        //console.log('recreatePassword');
        e.preventDefault();
        if (eMailValue.length > 0) {
            dispatch(passwordReset(eMailValue));
            navigate('/reset-password');
        }
    }





    return (

        (


            <form onSubmit={recreatePassword}>
                < div className={styles.container} >
                    <h1 className="text text_type_main-medium mb-6"> Восстановление пароля </h1>
                    <div className="mb-6">
                        <Input
                            type={'email'}
                            placeholder={'Введите e-mails'}
                            onChange={onEMailChange}
                            errorText={"Ошибка ввода"}
                            value={eMailValue}
                        />

                    </div>

                    <Button type="primary" size="large" htmlType="submit" >Восстановить</Button>



                    <p className="text text_type_main-default text_color_inactive mt-20">{'Вспомнили пароль?  '}
                        <Link to="/login" >Войти</Link>
                    </p>
                </div>
            </form>
        )
    )
};

