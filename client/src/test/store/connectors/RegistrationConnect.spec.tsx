import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import RegistrationConnect from "../../../store/connectors/RegistrationConnect";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {email, password, tasksTestApi, usersTestApi} from "../../testUtils/utilsConstant";
import fetchMock from "fetch-mock";

configure({adapter: new Adapter()});

function wait(milliseconds: number) {
    return new Promise(resolve => setTimeout(() => resolve(true), milliseconds))
}


describe('Registration click events ', () => {

    const sagaMiddleware = createSagaMiddleware();
    let wrapper: any;

    let store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><BrowserRouter><RegistrationConnect/></BrowserRouter></Provider>);
    });
    afterEach(() =>{
       wrapper.unmount();
    });

    it('should set email',()=>
    {
        const container = wrapper.find('#email');
        expect(container.length).toEqual(1);
        container.simulate('change', {target:{value: email}});
        expect(store.getState().RegistrationReducer.email).toEqual(email);
    });

    it('should set password',()=>
    {
        const container = wrapper.find('#password');
        expect(container.length).toEqual(1);
        container.simulate('change', {target:{value: password}});
        expect(store.getState().RegistrationReducer.password).toEqual(password);
    });

    test('should set confirmPassword',()=>
    {
        const container = wrapper.find('#confirmPassword');
        expect(container.length).toEqual(1);
        container.simulate('change', {target:{value: password}});
        expect(store.getState().RegistrationReducer.confirmPassword).toEqual(password);
    });

    it('should createUser', async () =>
    {
        const body = {
            message: true
        };

        fetchMock.once(usersTestApi + 'create', {
            body: JSON.stringify(body),
            status: 200,
            statusText: 'OK',
            headers: {'Content-Type': 'application/json'},
            sendAsJson: false
        }, {
            method: 'POST'
        });

        let container = wrapper.find('#email');
        container.simulate('change', {target:{value: email}});

        container = wrapper.find('#password');
        container.simulate('change', {target:{value: password}});

        container = wrapper.find('#confirmPassword');
        container.simulate('change', {target:{value: password}});

        container = wrapper.find('input[type="button"]');
        expect(container.length).toEqual(1);
        await container.simulate('click');
        await fetchMock.flush();
        await wrapper.update();
        expect(store.getState().RegistrationReducer.message).toEqual(`User: ${email} is created`);
    });

});
