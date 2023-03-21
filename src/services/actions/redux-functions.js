import {
  password_ResetPath, password_Reset_Reset_Path, user_RegisterPath,
  user_LogoutPath, user_LoginPath, user_TokenPath, user_DataPath, BASE_URL
} from "../../constant";
import { ORDERDETAILS_SUCCESS } from './order-details-actions';
import { INGREDIENTDETAILS_QUERY } from './ingredient-details-actions';
import {
  PASSWORD_REFRESH_SUCCESS, PASSWORD_REFRESH_ERROR,
  PASSWORD_NEW_SUCCESS, PASSWORD_NEW_ERROR, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR,
  USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR, USER_EXIT_SUCCESS, USER_EXIT_ERROR,
  USER_UPDATE_DATA_SUCCESS, USER_UPDATE_DATA_ERROR, AUTH_CHECKED
} from './user-data';
import { BURGER_INGREDIENTS_ERROR, BURGER_INGREDIENTS_SUCCESS } from "./burger-ingredients-actions";
import { BURGER_CONSTRUCTOR_CLEAR } from "./burger-constructor-actions";
import utils from '../../Utils/utils';
import { dataPath, orderNumberPath } from "../../constant";



export function passwordReset(email) {

  return async (dispatch) => {
    const jsonBodyRequest = { email };

    try {
      const answer = await request(`${password_ResetPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBodyRequest)
      })


      // console.log(PASSWORD_REFRESH_SUCCESS);
      dispatch({
        type: PASSWORD_REFRESH_SUCCESS,
        message: answer.message
      });


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
      /*const answer = await fetch(`${BASE_URL}${password_Reset_Reset_Path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBodyRequest)
      })*/

      const answer = await request(`${password_Reset_Reset_Path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBodyRequest)
      })


      //const result = await utils.checkResponse(answer);


      if (answer.success === true) {
        dispatch({
          type: PASSWORD_NEW_SUCCESS,
          message: answer.message
        });
      }
      else {
        dispatch({
          type: PASSWORD_NEW_ERROR
        });

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
     console.log(jsonBodyRequest);
    // console.log(user_RegisterPath);
    try {
      const answer = await request(`${user_RegisterPath}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBodyRequest)
      })
      //const result = await utils.checkResponse(answer);


      if (answer.success === true) {
     //   console.log('registerUser SUCCESS');
        dispatch({
          type: USER_REGISTER_SUCCESS,
          userName: answer.name,
          password: answer.password,
          email: answer.email,
        });

        // localStorage.setItem('refreshToken', result.refreshToken);
        // utils.setCookie('accessToken', result.accessToken.split('Bearer ')[1]);

   //     console.log(USER_REGISTER_SUCCESS);
      }
      else {
        dispatch({
          type: USER_REGISTER_ERROR
        });

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
    //   console.log(jsonBodyRequest);
    //console.log('authorization SUCCESS');
    try {
      const answer = await request(`${user_LoginPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBodyRequest)
      })
      //.then(utils._handleResponse(answer))
      //.then((result) => 


   //   console.log(answer);
      if (answer.success === true) {
        localStorage.setItem('refreshToken', answer.refreshToken);
        utils.setCookie('accessToken', answer.accessToken.split('Bearer ')[1]);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          //password: result.user.password,
          email: answer.user.email,
          userName: answer.user.name,
          //accessToken: answer.accessToken,
          //refreshToken: answer.refreshToken,
        });





      }
      else {
        dispatch({
          type: USER_LOGIN_ERROR
        });
        console.log('Authorization ERROR');

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

      const answer = await request(`${user_TokenPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBodyRequest)
      })
      //const result = await utils.checkResponse(answer);


      if (answer.success === true) {
        dispatch({
          type: TOKEN_REFRESH_SUCCESS,
          //accessToken: result.accessToken,
        });


        utils.setCookie('accessToken', answer.accessToken.split('Bearer ')[1]);
      }
      else {
        dispatch({
          type: TOKEN_REFRESH_ERROR
        });
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




export const updateUserData = (email, name, password) => {
  return async (dispatch) => {
    let jsonBodyRequest;
    if (password !== undefined) jsonBodyRequest = { email, name, password }
    else jsonBodyRequest = { email, name };
    let token = utils.getCookie('accessToken');

    //console.log(token);
    //console.log(jsonBodyRequest);
    try {

      const answer = await request(`${user_DataPath}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token
        },
        body: JSON.stringify(jsonBodyRequest)
      })
      //const result = await utils.checkResponse(answer);


      //  console.log(result);
      if (answer.success === true) {
        dispatch({
          type: USER_UPDATE_DATA_SUCCESS,
          email: answer.user.email,
          userName: answer.user.name
        });
      }
      else {
        dispatch({
          type: USER_UPDATE_DATA_ERROR,
        })
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

      const answer = await request(`${user_LogoutPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBodyRequest)
      })
      //const result = await utils.checkResponse(answer);


      //console.log(result);
      if (answer.success === true) {
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
    catch {
      dispatch({
        type: USER_EXIT_ERROR
      });

      utils.deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
}




export const getUserData = () => {
  
  return async (dispatch) => {
    const accessToken =
      utils.getCookie('accessToken');

    {

      const data = await fetchWithRefresh(`${user_DataPath}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer ' + accessToken
        }
      });
      console.log('getUserData');
      //console.log(data);
      //if(!data.success) throw new Error('');
    //  console.log(data);
      dispatch({
        type: USER_UPDATE_DATA_SUCCESS,
        email: data.user.email,
        userName: data.user.name,

      });
    }
  }

};


export const fetchWithRefresh = async (url, options) => {
  try {
    // console.log('fetchWithRefresh');
    return await request(url, options);
    // console.log(res);
    //return await utils.checkResponse(res);
  }
  catch (err) {
    if (err.message === 'jwt expired') {
      const updateData = await updateToken();

      localStorage.setItem('refreshToken', updateData.refreshToken);


      utils.setCookie('accessToken', updateData.accessToken);

      options.headers.Authorization = updateData.accessToken;
      return async (dispatch) => {
        const res = await fetch(url, options)

        dispatch({
          type: AUTH_CHECKED,
        });
        return await utils.checkResponse(res);
      }
    }
    else {
      return Promise.reject(err);
    }
  }
}



export function getOrderNumberPost(dataIngredient) {
  return async (dispatch) => {

    const answer = await request(`${orderNumberPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: dataIngredient })
    })


    dispatch({
      type: ORDERDETAILS_SUCCESS,
      item: answer.order.number,
    });


    return answer;

  }
}


export function getIngredients() {
  //console.log(this._dataURL);
  return request(`${dataPath}`);


}



export function getRecommendedItems() {
  return async (dispatch) => {
    //   dispatch({
    //     type: GET_RECOMMENDED_ITEMS_REQUEST
    //   });

    getIngredients()
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




const request = (endpoint, options) => {

  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(utils.checkResponse)
    .then(utils.checkSuccess);

};

