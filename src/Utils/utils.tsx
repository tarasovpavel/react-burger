import {IProps, TMap} from '../types/types';

class Utils {




  deleteCookie(name: string) {
    document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`;
  }

  

  setCookie(name: string, value: string, props: IProps) {
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
    if (exp && exp.toString) {
      props.expires = exp.toString();
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



  getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }





  checkResponse = (res: any) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  };

  // создаем функцию проверки на `success`
  checkSuccess = (res: any) => {
    if (res && res.success) {
      return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
  };



  getTime = (createdTime: string) => {
    const created = new Date(createdTime);
    const time = `${created.getHours()}:${
        created.getMinutes() < 10 ? "0" + created.getMinutes() : created.getMinutes()
    }`;
    const msInMinute = 60 * 1000;
    const msInDay = msInMinute * 60 * 24;
  
    const todayDate = new Date();
    const todayLeft = todayDate.getHours() * msInMinute * 60 + todayDate.getMinutes() * msInMinute;
    const yesterdayLeft = todayLeft + msInDay;
  
    const left = todayDate.getTime() - created.getTime();
  
    const daysBefore = Math.floor((todayDate.getTime() - created.getTime())/msInDay);
    
    const getDayForm = (day: number): string => {
        return day % 10 === 1 ? 'день' :
            day % 10 >= 2 && day % 10 <= 4 && day !== 12 && day !== 13 && day !== 14 ? 
            'дня' : 'дней'; 
    }
  
    const getDay = () => {
        return left < todayLeft ? 'Сегодня' : 
               left < yesterdayLeft ? 'Вчера' : 
               `${daysBefore} ${getDayForm(daysBefore)} назад`;
    }
  
    return `${getDay()}, ${time}`;
  };
  

  getIngredientList = (list: string[]) => {
    const map: TMap = {};
    list.forEach((item: string) => {
        if ((!map[item]) && (map[item] !== null))
              map[item] = 1;
        else
            map[item]++;
    });
    const result = [];
    for(let key in map){result.push({
            ingredientId: key,
            numbers: map[key]
        });
    };
    return result;
}




}





const utils = new Utils();
export default utils;

