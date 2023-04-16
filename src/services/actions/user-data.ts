import { TUserData } from "../../types/types";

export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export const USER_GET_DATA_SUCCESS ="USER_UPDATE_DATA_SUCCESS";
export const USER_UPDATE_DATA_SUCCESS ="USER_UPDATE_DATA_SUCCESS";
export const USER_UPDATE_DATA_ERROR ="USER_UPDATE_DATA_ERROR";

export const PASSWORD_REFRESH_SUCCESS = "PASSWORD_REFRESH_SUCCESS";
export const PASSWORD_REFRESH_ERROR ="PASSWORD_REFRESH_ERROR";

export const PASSWORD_NEW_SUCCESS = "PASSWORD_NEW_SUCCESS";
export const PASSWORD_NEW_ERROR = "PASSWORD_NEW_ERROR";

export const TOKEN_REFRESH_SUCCESS = "TOKEN_REFRESH_SUCCESS";
export const TOKEN_REFRESH_ERROR = "TOKEN_REFRESH_ERROR";

export const USER_EXIT_SUCCESS ="USER_EXIT_SUCCESS";
export const USER_EXIT_ERROR ="USER_EXIT_ERROR";

export const AUTH_CHECKED  ="AUTH_CHECKED";


export interface IUSER_REGISTER_SUCCESS {
    readonly type: typeof USER_REGISTER_SUCCESS;
    readonly userName: string;
    readonly email: string;
    readonly password: string;
    readonly message?: string;
    readonly UserData?: TUserData;

}

export interface IUSER_REGISTER_ERROR {
    readonly type: typeof USER_REGISTER_ERROR;
   
}

export interface IUSER_LOGIN_SUCCESS {
    readonly type: typeof USER_LOGIN_SUCCESS;
    readonly userName: string;
    readonly email: string;

}

export interface IUSER_LOGIN_ERROR {
    readonly type: typeof USER_LOGIN_ERROR;
   
}

export interface IUSER_GET_DATA_SUCCESS {
    readonly type: typeof USER_GET_DATA_SUCCESS;
   
}

export interface IUSER_UPDATE_DATA_SUCCESS {
    readonly type: typeof USER_UPDATE_DATA_SUCCESS;
    readonly userName: string;
    readonly email: string;
}

export interface IUSER_UPDATE_DATA_ERROR {
    readonly type: typeof USER_UPDATE_DATA_ERROR;
   
}

export interface IPASSWORD_REFRESH_SUCCESS {
    readonly type: typeof PASSWORD_REFRESH_SUCCESS;
    readonly message:  string;
   
}

export interface IPASSWORD_REFRESH_ERROR {
    readonly type: typeof PASSWORD_REFRESH_ERROR;
   
}

export interface IPASSWORD_NEW_SUCCESS {
    readonly type: typeof PASSWORD_NEW_SUCCESS;
    readonly message: string;
   
}

export interface IPASSWORD_NEW_ERROR {
    readonly type: typeof PASSWORD_NEW_ERROR;
   
}

export interface IITOKEN_REFRESH_SUCCESS {
    readonly type: typeof TOKEN_REFRESH_SUCCESS;
   
}
export interface ITOKEN_REFRESH_SUCCESS {
    readonly type: typeof TOKEN_REFRESH_SUCCESS;
   
}
export interface ITOKEN_REFRESH_ERROR {
    readonly type: typeof TOKEN_REFRESH_ERROR;
   
}

export interface IUSER_EXIT_SUCCESS {
    readonly type: typeof USER_EXIT_SUCCESS;
   
}

export interface IUSER_EXIT_ERROR {
    readonly type: typeof USER_EXIT_ERROR;
   
}

export interface IAUTH_CHECKED {
    readonly type: typeof AUTH_CHECKED;
   
}



export type TUserRegisterActions =  
IUSER_REGISTER_SUCCESS|
    IUSER_REGISTER_ERROR|
    IUSER_LOGIN_SUCCESS|
    IUSER_LOGIN_ERROR|
    IUSER_UPDATE_DATA_SUCCESS|
    IUSER_UPDATE_DATA_ERROR|
    IPASSWORD_REFRESH_SUCCESS|
    IPASSWORD_REFRESH_ERROR|
    IPASSWORD_NEW_SUCCESS|
    IPASSWORD_NEW_ERROR|
    ITOKEN_REFRESH_SUCCESS|
    ITOKEN_REFRESH_ERROR|
    IUSER_EXIT_SUCCESS|
    IUSER_EXIT_ERROR|
    IAUTH_CHECKED;