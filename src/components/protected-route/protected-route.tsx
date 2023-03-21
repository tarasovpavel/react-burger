
import { Navigate, useLocation } from 'react-router-dom';
import { updateToken } from "../../services/actions/redux-functions";
import { useDispatch } from 'react-redux';
import { FC } from 'react';
import utils from '../../Utils/utils';
import { RouteProps } from 'react-router';


type ProtectedRouteProps = {
  element: any;
  anonymous?: boolean;
} & RouteProps;


const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, anonymous = false }) => {



  const isLoggedIn = (document.cookie.indexOf('accessToken') >= 0) && (utils.getCookie('accessToken') !== 'undefined');
  // console.log(utils.getCookie('accessToken'));
  const location = useLocation();
  const from = location.state?.from || '/';

  const refreshToken = (localStorage['refreshToken'] !== undefined) && (localStorage['refreshToken'] !== '');
  const dispatch = useDispatch();


  if (!(isLoggedIn) && (refreshToken)) {
    console.log('ProtectedRoute');
    dispatch<any>(updateToken());
  }


  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }
  //console.log('3');
  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  //console.log('4');


  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

export default ProtectedRoute;

