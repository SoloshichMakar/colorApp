import {IActionRegistration, IStateRegistration } from "../types/types";
import {TEXT_EMAIL_CHANGE, TEXT_PASSWORD_CHANGE, CREATE_USER, TEXT_CONFIRM_PASSWORD_CHANGE, ERROR} from "../../utils/Constants";

const initialState: IStateRegistration = {
    email: '',
    password: '',
    confirmPassword: '',
    message: ''
};

export default function RegistrationReducer(state: IStateRegistration = initialState, action:IActionRegistration): IStateRegistration {
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
        case TEXT_CONFIRM_PASSWORD_CHANGE:
            if(typeof action.confirmPassword === 'string') {
                return {
                    ...state,
                    confirmPassword: action.confirmPassword
                };
            }
        case CREATE_USER:
            return {
                ...state,
                message: 'User: ' + state.email + ' is created',
                email: '',
                password: '',
                confirmPassword:''
            };
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