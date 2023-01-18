import { dataPath } from "../constant";

class Utils {
  constructor(dataURL) {
    this._dataURL = dataURL;
  }

  _handleResponse(response) {
    //console.log(response.json());
    return response.ok ? 
            response.json() : 
            Promise.reject("Error!!!");
    
  }

  getIngredients() {
    
    return fetch(this._dataURL)
        .then(this._handleResponse)
        .catch(console.log);
  }
}




const utils = new Utils(dataPath);
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

