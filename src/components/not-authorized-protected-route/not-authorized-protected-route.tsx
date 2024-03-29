
import { Navigate, useLocation } from 'react-router-dom';
import utils from '../../Utils/utils';
import { FC } from 'react';
import { ProtectedRouteProps } from '../../types/types';


const NotAccessProtectedRoute: FC<ProtectedRouteProps> = ({ element, anonymous = false }) => {
  const isLoggedIn = (document.cookie.indexOf('accessToken') >= 0) && (utils.getCookie('accessToken') !== 'undefined');
  // console.log(utils.getCookie('accessToken'));
  const location = useLocation();
  const from = location.state?.from || '/';

  //const refreshToken = (localStorage['refreshToken'] !== undefined);
  //const authChecked = useSelector(store => store.userData.authChecked);

  // console.log('1');

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to={from} state={{ from: location }} />;
  }



  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

export default NotAccessProtectedRoute;

