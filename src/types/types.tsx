import { RouteProps } from 'react-router';
import {  ReactNode } from "react";
import {  TBurgerIngredientsActions } from "../services/actions/burger-constructor-actions";
  import {  TIngredientsActions } from "../services/actions/burger-ingredients-actions";
    import {  TIngredientDetailsActions } from "../services/actions/ingredient-details-actions";
      import {  TOrderDetailsActions } from "../services/actions/order-details-actions";
        import {  TUserRegisterActions} from "../services/actions/user-data";
import { TWSOrdersActions } from '../services/actions/websocket';

export type ConstructorCardProps = {
    item: IIngredient,
    type: string,
    index?: number,
  }
  
 export type RectResult = {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  } | null;
  
  export type EmptyConstructorCardProps = {
    text: string,
  }

  export type IngredientCardProps = {
    item: IIngredient,
    type: string,
  }
  
  export type ModalRouteProps = {
    onClose: () => void,
    children: ReactNode,
  } & RouteProps;
  
  
export type ModalOverlayProps = {
    onClose: () => void,
    children: ReactNode,
  }
  

  
export type ProtectedRouteProps = {
    element: any;
    anonymous?: boolean;
  } & RouteProps;
  
 export  interface IburgerIngredientsState {
    items: IIngredient[],
    bun: string,
    sortedId?: string;
    uuid?: string;
    type?: string,
  }
  
  export  interface IIngredientDetails {
    item: IIngredient | null,
    requestError: boolean,
  
  }
  


 export  interface IIngredientsState {
    items: IIngredient[],
    queryError: boolean,
  
  }
  

  
export interface IIngredient {
    _id: string
    calories: number
    carbohydrates: number
    fat: number
    image: string
    image_large: string
    image_mobile: string
    name: string
    price: number
    proteins: number
    type: string
    uniqId: string
    counter: number
    sortedId: string
    uuid: string
  }
  

  
export interface IProps  {
    path?: string
    expires?: Date | string | number
    [propName: string]: any
  }
  


export type TOrder = {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string,
};

export type TWSOrder = {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string,
};



export type TIngredientItem = {
  _id: string,
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  uniqId: string,
  counter: number,
  sortedId: string,
 
};


export type TWSOrdersResponse = {
  "orders": TWSOrder[],
  "total": number;
  "totalToday": number;
}; 


export type TWSActions = {
  wsInit: string,
  wsSendOrder: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string,
}



export type TWebSocketState = {
  wsConnected: boolean,
  total: number,
  totalToday: number,
  orders: TWSOrder[],
   error?: Event,
};



export type TOrderBlockProps = {
  number: number;
  createdAt: string;
  name: string;
  ingredients: string[];
};
export type TDict = {
  [key: string]: string;
};


export type TUserData = {
  userName: string|null;
  password: string|null;
  email: string|null;
  newPassword: string|null;
  condition: string|null;
  requestChangePassword: boolean;
  auth_checked: boolean;
};


export interface IUserState 
{
    userData: TUserData,
    userName: string,
    email: string,
    condition: string,
    password: string,
};


export type TIngredientIconProps = {
  image: string;
};



export type TMap = {
  [key: string]: number;
};

export type TIngredient = {
  ingredientId: string;
  numbers: number;
};


export type TIngredientsLineProps = {
  ingredientId: string;
  ingredients: TIngredientItem[];
  numbers: number;
};




export type TApplicationActions = 
TBurgerIngredientsActions |
TIngredientsActions |
TIngredientDetailsActions |
TOrderDetailsActions |
TUserRegisterActions|
TWSOrdersActions;