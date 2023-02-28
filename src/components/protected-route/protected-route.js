import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { updateToken } from "../../services/actions/redux-functions";
import { useDispatch, useSelector } from 'react-redux';
import { getRequestUserData } from '../../services/actions/redux-functions'
import utils from '../../Utils/utils';


export default function ProtectedRoute({ element, anonymous = false }) {
  const authChecked = useSelector(store => store.userData.auth_checked);
  const userData = useSelector(store => store.userData);


  const isLoggedIn = (document.cookie.indexOf('accessToken') >= 0) && (utils.getCookie( 'accessToken')!== 'undefined');
  // console.log(utils.getCookie('accessToken'));
  const location = useLocation();
  const from = location.state?.from || '/';

  const refreshToken = (localStorage['refreshToken'] !== undefined) && (localStorage['refreshToken'] !== '');
  const dispatch = useDispatch();


  if (!(isLoggedIn) && (refreshToken)) {
    console.log('ProtectedRoute');
    dispatch(updateToken());
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

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,

}