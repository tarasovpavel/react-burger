import { IburgerIngredientsState, IIngredient, IUserState, TIngredient } from "../types/types";

export const mockIngredientFirst: IIngredient = {
   
      _id:"60d3b41abdacab0026a733cb",
      name:"Биокотлета из марсианской Магнолии",
      type:"main",
      proteins:420,
      fat:142,
      carbohydrates:242,
      calories:4242,
      price:424,
      image:"https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile:"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/meat-01-large.png",
      uuid:"a4694a4b-a3a6-4af1-a921-f0c340f2d812",
      uniqId: "a4694a4b-a3a6-4af1-a921-f0c340f2d812",
      counter: 0,
      sortedId: "a4694a4b-a3a6-4af1-a921-f0c340f2d812",
     
 };
 
 export const mockIngredientSecond: IIngredient = {
   
   _id:"60666c42cc7b410027a1a9b3",
   name:"Филе Люминесцентного тетраодонтимформа",
   type:"main",
   proteins:44,
   fat:26,
   carbohydrates:85,
   calories:643,
   price:988,
   image:"https://code.s3.yandex.net/react/code/meat-03.png",
   image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
   image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
   uuid:"a4694a4b-a3a6-4af1-a921-f0c340f2d812",
   uniqId: "a4694a4b-a3a6-4af1-a921-f0c340f2d813",
   counter: 0,
   sortedId: "a4694a4b-a3a6-4af1-a921-f0c340f2d813",
 }

 export const mockChangeBun: string = "60666c42cc7b410027a1a9b2";


 export const mockIngredientForIngredientReducerFirst: IIngredient = {
  _id:"60d3b41abdacab0026a733c8",
  name:"Филе Люминесцентного тетраодонтимформа",
  type:"main",
  proteins:44,
  fat:26,
  carbohydrates:85,
  calories:643,
  price:988,
  image:"https://code.s3.yandex.net/react/code/meat-03.png",
  image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
  uuid:"a4694a4b-a3a6-4af1-a921-f0c340f2d812",
  uniqId: "a4694a4b-a3a6-4af1-a921-f0c340f2d813",
  counter: 1,
  sortedId: "a4694a4b-a3a6-4af1-a921-f0c340f2d813",
};

export const mockIngredientForIngredientReducerSecond: IIngredient = {
  _id:"60d3b41abdacab0026a733c9",
  name:"Мясо бессмертных моллюсков Protostomia",
  type:"main",
  proteins:433,
  fat:244,
  carbohydrates:33,
  calories:420,
  price:1337,
  image:"https://code.s3.yandex.net/react/code/meat-02.png",
  image_mobile:"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/meat-02-large.png",
  uuid:"a4694a4b-a3a6-4af1-a921-f0c340f2d812",
  uniqId: "a4694a4b-a3a6-4af1-a921-f0c340f2d812",
  counter: 0,
  sortedId: "a4694a4b-a3a6-4af1-a921-f0c340f2d812",
};
 
 export const mockIngredientsList: IIngredient[] = [mockIngredientForIngredientReducerFirst, mockIngredientForIngredientReducerSecond];


 export const mockBunFirst: IIngredient = {
  _id:"60d3b41abdacab0026a733c6",
  name:"Краторная булка N-200i",
  type:"bun",
  proteins:80,
  fat:24,
  carbohydrates:53,
  calories:420,
  price:1255,
  image:"https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
  uuid:"a4694a4b-a3a6-4af1-a921-f0c340f2d812",
  uniqId: "a4694a4b-a3a6-4af1-a921-f0c340f2d812",
  counter: 0,
  sortedId: "a4694a4b-a3a6-4af1-a921-f0c340f2d812",
 }

 export const mockBunSecond: IIngredient = {
  _id:"60d3b41abdacab0026a733c7",
  name:"Флюоресцентная булка R2-D3",
  type:"bun",
  proteins:44,
  fat:26,
  carbohydrates:85,
  calories:643,
  price:988,
  image:"https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile:"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/bun-01-large.png",
  uuid:"a4694a4b-a3a6-4af1-a921-f0c340f2d813",
  uniqId: "a4694a4b-a3a6-4af1-a921-f0c340f2d813",
  counter: 0,
  sortedId: "a4694a4b-a3a6-4af1-a921-f0c340f2d813",
 }


 export const userData: IUserState = {
  userData: {
      userName: "IVAN",
      password: "12345678",
      email: "IVAN@yandex.ru",
      newPassword: null,
      condition: null, // состояние- берем из значений экшонов
      
      auth_checked: false,
      message: null,
  },
  userName: "IVAN",
  email:"IVAN@yandex.ru",
  condition: '',
  password: '',
  message: 'ПРИВЕТ',
}

export const mockWSOrder = {
  _id:"60666c42cc7b410027a1a9b8s",
  ingredients: [
    "60666c42cc7b410027a1a9be",
    "60666c42cc7b410027a1a9bb",
    "60666c42cc7b410027a1a9bd",
    "60666c42cc7b410027a1a9bd"
  ],
  status:"done",
  name:"Антарианские Хрустящие минеральные кольца",
  createdAt:"2023-04-20T03:45:44.667Z",
  updatedAt:"2023-04-20T03:45:44.888Z",
  number:14,
};

export const mockWSOrdersPayloadResponse = {
  orders: [mockWSOrder],
  total: 123456,
  totalToday: 123,
}; 

