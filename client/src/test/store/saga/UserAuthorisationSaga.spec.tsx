import {getAuthorisationData} from '../../../store/saga/UserAuthorisationSaga'
import {email, password, usersTestApi} from "../../testUtils/utilsConstant";
import {IActionLogin} from "../../../store/types/types";
import {ASYNC_USER_CHECK, USER_CHECK} from "../../../utils/Constants";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import {shallow, configure} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {actionUserCheck} from "../../../actions/UserAuthorisationActions";
import React from "react";
import UserAuthorisationConnect from "../../../store/connectors/UserAuthorisationConnect";
import nock from 'nock';
import SagaTester from "redux-saga-tester";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});


describe('Test User Authorisation Saga', () => {
    it('should get authorisation data', () => {
        const action: IActionLogin= {type: ASYNC_USER_CHECK, email, password};
        const data = getAuthorisationData(action);
        data.next().value;
        const response: any = data.next(1).value;
        expect(response.payload.action.checkedUser).toEqual(1);
        expect(data.next().done).toEqual(true);
    });


});


describe('Saga -- Test User Authorisation Saga with mock fetch', () => {
    const sagaMiddleware = createSagaMiddleware();
    let store: any, wrapper;

    beforeEach(() => {

        store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(rootSaga);
        // @ts-ignore
        wrapper = shallow(<Provider store={store}><BrowserRouter><UserAuthorisationConnect/></BrowserRouter></Provider>);
    });

    it('dispatch get authorisation user data', async () => {
        nock(usersTestApi)
            .post('/authorization')
            .reply(200, '1', {'Access-Control-Allow-Origin': '*'});
        const sagaTester = new SagaTester();
        sagaTester.start(rootSaga);
        sagaTester.dispatch(actionUserCheck(email, password));
        await sagaTester.waitFor(USER_CHECK);
        expect(sagaTester.getLatestCalledAction()).toEqual({ type: USER_CHECK, checkedUser: 1 });
    });
});