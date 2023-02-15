
import {  Route, Navigate } from 'react-router-dom';



export const ProtectedRoute = ({ element }) => {
    const userAuthorized = document.cookie.indexOf('accessToken') >=0;
    
   // console.log(userAuthorized);

    if (userAuthorized) {
        return (
            (element) 
        )
    } else {
        return (<Navigate to={{ pathname: '/login'}} replace        />)

    }
}
