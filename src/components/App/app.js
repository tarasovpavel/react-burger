import React, { useState, useEffect } from 'react';
import './app';
import styles from './app.module.css';
import BurgerIngredients from '../BurgerIngredients/burgerIngredients';
import BurgerConstructor from '../BurgerConstructor/burgerConstructor';
import AppHeader from '../AppHeader/appHeader';
import { Route, Routes, useLocation } from 'react-router-dom';
//import data1 from  '../../Data/data';




import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoginPage from '../../Pages/login/login';
import RegisterPage from '../../Pages/register/register';
import ForgotPasswordPage from '../../Pages/forgot-password/forgotPassword';
import ResetPasswordPage from '../../Pages/reset-password/resetPassword';
import ProfilePage from '../../Pages/profile/profile';
import ErrorPage from '../../Pages/errorPage/errorPage';
import IngredientPage from '../../Pages/ingredientPage/ingredientPage';
import IngredientDetail from '../IngredientDetail/ingredientDetail';
import ProtectedRoute from '../ProtectedRoute/protectedRoute';
import { INGREDIENTDETAILS_CLOSE } from "../../services/actions/ingredientDetailsActions";
import { Modal } from '../Modal/modal';
import { useNavigate } from "react-router-dom";
import NotFound from '../../Pages/NotFound/notFound';
import { getRecommendedItems } from '../../services/actions/reduxFunctions';

function App() {
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;


  //  const ingredientData = useSelector((store) => store.ingredientDetailData.item);



  //const { data1, loading, error } = useFetch('https://norma.nomoreparties.space/api/ingredients');
  // console.log(data1) ;
  // setData(data1);setIsLoad (true);

  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getRecommendedItems());
    setIsLoad(true);
    // setIsLoad(true);
  }, [dispatch])





  function handleIngredientClose() {
    //setIngredient({});
    dispatch({
      type: INGREDIENTDETAILS_CLOSE,
    });
    navigate(-1);
  }





  return (


    <>


      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" exact={true} element={
          <DndProvider backend={HTML5Backend}>
            {isLoad && (

              < div className={styles.container} >
                <div className={styles.container_div_left}>

                  <BurgerIngredients />

                </div>
                <div className={styles.container_div_left}>

                  <BurgerConstructor />

                </div>

              </div>

            )}
          </DndProvider>
        }>
        </Route>


        <Route path="/login" element={<LoginPage />} />


        {/*<Route path="/register" element={<RegisterPage />} />*/}

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />


        <Route path="/reset-password" element={<ResetPasswordPage />}/>

        <Route path="/ingredients/:id" element={<IngredientPage />}></Route>
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path="/register" element={<ProtectedRoute element={<RegisterPage />} />} />
        <Route path="/error" element={<ErrorPage />}> </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>




      {background &&

        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal header="Внимание!" onClose={handleIngredientClose} >
              <IngredientDetail />
            </Modal>}>
          </Route>
        </Routes>

      }






    </>

  );
}

export default App;
