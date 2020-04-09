import {IActionLogin} from "../../../store/types/types";
import {ASYNC_CREATE_USER, CREATE_USER, ERROR} from "../../../utils/Constants";
import {email, password, usersTestApi} from "../../testUtils/utilsConstant";
import {userRegister} from "../../../store/saga/registrationSaga";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import {shallow, configure} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import RegistrationConnect from "../../../store/connectors/RegistrationConnect";
import nock from "nock";
import SagaTester from "redux-saga-tester";
import {actionCreateUser} from "../../../actions/RegistartionAction";
import React from "react";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Test User Registration Saga', () => {
    it('should add User Data', () => {
        const action: IActionLogin= {type: ASYNC_CREATE_USER, email, password};
        const data = userRegister(action);
        data.next().value;
        const response: any = data.next(true).value;
        expect(response.payload.action.serverResponse).toEqual(true);
        expect(data.next().done).toEqual(true);
    });
});


describe('Saga -- Test User Registration Saga with mock fetch', () => {
    const sagaMiddleware = createSagaMiddleware();
    let wrapper;

    let store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    beforeEach(() => {
        wrapper = shallow(<Provider store={store}><BrowserRouter><RegistrationConnect/></BrowserRouter></Provider>);
    });

    it('dispatch set registration user data', async () => {
        nock(usersTestApi)
            .post('/create')
            .reply(200, 'true', {'Access-Control-Allow-Origin': '*'});
        const sagaTester = new SagaTester();
        sagaTester.start(rootSaga);
        sagaTester.dispatch(actionCreateUser(email, password));
        await sagaTester.waitFor(CREATE_USER);
        expect(sagaTester.getLatestCalledAction()).toEqual({ type: CREATE_USER, serverResponse: true });
    });

    it('dispatch set registration user data with Error', async () => {
        nock(usersTestApi)
            .post('/create')
            .reply(404, {message: 'Invalid query'}, {'Access-Control-Allow-Origin': '*'});
        const sagaTester = new SagaTester();
        sagaTester.start(rootSaga);
        sagaTester.dispatch(actionCreateUser(email, password));
        await sagaTester.waitFor(ERROR);
        expect(sagaTester.getLatestCalledAction()).toEqual({ type: ERROR, errorMessage: 'Invalid query' });
    });
});