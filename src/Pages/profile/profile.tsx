import React, { useEffect, FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "../../hooks/hooks";
import styles from "./profile.module.css";
import { updateUserData, logOut } from '../../services/actions/redux-functions';
import { StateType } from 'typesafe-actions';
import rootReducer from "../../services/reducers/reducer";
import { IUserState } from "../../types/types";
export type Store = StateType<typeof rootReducer>;




const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userData = useSelector((store: Store) => store.userData as IUserState);



  const [userDataChanged, setUserDataChanged] = React.useState<boolean | undefined>(false);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value);
    setUserDataChanged(true);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let passwordChange = e.target.value;
    passwordChange = passwordChange === null ? '' : passwordChange;
    setPasswordValue(passwordChange);

    setUserDataChanged(true);
  }

  const onEMailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEMailValue(e.target.value);
    setUserDataChanged(true);
  }


  function onLogout(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(logOut());
    navigate('/');
  }

  function onReset() {
    //dispatch(utils.logout());
    //console.log(userData);
    setName(userData.userName);
    setPasswordValue(userData.password);
    setEMailValue(userData.email);

    //console.log(userData);
    const nameHTMLInputElement = document.getElementById('name') as HTMLInputElement;
    nameHTMLInputElement.value = (userData.userName === null) ? '' : userData.userName;

    const emailHTMLInputElement = document.getElementById('email') as HTMLInputElement;
    emailHTMLInputElement.value = userData.email === null ? '' : userData.email;

    const passwordHTMLInputElement = document.getElementById('password') as HTMLInputElement;
    passwordHTMLInputElement.value = '';
    setUserDataChanged(false);
  }

  const onSave = () => {
    //сохраняем данные на сервер Сохраняем данные  в стор
    // console.log('onSave');

    dispatch(updateUserData(eMailValue as string, nameValue as string, passwordValue as string));
    setUserDataChanged(false);
  }

  const onButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;

    //e.nativeEvent.submitter.name === "Reset" ? onReset() : onSave();
    target.name === "Reset" ? onReset() : onSave();
  }


  useEffect(() => {

    //e.preventDefault();
    // console.log('profile');
    //  console.log(userData);
   


    if ((userData !== undefined) && (userData.userName !== null)) {
      //console.log('profile1');
      const nameHTMLInputElement = document.getElementById('name') as HTMLInputElement;
      nameHTMLInputElement.value = (userData.userName === null) ? '' : userData.userName;

      const emailHTMLInputElement = document.getElementById('email') as HTMLInputElement;
      emailHTMLInputElement.value = (userData.email === null) ? '' : userData.email;
    }

  }, [userData]);


  const [nameValue, setName] = React.useState<string | undefined | null>(userData.userName);
  const [passwordValue, setPasswordValue] = React.useState<string | undefined | null>(userData.password);
  const [eMailValue, setEMailValue] = React.useState<string | undefined | null>(userData.email);


  return (
    <form onSubmit={onButtonClick}>
      < div className={styles.container} >

        < div className={styles.container_div_left} >
          <nav>
            <ul className={`text text_type_main-medium text_color_inactive `} >
              <li className={`mb-10 ${styles.liststylenone}`}>
                <NavLink  className={({ isActive }) => 
                            (isActive ? 
                                `text text_type_main-medium text_color_inactive mb-6 ${styles.link_active}` : 
                        `text text_type_main-medium text_color_inactive mb-6 ${styles.link}`)}
                  to={'/profile'}
                >Профиль
                </NavLink>
              </li>
              <li className={`mb-10 ${styles.liststylenone}`}>
                <NavLink
                  className={`text text_type_main-medium text_color_inactive mb-6 ${styles.link}`}

                  to={'/profile/orders'}
                >История заказов
                </NavLink>
              </li>
              <li className={`mb-10 ${styles.liststylenone}`}>
                <NavLink
                  className={`text text_type_main-medium text_color_inactive ${styles.link}`}
                  to={'/'}
                  onClick={onLogout}
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
              value={nameValue ?? ''}
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
              value={eMailValue ?? ''}
              id={"email"}
            />

          </div>
          <div className="mb-10">
            <PasswordInput
              onChange={onPasswordChange}
              //type={"password"}
              name={'passwordValue'}
              extraClass="mb-4"
              icon={'EditIcon'}
              value={passwordValue ?? ''}
              id={"password"}
            />
          </div>
          {
            (userDataChanged) && (
              <div className={`mb-10 ${styles.buttons}  `}  >
                <Button name="Reset" htmlType="submit" type="secondary" size="medium" >
                  Отменить
                </Button>
                <p></p>
                <Button name="Save" htmlType="submit" type="primary" size="medium"  >
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