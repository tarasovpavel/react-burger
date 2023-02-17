
import {   Navigate, useLocation } from 'react-router-dom';
import utils from "../../Utils/utils";

/*
export default function ProtectedRoute ({ element })  {
    const userAuthorized = document.cookie.indexOf('accessToken') >=0;
    
   // console.log(userAuthorized);

    if ((console.log(document.cookie.indexOf('accessToken'))) && (userAuthorized)) {
        return (
            (element) 
        )
    } else {
        return (<Navigate to={{ pathname: '/login'}} replace        />)

    }
}
*/

export default function ProtectedRoute({ element, anonymous = false }) {
    const isLoggedIn = document.cookie.indexOf('accessToken') >=0;
   // console.log(utils.getCookie('accessToken'));
    const location = useLocation();
    const from = location.state?.from || '/';
    
    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && isLoggedIn) {
      // ...то отправляем его на предыдущую страницу
      return <Navigate to={ from } />;
    }
  
    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && !isLoggedIn) {
      // ...то отправляем его на страницу логин
      return <Navigate to="/login" state={{ from: location}}/>;
    }
  
    // Если все ок, то рендерим внутреннее содержимое
    return element;
  }
  