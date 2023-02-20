import {
  password_ResetPath, password_Reset_Reset_Path, user_RegisterPath,
  user_LogoutPath, user_LoginPath, user_TokenPath, user_DataPath
} from "../../constant";
import { ORDERDETAILS_SUCCESS, ORDERDETAILS_ERROR } from './orderDetailsActions';
import { INGREDIENTDETAILS_QUERY } from './ingredientDetailsActions';
import {
  PASSWORD_REFRESH_SUCCESS, PASSWORD_REFRESH_ERROR,
  PASSWORD_NEW_SUCCESS, PASSWORD_NEW_ERROR, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR,
  USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR, USER_EXIT_SUCCESS, USER_EXIT_ERROR,
  USER_UPDATE_DATA_SUCCESS, USER_UPDATE_DATA_ERROR
} from './userData';
import { BURGER_INGREDIENTS_ERROR, BURGER_INGREDIENTS_SUCCESS } from "./burgerIngredientsActions";
import { BURGER_CONSTRUCTOR_CLEAR } from "./burgerConstructorActions";
import utils from '../../Utils/utils';


function _handleResponse(response) {
  console.log(response);
  return response.ok ?
    response.json() :
    Promise.reject("Error!!!");

}


export function passwordReset(email) {

  return async (dispatch) => {
    const jsonBodyRequest = { email };

    try {
      const answer = await fetch(password_ResetPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBodyRequest)
      })
      const result = await _handleResponse(answer);

      {
        dispatch({
          type: PASSWORD_REFRESH_SUCCESS,
          message: result.message
        });
      }

    }
    catch (err) {
      dispatch({
        type: PASSWORD_REFRESH_ERROR
      });
    }


  }
};


export function createNewPassword(password, token) {
  return async (dispatch) => {
    const jsonBodyRequest = { password, token };

    try {
      const answer = await fetch(password_Reset_Reset_Path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBodyRequest)
      })
      const result = await _handleResponse(answer);

      {
        if (result.success === true) {
          dispatch({
            type: PASSWORD_NEW_SUCCESS,
            message: result.message
          });
        }
        else {
          dispatch({
            type: PASSWORD_NEW_ERROR
          });
        }
      }

    }
    catch (err) {
      dispatch({
        type: PASSWORD_NEW_ERROR
      });
    }
  }
};

export const registerUser = (email, password, name) => {
  return async (dispatch) => {
    const jsonBodyRequest = { email, password, name };
    // console.log(jsonBodyRequest);
    // console.log(user_RegisterPath);
    try {
      const answer = await fetch(user_RegisterPath, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBodyRequest)
      })
      const result = await _handleResponse(answer);

      {
        if (result.success === true) {
          dispatch({
            type: USER_REGISTER_SUCCESS,
            userName: result.name,
            password: result.password,
            email: result.email,
          });

          localStorage.setItem('refreshToken', result.refreshToken);
          utils.setCookie('accessToken', result.accessToken.split('Bearer ')[1]);

          console.log(USER_REGISTER_SUCCESS);
        }
        else {
          dispatch({
            type: USER_REGISTER_ERROR
          });
        }
      }


    }
    catch (err) {
      dispatch({
        type: USER_REGISTER_ERROR
      });
      console.log(err);
    }
  }
};


export const authorization = (email, password) => {
  return async (dispatch) => {
    const jsonBodyRequest = { email, password };
    console.log(jsonBodyRequest);
    try {
      const answer = await fetch(user_LoginPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBodyRequest)
      })
      //.then(_handleResponse(answer))
      //.then((result) => 
      const result = await _handleResponse(answer);
      {
        console.log(result);
        if (result.success === true) {
          dispatch({
            type: USER_LOGIN_SUCCESS,
            //password: result.user.password,
            email: result.user.email,
            userName: result.user.name,
            //accessToken: answer.accessToken,
            //refreshToken: answer.refreshToken,
          });

          localStorage.setItem('refreshToken', result.refreshToken);
          utils.setCookie('accessToken', result.accessToken.split('Bearer ')[1]);



        }
        else {
          dispatch({
            type: USER_LOGIN_ERROR
          });
          console.log('Authorization ERROR');
        }
      }//)
    }
    catch (err) {
      dispatch({
        type: USER_LOGIN_ERROR
      });
      console.log('Authorization ERROR');
      //console.log(err);
    }
  }
};



