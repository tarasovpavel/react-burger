

import { IUserState } from "../../types/types";
import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_UPDATE_DATA_SUCCESS,
    USER_UPDATE_DATA_ERROR,
    PASSWORD_REFRESH_SUCCESS,
    PASSWORD_REFRESH_ERROR,
    PASSWORD_NEW_SUCCESS,
    PASSWORD_NEW_ERROR,
    TOKEN_REFRESH_SUCCESS,
    TOKEN_REFRESH_ERROR,
    USER_EXIT_SUCCESS,
    USER_EXIT_ERROR, AUTH_CHECKED, TUserRegisterActions
} from "../actions/user-data";



const userInitialState: IUserState = {
    userData: {
        userName: null,
        password: null,
        email: null,
        newPassword: null,
        condition: null, // состояние- берем из значений экшонов
        
        auth_checked: false,
        message: null,
        //accessToken:null,
        //refreshToken:null,
    },
    userName: '',
    email: '',
    condition: '',
    password: '',
    message: '',
}





export const userInitialReducer = (state = userInitialState, action: TUserRegisterActions) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS: {
            return {
                ...state,
                condition: 'USER_REGISTER_SUCCESS',
               
                userName: action.userName,
                
                email: action.email,
                
            }
        }
        case USER_REGISTER_ERROR: {
            return {
                ...state,
                condition: 'USER_REGISTER_ERROR',
                
                userName: null,
              
                email: null,
            }
        }

        case USER_LOGIN_SUCCESS: {
         
            return {
                ...state,
                condition: 'USER_LOGIN_SUCCESS',
           
                email: action.email,
                userName: action.userName,
                auth_checked: true,
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
                userName: action.userName,
                condition: 'USER_UPDATE_DATA_SUCCESS',
                auth_checked: true,
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
                
                condition: 'PASSWORD_REFRESH_SUCCESS',
               
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
              
                condition: 'PASSWORD_NEW_SUCCESS',
                
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
                ...state,
                auth_checked: false,
            }
        }
        case USER_EXIT_ERROR: {
            return {
                ...state,
                condition: 'USER_EXIT_ERROR',
            }
        }
        case AUTH_CHECKED: {
            return {
                ...state,
                auth_checked: true,

            }

        }
        default:
            return state;
    }
}
