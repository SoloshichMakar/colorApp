import {all, call, fork} from 'redux-saga/effects';
import TaskContainerSaga from './TaskContainerSaga';
import UserAuthorisationSaga from './UserAuthorisationSaga';
import registrationSaga from './registrationSaga'

export default function* rootSaga () {
    yield all([
        call(TaskContainerSaga),
        call(UserAuthorisationSaga),
        call(registrationSaga)
    ]);
}