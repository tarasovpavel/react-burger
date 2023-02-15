import React, {useState, useRef} from "react";
import { Button, Input, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation , useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styles from "./register.module.css";
import utils from '../../Utils/utils';

function RegisterPage() {
  const dispatch = useDispatch();


  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const onButtonClick = (e) => {
    //console.log('register');
   
    if ((userName.length > 0) && (email.length > 0) && (password.length > 0))
    {
      e.preventDefault();
      dispatch(utils.registerUser(userName, email, password));
    }
  }

 const  navigate= useNavigate();
const userAuthorized = document.cookie.indexOf('accessToken') >=0;

return (

  userAuthorized?(
    navigate (-1)
  )
  :
  (


    
  <>
    < div className={styles.container} >
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <div className="mb-6">
        <Input type={'text'}
          placeholder={'Имя пользователя'}
          onChange={e => setUserName(e.target.value)}
          value={userName}
          name={'userName'}
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
        <Button htmlType="button" type="primary" size="medium" onClick={onButtonClick}>
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
  </>
  )
  )
}

export default RegisterPage;