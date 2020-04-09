import React from "react";
import {TEXT_EMAIL_CHANGE, TEXT_PASSWORD_CHANGE, USER_CHECK, ERROR}from '../../utils/Constants'
import {ILogin, IActionLogin} from '../types/types';


const initialState: ILogin = {
    email: '',
    password: '',
    isAuthenticated: false,
    userId: -1,
    message: '',
}

export default function UserAuthorisationReducer(state: ILogin = initialState, action:IActionLogin): ILogin {
    switch (action.type) {
        case TEXT_EMAIL_CHANGE:
            if(typeof action.email === 'string') {
                return {
                    ...state,
                    email: action.email
                };
            }
        case TEXT_PASSWORD_CHANGE:
            if(typeof action.password === 'string') {
                return {
                    ...state,
                    password: action.password
                };
            }
        case USER_CHECK:
            if(typeof action.checkedUser === 'number') {
                return {
                    ...state,
                    isAuthenticated: true,
                    userId: action.checkedUser
                };
            }
        case ERROR:
            if(typeof action.errorMessage === 'string') {
                return {
                    ...state,
                    message: action.errorMessage
                };
            }
        default:
            return state;
    }
}

