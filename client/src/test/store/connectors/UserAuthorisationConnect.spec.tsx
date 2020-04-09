import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import UserAuthorisationConnect from "../../../store/connectors/UserAuthorisationConnect";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {email, password, usersTestApi} from "../../testUtils/utilsConstant";
import fetchMock from "fetch-mock";


configure({adapter: new Adapter()});


describe('UserAuthorisation click events ', () => {

    const sagaMiddleware = createSagaMiddleware();
    let wrapper: any;
    let store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    beforeEach(() => {
        wrapper = mount(<Provider store={store}><BrowserRouter><UserAuthorisationConnect/></BrowserRouter></Provider>);
    });

    it('should set email',()=>
    {
        const container = wrapper.find('input[type="text"]');
        expect(container.length).toEqual(1);
        container.simulate('change', {target:{value: email}});
        expect(store.getState().UserAuthorisationReducer.email).toEqual(email);
    });

    it('should set password',()=>
    {
        const container = wrapper.find('input[type="password"]');
        expect(container.length).toEqual(1);
        container.simulate('change', {target:{value: password}});
        expect(store.getState().UserAuthorisationReducer.password).toEqual(password);
    });


    it('should validateUser', async () =>  {
        fetchMock.once(usersTestApi + 'authorization',
            JSON.stringify(1),
         {
            method: 'POST',
            overwriteRoutes: false
        });

        let container = wrapper.find('input[type="text"]');
        container.simulate('change', {target:{value: email}});

        container = wrapper.find('input[type="password"]');
        container.simulate('change', {target:{value: password}});

        container = wrapper.find('input[type="button"]');
        expect(container.length).toEqual(1);
        await container.simulate('click');
        await fetchMock.flush();
        await wrapper.update();
        expect(store.getState().UserAuthorisationReducer.isAuthenticated).toEqual(true);
        expect(store.getState().UserAuthorisationReducer.userId).toEqual(1);
        expect(wrapper.html()).toEqual('');
    });


});