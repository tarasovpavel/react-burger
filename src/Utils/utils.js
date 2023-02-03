import { dataPath, orderNumberPath } from "../constant";
import {ORDERDETAILS_QUERY, ORDERDETAILS_SUCCESS, ORDERDETAILS_ERROR} from '../services/actions/orderDetailsActions';

class Utils {
  constructor(dataURL, orderNumberURL) {
    this._dataURL = dataURL;
    this._orderNumberURL = orderNumberURL;
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
  console.log('getOrderNumberRequest');
  console.log(dataIngredient);
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

