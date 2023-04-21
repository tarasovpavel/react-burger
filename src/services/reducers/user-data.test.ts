

import { userData } from "../../Data/test-data";
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
    USER_EXIT_ERROR, AUTH_CHECKED,
} from "../actions/user-data";
import { userInitialReducer } from "./user-data";



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





describe('accessReducer', () => {
    it('Должен вернуть initialState', () => {
      expect(userInitialReducer(undefined, {} as any)).toEqual(userInitialState);
    });

    it('USER_REGISTER_SUCCESS', () => {
        const action = {
          type: USER_REGISTER_SUCCESS,

          userName: userData.userName,
          password: userData.password,
          email: userData.email,  

        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          userName: action.userName,
          
          email: action.email,  
          condition: 'USER_REGISTER_SUCCESS',
        });
      });


      it('USER_REGISTER_ERROR', () => {
        const action = {
          type: USER_REGISTER_ERROR,
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          userName: null,
          
          email: null,  
          condition: 'USER_REGISTER_ERROR',
        });
      });

      it('USER_LOGIN_SUCCESS', () => {
        const action = {
          type: USER_LOGIN_SUCCESS,
          userName: userData.userName,
          email: userData.email,
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          userName: action.userName,
          
          email: action.email,  
          condition: 'USER_LOGIN_SUCCESS',
          auth_checked: true,
        });
      });

      it('USER_LOGIN_ERROR', () => {
        const action = {
          type: USER_LOGIN_ERROR,
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'USER_LOGIN_ERROR',
        });
      });

      it('USER_UPDATE_DATA_SUCCESS', () => {
        const action = {
          type: USER_UPDATE_DATA_SUCCESS,
          email: userData.email,
          userName: userData.userName
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'USER_UPDATE_DATA_SUCCESS',
          email: action.email,
                userName: action.userName,
                auth_checked: true,
        });
      });

      it('USER_UPDATE_DATA_ERROR', () => {
        const action = {
          type: USER_UPDATE_DATA_ERROR,
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'USER_UPDATE_DATA_ERROR',
        });
      });

      it('PASSWORD_REFRESH_SUCCESS', () => {
        const action = {
          type: PASSWORD_REFRESH_SUCCESS,
          message: userData.message
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'PASSWORD_REFRESH_SUCCESS',
        });
      });

      it('PASSWORD_REFRESH_ERROR', () => {
        const action = {
          type: PASSWORD_REFRESH_ERROR,
          message: userData.message
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'PASSWORD_REFRESH_ERROR',
        });
      });

      it('PASSWORD_NEW_SUCCESS', () => {
        const action = {
          type: PASSWORD_NEW_SUCCESS,
          message: userData.message
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'PASSWORD_NEW_SUCCESS',
        });
      });

      it('PASSWORD_NEW_ERROR', () => {
        const action = {
          type: PASSWORD_NEW_ERROR,
          message: userData.message
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'PASSWORD_NEW_ERROR',
        });
      });

      it('TOKEN_REFRESH_SUCCESS', () => {
        const action = {
          type: TOKEN_REFRESH_SUCCESS,
          message: userData.message
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'TOKEN_REFRESH_SUCCESS',
        });
      });

      it('TOKEN_REFRESH_ERROR', () => {
        const action = {
          type: TOKEN_REFRESH_ERROR,
          message: userData.message
        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'TOKEN_REFRESH_ERROR',
        });
      });

      it('USER_EXIT_SUCCESS', () => {
        const action = {
          type: USER_EXIT_SUCCESS,

        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          auth_checked: false,
        });
      });

      it('USER_EXIT_ERROR', () => {
        const action = {
          type: USER_EXIT_ERROR,

        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          condition: 'USER_EXIT_ERROR',
        });
      });

      it('AUTH_CHECKED', () => {
        const action = {
          type: AUTH_CHECKED,

        };
        expect(userInitialReducer(userInitialState, action)).toEqual({
          ...userInitialState,
          auth_checked: true,
        });
      });

});
    