export const updateToken = () => {
  return async (dispatch) => {
    const jsonBodyRequest = { token: localStorage.getItem('refreshToken') };
    try {
      return async (dispatch) => {
        const answer = await fetch(user_TokenPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonBodyRequest)
        })
        const result = await _handleResponse(answer);

        {
          if (result.success === true) {
            dispatch({
              type: TOKEN_REFRESH_SUCCESS,
              //accessToken: result.accessToken,
            });


            utils.setCookie('accessToken', result.accessToken.split('Bearer ')[1]);
          }
          else {
            dispatch({
              type: TOKEN_REFRESH_ERROR
            });
          }
        }
      }
    }
    catch (err) {
      dispatch({
        type: TOKEN_REFRESH_ERROR
      });
      console.log(err);

    };
  }
}




export const setIngredientData = (item) => {

  return async (dispatch) => {

    dispatch({
      type: INGREDIENTDETAILS_QUERY,
      item: item
    });
  }
}




export const getRequestUserData = () => {
  return async (dispatch) => {

    try {
      //console.log(utils.getCookie('accessToken'));
      let token = utils.getCookie('accessToken');

      //console.log(token);
      {
        const answer = await fetch(user_DataPath, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': 'Bearer ' + token
          },
          //body: JSON.stringify(jsonBodyRequest)
        })
        const result = await _handleResponse(answer);

        {
          if (result.success === true) {
            //  console.log(result);
            dispatch({
              type: USER_UPDATE_DATA_SUCCESS,
              email: result.user.email,
              userName: result.user.name,
            });
          }
        }
      }
    }
    catch {
      dispatch({
        type: USER_UPDATE_DATA_ERROR
      });

    }
  }
}


export const updateUserData = (email, name, password) => {
  return async (dispatch) => {
    let jsonBodyRequest;
    if (password !== undefined) jsonBodyRequest = { email, name, password }
    else jsonBodyRequest = { email, name };
    let token = utils.getCookie('accessToken');

    //console.log(token);
    //console.log(jsonBodyRequest);
    try {
      {
        const answer = await fetch(user_DataPath, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
          },
          body: JSON.stringify(jsonBodyRequest)
        })
        const result = await _handleResponse(answer);

        {
          //  console.log(result);
          if (result.success === true) {
            dispatch({
              type: USER_UPDATE_DATA_SUCCESS,
              email: result.user.email,
              userName: result.user.name
            });
          }
          else {
            dispatch({
              type: USER_UPDATE_DATA_ERROR,
            })
          }
        }
      }
    }
    catch {
      console.log('err');
      dispatch({
        type: USER_UPDATE_DATA_ERROR
      });

    }
  }
}



export function logOut() {
  return async (dispatch) => {
    const jsonBodyRequest = { token: localStorage.getItem('refreshToken') };
    utils.deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    //console.log(localStorage.getItem('refreshToken'));
    try {
      {
        const answer = await fetch(user_LogoutPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonBodyRequest)
        })
        const result = await _handleResponse(answer);

        {
          //console.log(result);
          if (result.success === true) {
            dispatch({
              type: USER_EXIT_SUCCESS,

            });


            utils.deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
          }
          else {
            dispatch({
              type: USER_EXIT_ERROR
            });

            utils.deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
          }
        }
      }
    }
    catch {
      dispatch({
        type: USER_EXIT_ERROR
      });

      utils.deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
}


export function getRecommendedItems() {
  return async (dispatch) => {
    //   dispatch({
    //     type: GET_RECOMMENDED_ITEMS_REQUEST
    //   });
    utils
      .getIngredients()
      .then(({ data }) => {
        if (data) {
          dispatch({
            type: BURGER_INGREDIENTS_SUCCESS,
            items: data.map(item => ({ ...item, counter: 0 })),

          });
          dispatch({
            type: BURGER_CONSTRUCTOR_CLEAR,
          });

        } else {
          dispatch({
            type: BURGER_INGREDIENTS_ERROR
          })
        }

      })
      .catch(err => { console.log(err) })
    //.finally(setIsLoad(true));

  }

};


