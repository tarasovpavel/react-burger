import { dataPath, orderNumberPath, password_ResetPath, password_Reset_Reset_Path, user_RegisterPath, 
      user_LogoutPath, user_LoginPath, user_TokenPath, user_DataPath } from "../constant";
import { ORDERDETAILS_SUCCESS, ORDERDETAILS_ERROR} from '../services/actions/orderDetailsActions';
import {INGREDIENTDETAILS_QUERY} from '../services/actions/ingredientDetailsActions';
import {PASSWORD_REFRESH_SUCCESS, PASSWORD_REFRESH_ERROR,
  PASSWORD_NEW_SUCCESS, PASSWORD_NEW_ERROR, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR,
  USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_ERROR, USER_EXIT_SUCCESS, USER_EXIT_ERROR,
  USER_UPDATE_DATA_SUCCESS, USER_UPDATE_DATA_ERROR} from '../services/actions/userData';


class Utils {
  constructor(dataURL, orderNumberURL) {
    this._dataURL = dataURL;
    this._orderNumberURL = orderNumberURL;
  }

  


  deleteCookie (name) {
    document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`;
  }

  setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  } 

  getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  } 



  _handleResponse(response) {
    console.log(response);
    return response.ok ? 
            response.json() : 
            Promise.reject("Error!!!");
    
  }

  getIngredients() {
    //console.log(this._dataURL);
    return fetch(this._dataURL)
        .then(this._handleResponse)
        .catch(console.log);
  }

 
  getOrderNumberPost(dataIngredient) {
    return function (dispatch) {
      
 //     dispatch({
 //       type: ORDERDETAILS_QUERY,
  //    });
      utils.getOrderNumberRequest({dataIngredient})
      .then((res) => {
        dispatch({
          type: ORDERDETAILS_SUCCESS,
          item: res.order.number,
        });
        
      })
      .catch(() => {
        dispatch({
          type: ORDERDETAILS_ERROR,
        })
      })


  }  
}


getOrderNumberRequest (dataIngredient)
{
 // console.log('getOrderNumberRequest');
 // console.log(dataIngredient);
return fetch(this._orderNumberURL, {
  method: 'POST',
  headers: {'Content-Type': 'application/json' },
  body: JSON.stringify({ingredients:dataIngredient.dataIngredient})}
  )
  .then((this._handleResponse))
  .catch(error => {
      console.log(error);
  });
}


passwordReset(email)
{

  return async (dispatch) => {
    const jsonBodyRequest = { email };

   try{
        const answer =await fetch(password_ResetPath, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonBodyRequest)
        })
        .then((this._handleResponse))
        .then((result) => 
        {
          dispatch({
            type: PASSWORD_REFRESH_SUCCESS,
            message: result.message
          });
        })
        .catch(error => {
            console.log(error);
        });
    }
    catch (err) {
      dispatch({
          type: PASSWORD_REFRESH_ERROR
      });
  }


    }  
};


createNewPassword(password, token)
  {
  return async (dispatch) => {
    const jsonBodyRequest = {password, token};

   try{
        const answer =await fetch(password_Reset_Reset_Path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonBodyRequest)
        })
        .then((this._handleResponse))
        .then((result) => 
        {
          if (result.success=== true)
          {
          dispatch({
            type: PASSWORD_NEW_SUCCESS,
            message: result.message
          });
          }
          else
          {
            dispatch({
              type: PASSWORD_NEW_ERROR
          });
          }          
        })
        .catch(error => {
            console.log(error);
        });
    }
    catch (err) {
      dispatch({
          type: PASSWORD_NEW_ERROR
      });
  }
    }  
  };

registerUser = (email, password, name) => {
  return async (dispatch) => {
    const jsonBodyRequest = {email, password, name};
   // console.log(jsonBodyRequest);
   // console.log(user_RegisterPath);
   try{       const answer = fetch(user_RegisterPath, {
            method: 'POST',
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json' },
            body: JSON.stringify(jsonBodyRequest)
        })
        .then((this._handleResponse))
        .then((result) => 
        {
          if (result.success=== true)
          {
                dispatch({
                  type: USER_REGISTER_SUCCESS,
                  userName: result.name,
                  password: result.password,
                  email: result.email,
                });
  
                localStorage.setItem('refreshToken', result.refreshToken);
                this.setCookie('accessToken', result.accessToken.split('Bearer ')[1]);    
                
              //  console.log(USER_REGISTER_SUCCESS);
          }
          else
          {
            dispatch({
              type: USER_REGISTER_ERROR
          });
          }
        }       )
        .catch(error => {
            console.log(error);
        });
        
    }
    catch (err) {
      dispatch({
          type: USER_REGISTER_ERROR
      });
      console.log(err);
  }
    }  
  };


  Authorization = (email, password) => {
    return async (dispatch) => {
      const jsonBodyRequest = {email, password};
      //console.log(jsonBodyRequest);
     try{
          const answer = fetch(user_LoginPath, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(jsonBodyRequest)
          })
          .then((this._handleResponse))
          .then((result) => 
          {
            if (result.success=== true)
            {
                  dispatch({
                    type: USER_LOGIN_SUCCESS,
                    //password: result.user.password,
                    email: result.user.email,
                    userName: result.user.name,
                    //accessToken: answer.accessToken,
                    //refreshToken: answer.refreshToken,
                  });
    
                  localStorage.setItem('refreshToken', result.refreshToken);
                  this.setCookie('accessToken', result.accessToken.split('Bearer ')[1]);     
                  
                // console.log(localStorage.getItem('refreshToken'));
                  
            }
            else
            {
              dispatch({
                type: USER_LOGIN_ERROR
            });
            console.log('Authorization ERROR');
            }
          })
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



updateToken = () => {
  return async (dispatch) => {
  const jsonBodyRequest = {token: localStorage.getItem('refreshToken')};
  try{
        return async (dispatch) => {
          const answer = await fetch(user_TokenPath, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'},
              body: JSON.stringify(jsonBodyRequest)
          })
          .then((this._handleResponse))
          .then((result) => 
          {
              if (result.success=== true)
              {
                dispatch({
                  type: TOKEN_REFRESH_SUCCESS,
                  //accessToken: result.accessToken,
                });

                
                this.setCookie('accessToken', result.accessToken.split('Bearer ')[1]);    
              }
              else
              {
                dispatch({
                  type: TOKEN_REFRESH_ERROR
              });
              }
          })
        }
      }
      catch (err){
        dispatch({
          type: TOKEN_REFRESH_ERROR
      });
        console.log(err);

      };
    }
}




setIngredientData = (item) => {
  
        return async (dispatch) => {
          
    dispatch({
      type: INGREDIENTDETAILS_QUERY,
      item: item
    });
          }}




getRequestUserData = () => {
  return async (dispatch) => {
 
  try{
      //console.log(this.getCookie('accessToken'));
      let token = this.getCookie('accessToken');

      //console.log(token);
        {
          const answer = fetch(user_DataPath, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'authorization': 'Bearer ' + token}, 
              //body: JSON.stringify(jsonBodyRequest)
          })
          .then((this._handleResponse))
          .then((result) => 
          {
              if (result.success=== true)
              {
              //  console.log(result);
                dispatch({
                  type: USER_UPDATE_DATA_SUCCESS,
                  email: result.user.email,
                  userName: result.user.name,
                });
              }
           })
        }
      }
      catch{
        dispatch({
          type: USER_UPDATE_DATA_ERROR
      });

      }
    }
}


updateUserData = (email, name, password) => {
  return async (dispatch) => {
  let jsonBodyRequest ;
  if (password !== undefined) jsonBodyRequest = {email, name, password}
  else jsonBodyRequest = {email, name};
  let token = this.getCookie('accessToken');

  console.log(token);
  //console.log(jsonBodyRequest);
  try{
        {
          const answer = fetch(user_DataPath, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',  
                'authorization': 'Bearer ' + token
                  }, 
              body: JSON.stringify(jsonBodyRequest)
          })
          .then((this._handleResponse))
          .then((result) => 
          {
          //  console.log(result);
            if (result.success=== true)
            {
              dispatch({
                type: USER_UPDATE_DATA_SUCCESS,
                email: result.user.email,
                userName: result.user.name
              });
            }
            else
            {
              dispatch({
                type: USER_UPDATE_DATA_ERROR,
              })
            }
          })
        }
      }
      catch{
        console.log('err');
        dispatch({
          type: USER_UPDATE_DATA_ERROR
      });

      }
    }
}



logOut () {
  return async (dispatch) => {
  const jsonBodyRequest = {token: localStorage.getItem('refreshToken')};
  this.deleteCookie('accessToken'); 
  localStorage.removeItem('refreshToken');
  //console.log(localStorage.getItem('refreshToken'));
  try{
         {
          const answer = await fetch(user_LogoutPath, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'},
              body: JSON.stringify(jsonBodyRequest)
          })
          .then((this._handleResponse))
          .then((result) => 
          {
            //console.log(result);
            if (result.success=== true)
            {
              dispatch({
                type: USER_EXIT_SUCCESS,
                
              });

              
              this.deleteCookie('accessToken'); 
              localStorage.removeItem('refreshToken');
            }
            else{
              dispatch({
                type: USER_EXIT_ERROR
              });
              
              this.deleteCookie('accessToken'); 
              localStorage.removeItem('refreshToken');
            }
          })
        }
      }
      catch{
        dispatch({
          type: USER_EXIT_ERROR
      });
      
      this.deleteCookie('accessToken'); 
      localStorage.removeItem('refreshToken');
      }
    }
}



}




const utils = new Utils(dataPath, orderNumberPath);
export default utils;





/*
import { dataPath } from '../constant';

  
 export default function  getIngredients ()  {
    
    fetch(dataPath)
    .then(response => response.json())
    .then(result => {  return result.data})

    .catch(e => {
      console.log(e);
      return null;
    });
    
  };
*/

