
import { Navigate, useLocation } from 'react-router-dom';
import { updateToken } from "../../services/actions/reduxFunctions";
import { useDispatch } from 'react-redux';



export default function ProtectedRoute({ element, anonymous = false }) {
  const isLoggedIn = document.cookie.indexOf('accessToken') >= 0;
  // console.log(utils.getCookie('accessToken'));
  const location = useLocation();
  const from = location.state?.from || '/';

  const refreshToken = (localStorage['refreshToken'] !== undefined);
  const dispatch = useDispatch();

  if (!isLoggedIn && refreshToken)
    dispatch(updateToken());



  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}
