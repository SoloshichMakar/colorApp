import {IState, IAction, ITask} from "../../../store/types/types";

import {
    ADD_TASK,
    DELETE_TASK,
    SET_COLOR,
    TEXT_CHANGE,
    TASK_IS_DONE,
    GET_DATA,
    COLORS
} from "../../../utils/Constants";
import toDoReducer from "../../../store/reducers/toDoReducer";
import {task, tasks} from "../../testUtils/utilsConstant";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import {shallow, configure} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import TaskConnector from "../../../store/connectors/TaskConnector";
import React from "react";
import {actionSetColor, actionTextChange} from "../../../actions/actions";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Reduscer -- Test UserAuthorisationReducer', () => {
    let state: IState = {
        tasks: [],
        inputText: "",
        chosenColor: "",
    };

    it('should setColor', () => {
        state = toDoReducer(state, {type: SET_COLOR, value: COLORS[0]});
        expect(state.chosenColor).toEqual(COLORS[0]);
    });

    it('should add task',  () => {
        state = toDoReducer(state, {type: ADD_TASK, newTask: task});
        expect(state.tasks.length).toEqual(1);
        expect(state.tasks[0]).toEqual(task);
        state = toDoReducer(state, {type: DELETE_TASK, deleteId: '1'});
    });

    it('should change input text', function () {
        const testString = 'test text';
        state = toDoReducer(state, {type: TEXT_CHANGE, inputText: testString});
        expect(state.inputText).toEqual(testString);
    });

    it('should delete task', function () {
        state = toDoReducer(state, {type: ADD_TASK, newTask: task});
        state = toDoReducer(state, {type: DELETE_TASK, deleteId: '1'});
        expect(state.tasks.length).toEqual(0);
    });

    it('should set flag completed to true or false',  () =>  {
        state = toDoReducer(state, {type: ADD_TASK, newTask: task});
        state = toDoReducer(state, {type: TASK_IS_DONE, completedTaskId: '1'});
        expect(state.tasks[0].completed).toEqual(true);
        state = toDoReducer(state, {type: TASK_IS_DONE, completedTaskId: '1'});
        expect(state.tasks[0].completed).toEqual(false);
        state = toDoReducer(state, {type: DELETE_TASK, deleteId: '1'});
    });

    it('should set multiple tasks',  () =>  {
        state = toDoReducer(state, {type: GET_DATA, taskData: tasks});
        expect(state.tasks.length).toEqual(2);
        expect(state.tasks).toEqual(tasks);
    });

});


describe('Reduscer -- Test toDoReducer actions with store', () => {
    const sagaMiddleware = createSagaMiddleware();
    let store: any, wrapper;

    beforeEach(() => {
        store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(rootSaga);
        // @ts-ignore
        wrapper = shallow(<Provider store={store}><BrowserRouter><TaskConnector/></BrowserRouter></Provider>);
    });

    it('dispatch action Set color', () => {
        store.dispatch(actionSetColor(COLORS[0]));
        expect(store.getState().toDoReducer.chosenColor).toEqual(COLORS[0]);
    });

    it('dispatch action change Input text', () => {
        const testText = 'test text';
        store.dispatch(actionTextChange(testText));
        expect(store.getState().toDoReducer.inputText).toEqual(testText);
    });

    it('dispatch action add task', () => {
        store.dispatch({type: ADD_TASK, newTask: task});
        expect(store.getState().toDoReducer.tasks.length).toEqual(1);
        expect(store.getState().toDoReducer.tasks[0]).toEqual(task);
    });

    it('dispatch action delete task', () => {
        store.dispatch({type: ADD_TASK, newTask: task});
        expect(store.getState().toDoReducer.tasks.length).toEqual(1);
        expect(store.getState().toDoReducer.tasks[0]).toEqual(task);
        store.dispatch({type: DELETE_TASK, deleteId: '1'});
        expect(store.getState().toDoReducer.tasks.length).toEqual(0);
    });

    it('dispatch action complete task', () => {
        store.dispatch({type: ADD_TASK, newTask: task});
        expect(store.getState().toDoReducer.tasks.length).toEqual(1);
        expect(store.getState().toDoReducer.tasks[0]).toEqual(task);
        expect(store.getState().toDoReducer.tasks[0].completed).toEqual(false);
        store.dispatch({type: TASK_IS_DONE, completedTaskId: '1'});
        expect(store.getState().toDoReducer.tasks[0].completed).toEqual(true);
    });

    it('should set multiple tasks',  () =>  {
        store.dispatch({type: GET_DATA, taskData: tasks});
        expect(store.getState().toDoReducer.tasks.length).toEqual(2);
        expect(store.getState().toDoReducer.tasks).toEqual(tasks);
    });
});