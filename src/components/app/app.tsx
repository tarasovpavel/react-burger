import  { useState, useEffect, FC } from 'react';
import './app';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppHeader from '../app-header/app-header';
import { Route, Routes, useLocation } from 'react-router-dom';

import { useDispatch } from '../../hooks/hooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoginPage from '../../Pages/login/login';
import RegisterPage from '../../Pages/register/register';
import ForgotPasswordPage from '../../Pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../Pages/reset-password/reset-password';
import ProfilePage from '../../Pages/profile/profile';
import FeedPage from '../../Pages/feed/feed';
import ErrorPage from '../../Pages/error-page/error-page';
import IngredientPage from '../../Pages/ingredient-page/ingredient-page';
import FeedOrderPage from '../../Pages/feed-order-page/feed-order-page';
import OrdersList from '../orders-array/orders-array';
import OrderStats from '../order-stats/order-stats';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import ProtectedRoute from '../protected-route/protected-route';
import NotAccessProtectedRoute from '../not-authorized-protected-route/not-authorized-protected-route';

import { INGREDIENTDETAILS_CLOSE } from "../../services/actions/ingredient-details-actions";
import { Modal } from '../modal/modal';
import { useNavigate } from "react-router-dom";
import { NotFound } from '../../Pages/not-found/not-found';
import { getRecommendedItems, getUserData } from '../../services/actions/redux-functions';
import utils from '../../Utils/utils';

const App: FC = () => {
  const [isLoad, setIsLoad] = useState<boolean | undefined>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;


  

  useEffect(() => {
    // Отправляем экшен-функцию

    dispatch(getRecommendedItems())

    setIsLoad(true);
   
    if ((utils.getCookie('accessToken')) && (utils.getCookie('accessToken') !== 'undefined')) {

      dispatch( getUserData());

    }

  }, [])





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
      <Routes location={background || location} >
        <Route path="/" element={
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



        <Route path="/login" element={<NotAccessProtectedRoute element={<LoginPage />} />} />


        <Route path="/forgot-password" element={<NotAccessProtectedRoute element={<ForgotPasswordPage />} />} />

        <Route path="/reset-password" element={<NotAccessProtectedRoute element={<ResetPasswordPage />} />} />

        <Route path="/ingredients/:id" element={<IngredientPage />}></Route>
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />

        <Route path="/register" element={<NotAccessProtectedRoute element={<RegisterPage />} />} />
        <Route path="/error" element={<ErrorPage />}> </Route>
        

        <Route path="/feed" element={<FeedPage />} />

        <Route path='/feed/:id' element={<FeedOrderPage />} />

        <Route path='/profile/orders/:id' element={<ProtectedRoute element={<FeedOrderPage />} />} />
        <Route path='/profile/orders' element={<ProtectedRoute element={<OrdersList />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>




      {background &&

        <Routes>
          <>
            <Route path="/ingredients/:id" element={
              <Modal onClose={handleIngredientClose} >
                <IngredientDetail />
              </Modal>}>
            </Route>
            <Route path="*" element={<NotFound />} />
            
          </>
        </Routes>

      }
      
      {background &&

        <Routes>
          
          <Route path="/feed/:id" element={
            <Modal onClose={handleIngredientClose}>   
              <FeedOrderPage />
            </Modal>}>
          </Route>
          <Route path="*" element={<NotFound />} />
         
          
        </Routes>

      }
      {background &&

        <Routes>
          
          <Route path="/profile/orders/:id" element= {<ProtectedRoute element={
            <Modal onClose={handleIngredientClose}>
              <FeedOrderPage />
            </Modal>}
            />
          }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>

      }

    </>

  );
}

export default App;
