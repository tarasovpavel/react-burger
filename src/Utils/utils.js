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
   // console.log(response);
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


passwordReset(EMail)
{

  return async (dispatch) => {
    const jsonBodyRequest = { EMail };

   try{
        const answer =await fetch(password_ResetPath, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonBodyRequest)
        })
        .then((this._handleResponse))
        .catch(error => {
            console.log(error);
        });
        //console.log(answer);
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
        .catch(error => {
            console.log(error);
        });
        console.log(answer);
        if (answer.success=== true)
        {
        dispatch({
          type: PASSWORD_NEW_SUCCESS,
          message: answer.message
        });
        }
        else
        {
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

registerUser = (name, email, password) => {
  return async (dispatch) => {
    const jsonBodyRequest = {email, password, name};
    console.log(jsonBodyRequest);
   try{
        const answer =await fetch(user_RegisterPath, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonBodyRequest)
        })
        .then((this._handleResponse))
        .catch(error => {
            console.log(error);
        });
        console.log(answer);
        if (answer.success=== true)
        {
              dispatch({
                type: USER_REGISTER_SUCCESS,
                userName: name,
                password: password,
                email: email,
                accessToken: answer.accessToken,
                refreshToken: answer.refreshToken,
              });

              localStorage.setItem('refreshToken', answer.refreshToken);
              this.setCookie('accessToken', answer.accessToken);    
              
              console.log(USER_REGISTER_SUCCESS);
        }
        else
        {
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


  Authorization = (email, password) => {
    return async (dispatch) => {
      const jsonBodyRequest = {email, password};
      //console.log(jsonBodyRequest);
     try{
          const answer =await fetch(user_LoginPath, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(jsonBodyRequest)
          })
          .then((this._handleResponse));
          
          console.log(answer);
          if (answer.success=== true)
          {
                dispatch({
                  type: USER_LOGIN_SUCCESS,
                  password: password,
                  email: email,
                  accessToken: answer.accessToken,
                  refreshToken: answer.refreshToken,
                });
  
                localStorage.setItem('refreshToken', answer.refreshToken);
                this.setCookie('accessToken', answer.accessToken);    
                
               // console.log(localStorage.getItem('refreshToken'));
                
          }
          else
          {
            dispatch({
              type: USER_LOGIN_ERROR
          });
          }
      }
      catch (err) {
        dispatch({
            type: USER_LOGIN_ERROR
        });
        console.log(err);
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
          .then((this._handleResponse));

          if (answer.success=== true)
          {
            dispatch({
              type: TOKEN_REFRESH_SUCCESS,
              accessToken: answer.accessToken,
            });

            localStorage.setItem('refreshToken', answer.refreshToken);
            this.setCookie('accessToken', answer.accessToken); 
          }
        }
      }
      catch (err){
        dispatch({
          type: TOKEN_REFRESH_ERROR
      });

      };
    }
}


logOut = () => {
  return async (dispatch) => {
  const jsonBodyRequest = {token: localStorage.getItem('refreshToken')};
  try{
        return async (dispatch) => {
          const answer = fetch(user_LogoutPath, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'},
              body: JSON.stringify(jsonBodyRequest)
          })
          .then((this._handleResponse));

          if (answer.success=== true)
          {
            dispatch({
              type: USER_EXIT_SUCCESS,
              
            });

            localStorage.setItem('refreshToken', '');
            this.setCookie('accessToken', ''); 
          }
        }
      }
      catch{
        dispatch({
          type: USER_EXIT_ERROR
      });

      }
    }
}


setIngredientData = (item) => {
  {
        return async (dispatch) => {
          
    dispatch({
      type: INGREDIENTDETAILS_QUERY,
      item: item
    });
          }}}




getrequestUserData = () => {
  return async (dispatch) => {
 
  try{
        return async (dispatch) => {
          const answer = await fetch(user_DataPath, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': this.getCookie('accessToken')}, 
              //body: JSON.stringify(jsonBodyRequest)
          })
          .then((this._handleResponse));

          if (answer.success=== true)
          {
            dispatch({
              type: USER_UPDATE_DATA_SUCCESS,
              email: answer.user.email,
              login: answer.user.name,
            });
          }
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
  const jsonBodyRequest = {email, name, password};
  //console.log(jsonBodyRequest);
  try{
        return async (dispatch) => {
          const answer = fetch(user_DataPath, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',  
                Authorization: this.getCookie('accessToken')
                  }, 
              body: JSON.stringify(jsonBodyRequest)
          })
          .then((this._handleResponse))
          
          console.log(answer);
          if (answer.success=== true)
          {
            dispatch({
              type: USER_UPDATE_DATA_SUCCESS,
              email: answer.user.email,
              login: answer.user.name
            });
          }
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

