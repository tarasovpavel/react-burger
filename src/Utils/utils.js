import { dataPath, orderNumberPath, BASE_URL } from "../constant";



class Utils {
  constructor(dataURL, orderNumberURL) {
    this._dataURL = dataURL;
    this._orderNumberURL = orderNumberURL;
  }




  deleteCookie(name) {
    document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`;
  }

  setCookie(name, value, props) {
    props = {
      path: '/',  //задаем корневой адрес для cookies
      ...props
    };
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





  checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  };

  // создаем функцию проверки на `success`
  checkSuccess = (res) => {
    if (res && res.success) {
      return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
  };









}




const utils = new Utils(`${BASE_URL}${dataPath}`, `${BASE_URL}${orderNumberPath}`);
export default utils;

