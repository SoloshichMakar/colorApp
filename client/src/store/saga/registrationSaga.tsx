import {takeLatest, put} from "redux-saga/effects";
import {ASYNC_CREATE_USER, CREATE_USER, ERROR} from "../../utils/Constants";
import {Api} from '../api/Api';
import {IActionLogin} from "../types/types";


export function* userRegister(action: IActionLogin) {
    try {
        if(action.email && action.password) {
            const serverResponse = yield Api.addUser(action.email, action.password);
            yield put({type: CREATE_USER, serverResponse: serverResponse});
        }
    } catch (e) {
        yield put({type: ERROR, errorMessage: e.message});
    }
}

export default function* registrationSaga() {
    yield takeLatest(ASYNC_CREATE_USER, userRegister);
}