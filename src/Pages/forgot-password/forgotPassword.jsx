
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import styles from "./forgotPassword.module.css";
import {useDispatch} from 'react-redux';
import utils from '../../Utils/utils';


export default function ForgotPasswordPage() {

    const [emailValue, setEmailValue] = useState("");

    function onEMailChange(e) {
        setEmailValue(e.target.value);
    };

    const dispatch = useDispatch();


    const recreatePassword = (e) => {
        //console.log('recreatePassword');
        e.preventDefault();
        if (emailValue.length > 0) {
            dispatch(utils.passwordReset(emailValue));
            navigate ('/reset-password');
        }
    }

    

 
    const  navigate= useNavigate();
    const userAuthorized = document.cookie.indexOf('accessToken') >=0;
    
    return (
        console.log('register' || document.cookie.indexOf('accessToken'))&&
      userAuthorized?(
        navigate ('/login')
      )
      :
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
                        value={emailValue}
                     
                     />
                         
                </div>

                <Button htmltype="submit" type="primary" size="large" >Восстановить</Button>



                <p className="text text_type_main-default text_color_inactive mt-20">{'Вспомнили пароль?  '}
                    <Link to="/login" >Войти</Link>
                </p>
            </div>
        </form>
    )
    )
};

