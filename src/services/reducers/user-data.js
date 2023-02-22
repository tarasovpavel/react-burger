

import {USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_ERROR,
    USER_UPDATE_DATA_SUCCESS,
    USER_UPDATE_DATA_ERROR,
    PASSWORD_REFRESH_SUCCESS,
    PASSWORD_REFRESH_ERROR,
    PASSWORD_NEW_SUCCESS,
    PASSWORD_NEW_ERROR,
    TOKEN_REFRESH_SUCCESS ,
    TOKEN_REFRESH_ERROR ,
    USER_EXIT_SUCCESS,
    USER_EXIT_ERROR } from "../actions/userData";
  
const userInitialState = { userData: {
        userName: null,
        password: null,
        email: null,
        newPassword: null,
        condition: null, // состояние- берем из значений экшонов
        requestChangePassword: false,  // был запрос на вспоминание пороля
        //accessToken:null,
        //refreshToken:null,
    },
   
}



export const userInitialReducer = (state=userInitialState, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS: {
            return {
                ...state,
                condition: 'USER_REGISTER_SUCCESS',
                //accessToken: action.accessToken,
                userName: action.userName,
                //password: action.userName,
                email: action.email,
            }
        }
        case USER_REGISTER_ERROR: {
            return {
                ...state,
                condition: 'USER_REGISTER_ERROR',
                //accessToken: null,
                userName: null,
                //password: null,
                email: null,
            }
        }

        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                condition: 'USER_LOGIN_SUCCESS',
                //accessToken: action.accessToken,
                //password: action.password,
                email: action.email,
                userName: action.userName,
            }
        }
        case USER_LOGIN_ERROR: {
            return {
                ...state,
                condition: 'USER_LOGIN_ERROR',
            }
        }
        
        
        case USER_UPDATE_DATA_SUCCESS: {
            
            return {
                ...state,
                email: action.email,
                userName:action.userName,
                condition: 'USER_UPDATE_DATA_SUCCESS',
            }
        }
        case USER_UPDATE_DATA_ERROR: {
            return {
                ...state,
                condition: 'USER_UPDATE_DATA_ERROR',
            }
        }
        case PASSWORD_REFRESH_SUCCESS: {
            return {
                ...state,
                //newPassword: action.newPassword, 
                condition: 'PASSWORD_REFRESH_SUCCESS',
                requestChangePassword: true,
            }
        }
        case PASSWORD_REFRESH_ERROR: {
            return {
                ...state,
                condition: 'PASSWORD_REFRESH_ERROR',
            }
        }
        case PASSWORD_NEW_SUCCESS: {
            return {
                ...state,
                //password: action.password, 
                condition: 'PASSWORD_NEW_SUCCESS',
                requestChangePassword: false,
            }
        }
        case PASSWORD_NEW_ERROR: {
            return {
                ...state,
                condition: 'PASSWORD_NEW_ERROR',
            }
        }
        case TOKEN_REFRESH_SUCCESS: {
            return {
                ...state,
                //accessToken: action.accessToken,
                //refreshToken: action.refreshToken,
                condition: 'TOKEN_REFRESH_SUCCESS',
            }
        }
        case TOKEN_REFRESH_ERROR: {
            return {
                ...state,
                condition: 'TOKEN_REFRESH_ERROR',
            }
        }
        case USER_EXIT_SUCCESS: {
            return {
            }
        }
        case USER_EXIT_ERROR: {
            return {
                ...state,
                condition: 'USER_EXIT_ERROR',
            }
        }

        default:
            return state ;
    }
}
