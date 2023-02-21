import { dataPath, orderNumberPath } from "../constant";
import { ORDERDETAILS_SUCCESS, ORDERDETAILS_ERROR } from '../services/actions/orderDetailsActions';


class Utils {
  constructor(dataURL, orderNumberURL) {
    this._dataURL = dataURL;
    this._orderNumberURL = orderNumberURL;
  }




  deleteCookie(name) {
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


  getOrderNumberPost(dataIngredient) {
    return function (dispatch) {

      //     dispatch({
      //       type: ORDERDETAILS_QUERY,
      //    });
      utils.getOrderNumberRequest({ dataIngredient })
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

  getIngredients() {
    //console.log(this._dataURL);
    return fetch(this._dataURL)
      .then(this._handleResponse)
      .catch(console.log);
  }


  getOrderNumberRequest(dataIngredient) {
    // console.log('getOrderNumberRequest');
    // console.log(dataIngredient);
    return fetch(this._orderNumberURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: dataIngredient.dataIngredient })
    }
    )
      .then((this._handleResponse))
      .catch(error => {
        console.log(error);
      });
  }



}




const utils = new Utils(dataPath, orderNumberPath);
export default utils;

