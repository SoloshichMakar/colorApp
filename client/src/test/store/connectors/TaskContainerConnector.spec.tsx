import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import {configure, mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import TaskContainerConnector from "../../../store/connectors/TaskContainerConnector";
import {tasksFromDB, task, tasksTestApi} from "../../testUtils/utilsConstant";
import fetchMock from "fetch-mock";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import {COLORS, USER_CHECK} from "../../../utils/Constants";

configure({adapter: new Adapter()});

describe('UserAuthorisation click events ', () => {

    const sagaMiddleware = createSagaMiddleware();
    let wrapper: any;
    let store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    const inputText = 'Test text';

    beforeEach(() => {
        store.dispatch({ type: USER_CHECK, checkedUser: 1});
        fetchMock.once(tasksTestApi + "user/" + 1,
                    JSON.stringify({}),
                    {
                        method: 'GET',
                        overwriteRoutes: false,
                    });
        wrapper = mount(<Provider store={store}><BrowserRouter><TaskContainerConnector/></BrowserRouter></Provider>);
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('should set inputText', () => {
        const container = wrapper.find('input[type="text"]');
        expect(container.length).toEqual(1);
        container.simulate('change', {target: {value: inputText}});
        expect(store.getState().toDoReducer.inputText).toEqual(inputText);
        expect(wrapper.find('input[type="text"]').html()).toEqual('<input type="text" placeholder="Add New Item" class="sc-AxiKw bqifRl" value="Test text">')
    });

    it('should set Color', () => {
        const container = wrapper.find('input[type="radio"]');
        expect(container.length).toEqual(6);
        container.at(0).simulate('click');
        expect(store.getState().toDoReducer.chosenColor).toEqual(COLORS[0]);
    });

    it('should add Task by user click', async () =>  {
        fetchMock.once(tasksTestApi,
            JSON.stringify(tasksFromDB[0]),
            {
                method: 'POST',
                overwriteRoutes: false,
            });

        let container = wrapper.find('input[type="text"]');
        expect(container.length).toEqual(1);
        expect(wrapper.find('input[type="checkbox"]').length).toEqual(0);
        container.simulate('change', {target: {value: inputText}});

        container = wrapper.find('input[type="radio"]');
        expect(container.length).toEqual(6);
        container.at(0).simulate('click');

        container = wrapper.find('a');
        expect(container.length).toEqual(1);
        await container.simulate('click');
        await fetchMock.flush();
        await wrapper.update();
        expect(store.getState().toDoReducer.tasks[0]).toEqual(task);
        expect(wrapper.find('input[type="checkbox"]').length).toEqual(1);       //Check creating checkbox
        expect(wrapper.find('.sc-AxheI').length).toEqual(1);                    //Check creating deleteButton
        expect(wrapper.find('.sc-fzplWN').at(1).text()).toEqual(inputText);        //Check creating Task Text container
    });


    it('should set Task checked and delete task', async () =>  {
        fetchMock.once(tasksTestApi + 1, {},
            {
                method: 'PUT',
                overwriteRoutes: false,
            });
        fetchMock.once(tasksTestApi + 1, {},
            {
                method: 'DELETE',
                overwriteRoutes: false,
            });
        expect(store.getState().toDoReducer.tasks[0]).toEqual(task);
        expect(store.getState().toDoReducer.tasks[0].completed).toEqual(false);
        wrapper.find('input[type="checkbox"]').simulate('click');
        await fetchMock.flush();
        await wrapper.update();
        expect(store.getState().toDoReducer.tasks[0].completed).toEqual(true);
        wrapper.find('.sc-AxheI').simulate('click');
        await fetchMock.flush();
        await wrapper.update();
        expect(store.getState().toDoReducer.tasks.length).toEqual(0);
        expect(wrapper.find('input[type="checkbox"]').length).toEqual(0);
        expect(wrapper.find('.sc-AxheI').length).toEqual(0);                    //Check creating deleteButton
        expect(wrapper.find('.sc-fzplWN').length).toEqual(0);
    });
});