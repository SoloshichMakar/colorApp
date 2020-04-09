import {ASYNC_USER_CHECK, TEXT_EMAIL_CHANGE, TEXT_PASSWORD_CHANGE} from "../utils/Constants";

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


export function actionUserCheck(email: string, password:string) {
    return {
        type: ASYNC_USER_CHECK,
        email,
        password
    }
}
