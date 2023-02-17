import React, {useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import utils from '../../Utils/utils';

function ProfilePage() {
  const dispatch = useDispatch();
 
 

  let userData = useSelector((store) => store.userData);

 

  const [userDataChanged, setUserDataChanged] = React.useState(false);

  const onNameChange = e => {
    setName(e.target.value);
    setUserDataChanged(true);
  }

  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
    setUserDataChanged(true);
  }

  const onEMailChange = e => {
    setEMailValue(e.target.value);
    setUserDataChanged(true);
  }
  const navigate = useNavigate();
  function onLogout(e) {
    e.preventDefault();
    dispatch(utils.logOut());
    navigate('/');
  }

  function onReset() {
    //dispatch(utils.logout());
    //console.log(userData);
    setName(userData.userName);
    setPasswordValue(userData.password);
    setEMailValue(userData.email);

    //console.log(userData);
    document.getElementById('name').value = (userData.userName !== undefined) ? userData.userName : '';
    document.getElementById('email').value = userData.email;
    document.getElementById('password').value = null;
    setUserDataChanged(false);
  }

  const onSave = (e) => {
    //сохраняем данные на сервер Сохраняем данные  в стор
   // console.log('onSave');
    
    dispatch(utils.updateUserData(eMailValue, nameValue, passwordValue));
    setUserDataChanged(false);
  }

  const onButtonClick = (e) =>{
    e.preventDefault();
    e.nativeEvent.submitter.name==="Reset"? onReset() : onSave();
  }


  useEffect(() => {
    // Отправляем экшен-функцию
    
    dispatch(utils.getRequestUserData());
   // console.log(userData);
   // console.log(userData.userName);
    document.getElementById('name').value = (userData.userName !== undefined) ? userData.userName : '';
    document.getElementById('email').value = userData.email;
    
  }, [])


  const [nameValue, setName] = React.useState(userData.userName);
  const [passwordValue, setPasswordValue] = React.useState(userData.password);
  const [eMailValue, setEMailValue] = React.useState(userData.email);


  return (
    <form onSubmit={onButtonClick}>
      < div className={styles.container} >

        < div className={styles.container_div_left} >
          <nav>
            <ul className={`text text_type_main-medium text_color_inactive `} >
              <li className={`mb-10` } style={{"list-style":"none"}}>
                <NavLink
                  className={`text text_type_main-medium text_color_inactive mb-6 ${styles.link}`}
                  to={'/profile'}
                >Профиль
                </NavLink>
              </li>
              <li className={`mb-10 `}  style={{"list-style":"none"}}>
                <NavLink
                  className={`text text_type_main-medium text_color_inactive mb-6 ${styles.link}`}

                  to={'/profile/orders'}
                >История заказов
                </NavLink>
              </li>
              <li className={`mb-10 `}  style={{"list-style":"none"}}>
                <NavLink
                  className={`text text_type_main-medium text_color_inactive ${styles.link}`}
                  to={'/'} onClick={onLogout}
                >Выход
                </NavLink>
              </li>

            </ul>
          </nav>

          <div className={"mb-10"}>
            <p className={`text_type_main-default text_color_inactive`}>
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
        </div>
        < div className={styles.container_div_right} >

          <div className="mb-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              onChange={onNameChange}
              icon={'EditIcon'} 
              value={nameValue ? nameValue : ''}
              id={"name"}
            />
          </div>
          <div className="mb-6">
            <Input
              type={"email"}
              placeholder={"E-mail"}
              name={"email"}
              onChange={onEMailChange}
              icon={'EditIcon'} 
              value={eMailValue ? eMailValue : ''}
              id={"email"}
            />

          </div>
          <div className="mb-10">
            <PasswordInput
              onChange={onPasswordChange}
              type={"password"}
              name={'passwordValue'}
              extraClass="mb-4"
              icon={'EditIcon'} 
              value={passwordValue}
              id={"password"}
            />
          </div>
          {
            (userDataChanged) && (
              <div className={`mb-10 ${styles.buttons}  `}  >
                <Button name="Reset" htmltype="submit" type="secondary" size="medium" >
                  Отменить
                </Button>
                <p></p>
                <Button name="Save" htmltype="submit" type="primary" size="medium" style={{ float: "right" }} >
                  Сохранить
                </Button>
              </div>)
          }

        </div>

      </div>
    </form>
  )
}

export default ProfilePage;