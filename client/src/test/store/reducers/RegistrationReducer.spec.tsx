import {TEXT_EMAIL_CHANGE, TEXT_PASSWORD_CHANGE, CREATE_USER, TEXT_CONFIRM_PASSWORD_CHANGE, ERROR} from "../../../utils/Constants";
import {IStateRegistration} from "../../../store/types/types";
import RegistrationReducer from "../../../store/reducers/RegistrationReducer";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import { shallow, mount, configure } from 'enzyme';
import { Provider } from "react-redux";
import RegistrationConnect from '../../../store/connectors/RegistrationConnect';
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {actionEmailChange, actionPasswordChange, actionPasswordConfirmChange, actionErrorMessage} from "../../../actions/RegistartionAction";
import {email, password} from "../../testUtils/utilsConstant";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Reduscer -- Test UserAuthorisationReducer', () => {
    let state: IStateRegistration = {
        email: '',
        password: '',
        confirmPassword: '',
        message: ''
    };
    it('should change email', function () {
        state = RegistrationReducer(state, {type: TEXT_EMAIL_CHANGE, email: 'test@mail.com'});
        expect(state.email).toEqual('test@mail.com')
    });

    it('should change password', function () {
        state = RegistrationReducer(state, {type: TEXT_PASSWORD_CHANGE, password: 'test'});
        expect(state.password).toEqual('test')
    });

    it('should change confirmPassword text', function () {
        state = RegistrationReducer(state, {type: TEXT_CONFIRM_PASSWORD_CHANGE, confirmPassword: 'test'});
        expect(state.confirmPassword).toEqual('test')
    });

    it('should change message text', function () {
        state = RegistrationReducer(state, {type: ERROR, errorMessage: 'test'});
        expect(state.message).toEqual('test')
    });

    it('should create user', function () {
        state = RegistrationReducer(state, {type: TEXT_EMAIL_CHANGE, email: 'test@mail.com'});
        state = RegistrationReducer(state, {type: CREATE_USER});
        expect(state.message).toEqual('User: test@mail.com is created');
    });
});


describe('Reduscer -- Test UserAuthorisationReducer actions with store', () => {
    const sagaMiddleware = createSagaMiddleware();
    let store: any, wrapper;

    beforeEach(()=>{
        store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(rootSaga);
        wrapper = shallow( <Provider store={store}><BrowserRouter><RegistrationConnect /></BrowserRouter></Provider> );
    });

    it('dispatch actionEmailChange', () => {
        store.dispatch(actionEmailChange(email));
        expect(store.getState().RegistrationReducer.email).toEqual(email);
    });

    it('dispatch actionPasswordChange', () => {
        store.dispatch(actionPasswordChange(password));
        expect(store.getState().RegistrationReducer.password).toEqual(password);
    });

    it('dispatch actionPasswordConfirmChange', () => {
        store.dispatch(actionPasswordConfirmChange(password));
        expect(store.getState().RegistrationReducer.confirmPassword).toEqual(password);
    });

    it('dispatch actionPasswordConfirmChange', () => {
        const testMessage = 'Test message';
        store.dispatch(actionErrorMessage(testMessage));
        expect(store.getState().RegistrationReducer.message).toEqual(testMessage);
    });

    it('dispatch actionPasswordConfirmChange', () => {
        store.dispatch(actionEmailChange(email));
        store.dispatch({type: CREATE_USER});
        expect(store.getState().RegistrationReducer.message).toEqual(`User: ${email} is created`);
    });

});