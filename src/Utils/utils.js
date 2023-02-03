import { dataPath, orderNumberPath } from "../constant";

class Utils {
  constructor(dataURL, orderNumberURL) {
    this._dataURL = dataURL;
    this._orderNumberURL = orderNumberURL;
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
    
    return fetch(this._orderNumberURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({ingredients:dataIngredient})}
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

