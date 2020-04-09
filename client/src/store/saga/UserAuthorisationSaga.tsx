import { takeLatest, put } from "redux-saga/effects";
import { ASYNC_USER_CHECK, USER_CHECK, ERROR } from "../../utils/Constants";
import { Api } from "../api/Api";
import { IActionLogin } from "../types/types";

export function* getAuthorisationData(action: IActionLogin) {
  try {
    if (action.email && action.password) {
      const checkedUser = yield Api.userValidate(action.email, action.password);
      yield put({ type: USER_CHECK, checkedUser: checkedUser });
    }
  } catch (e) {
    yield put({ type: ERROR, errorMessage: e.message });
  }
}

export default function* authorisationSaga() {
  yield takeLatest(ASYNC_USER_CHECK, getAuthorisationData);
}
