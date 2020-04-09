import {
    ASYNC_CREATE_USER, ERROR,
    TEXT_CONFIRM_PASSWORD_CHANGE,
    TEXT_EMAIL_CHANGE,
    TEXT_PASSWORD_CHANGE
} from "../utils/Constants";

export function actionEmailChange(email: string) {
    return {
        type: TEXT_EMAIL_CHANGE,
        email
    }
}


export function actionPasswordChange(password: string) {
    return {
        type: TEXT_PASSWORD_CHANGE,
        password
    }
}


export function actionPasswordConfirmChange(confirmPassword: string) {
    return {
        type: TEXT_CONFIRM_PASSWORD_CHANGE,
        confirmPassword
    }
}


export function actionCreateUser(email: string, password:string) {
    return {
        type: ASYNC_CREATE_USER,
        email,
        password
    }
}

export function actionErrorMessage(errorMessage: string) {
    return {
        type: ERROR,
        errorMessage
    }
}