import UserAuthorisationReducer from '../../../store/reducers/UserAuthorisationReducer'
import {TEXT_EMAIL_CHANGE, TEXT_PASSWORD_CHANGE, USER_CHECK, ERROR}from '../../../utils/Constants'
import {ILogin} from "../../../store/types/types";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import {shallow, configure} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import UserAuthorisationConnect from "../../../store/connectors/UserAuthorisationConnect";
import {actionEmailChange, actionPasswordChange} from "../../../actions/UserAuthorisationActions";
import {email, password} from "../../testUtils/utilsConstant";
import React from "react";

import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let state: ILogin = {
    email: '',
    password: '',
    isAuthenticated: false,
    userId: -1,
    message: '',
};

describe('Reduscer -- Test UserAuthorisationReducer', () => {
   it('reduser for text TEXT_EMAIL_CHANGE', () =>{

       state = UserAuthorisationReducer(state, {type: TEXT_EMAIL_CHANGE, email: 'test@mail.com'});
       expect(state.email).toEqual('test@mail.com')
   });

    it('reduser for text TEXT_PASSWORD_CHANGE', () =>{
        state = UserAuthorisationReducer(state, {type: TEXT_PASSWORD_CHANGE, password: 'test'});
        expect(state.password).toEqual('test')
    });

    it('reduser for text USER_CHECK', () =>{
        state = UserAuthorisationReducer(state, {type: USER_CHECK, checkedUser: 1});
        expect(state.userId).toEqual(1)
    });

    it('reduser for text ERROR', () =>{
        state = UserAuthorisationReducer(state, {type: ERROR, errorMessage: 'test'});
        expect(state.message).toEqual('test')
    });
});


describe('Reduscer -- Test UserAuthorisationReducer actions with store', () => {
    const sagaMiddleware = createSagaMiddleware();
    let store: any, wrapper;

    beforeEach(() => {
        store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(rootSaga);
        wrapper = shallow(<Provider store={store}><BrowserRouter><UserAuthorisationConnect/></BrowserRouter></Provider>);
    });

    it('dispatch actionEmailChange', () => {
        store.dispatch(actionEmailChange(email));
        expect(store.getState().UserAuthorisationReducer.email).toEqual(email);
    });

    it('dispatch actionPasswordChange', () => {
        store.dispatch(actionPasswordChange(password));
        expect(store.getState().UserAuthorisationReducer.password).toEqual(password);
    });

    it('dispatch action Check user', () => {
        const checkedUser = 1;
        store.dispatch({ type: USER_CHECK, checkedUser: checkedUser });
        expect(store.getState().UserAuthorisationReducer.isAuthenticated).toEqual(true);
        expect(store.getState().UserAuthorisationReducer.userId).toEqual(checkedUser);
    });

});