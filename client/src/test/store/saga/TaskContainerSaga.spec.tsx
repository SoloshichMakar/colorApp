import {IAction} from "../../../store/types/types";
import {
    ASYNC_ADD_TASK,
    ASYNC_TASK_IS_DONE,
    ASYNC_DELETE_TASK,
    ASYNC_GET_DATA,
    CREATE_USER, ADD_TASK, DELETE_TASK, TASK_IS_DONE, GET_DATA
} from "../../../utils/Constants";
import {task, tasksFromDB, tasks, tasksTestApi} from "../../testUtils/utilsConstant";
import {asyncAdd, asyncDelete, asyncTaskIsCompleted, getData} from "../../../store/saga/TaskContainerSaga";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import MainReducer from "../../../store/reducers/MainReducer";
import rootSaga from "../../../store/saga/rootSaga";
import {shallow, configure} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import TaskConnector from "../../../store/connectors/TaskConnector";
import nock from "nock";
import SagaTester from "redux-saga-tester";
import React from "react";
import {actionAddTask, actionDeleteTask, actionTaskIsCompleted,actionGetData} from "../../../actions/actions";
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Test User Registration Saga', () => {
    it('should add Task Data', () => {
        const userId = 1;
        const action: IAction= {type: ASYNC_ADD_TASK, newTask: task, userId};
        const data = asyncAdd(action);
        data.next().value;
        const response: any = data.next(task).value;
        expect(response.payload.action.newTask).toEqual(task);
        expect(data.next().done).toEqual(true);
    });

    it('should delete Task Data', () => {
        const deleteId = 1;
        const action: any= {type: ASYNC_DELETE_TASK, deleteId};
        const data = asyncDelete(action);
        data.next().value;
        const response: any = data.next(true).value;
        expect(response.payload.action.deleteId).toEqual(deleteId);
        expect(data.next().done).toEqual(true);
    });

    it('should update Task Data', () => {
        const completedTaskId = 1;
        const completed = true;
        const action: any= {type: ASYNC_TASK_IS_DONE, completedTaskId, completed};
        const data = asyncTaskIsCompleted(action);
        data.next().value;
        const response: any = data.next(true).value;
        expect(response.payload.action.completedTaskId).toEqual(completedTaskId);
        expect(data.next().done).toEqual(true);
    });

    it('should get Task Data', () => {
        const userId = 1;
        const action: IAction= {type: ASYNC_GET_DATA, userId};
        const data = getData(action);
        data.next().value;
        const response: any = data.next(tasksFromDB).value;
        expect(response.payload.action.taskData).toEqual(tasks);
        expect(data.next().done).toEqual(true);
    });
});


describe('Saga -- Test Task Container Saga with mock fetch', () => {
    const sagaMiddleware = createSagaMiddleware();
    let store: any, wrapper;

    beforeEach(() => {

        store = createStore(MainReducer, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(rootSaga);
        // @ts-ignore
        wrapper = shallow(<Provider store={store}><BrowserRouter><TaskConnector/></BrowserRouter></Provider>);
    });

    it('dispatch add task data', async () => {
        nock(tasksTestApi)
            .post('/')
            .reply(200, task, {'Access-Control-Allow-Origin': '*'});
        const sagaTester = new SagaTester();
        sagaTester.start(rootSaga);
        const userId = 1;
        sagaTester.dispatch(actionAddTask(task, userId));
        await sagaTester.waitFor(ADD_TASK);
        expect(sagaTester.getLatestCalledAction()).toEqual({type: ADD_TASK, newTask: task});
    });

    it('dispatch add task data', async () => {
        const deleteId = '1';
        nock.disableNetConnect();
        nock(tasksTestApi)
            .persist()
            .intercept('/' + deleteId, "OPTIONS")
            .reply(200, {}, {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application:json"
            })
            .delete('/' + deleteId)
            .reply(200, {}, {'Access-Control-Allow-Origin': '*'});
        const sagaTester = new SagaTester();
        sagaTester.start(rootSaga);

        sagaTester.dispatch(actionDeleteTask(deleteId));
        await sagaTester.waitFor(DELETE_TASK);
        expect(sagaTester.getLatestCalledAction()).toEqual({type: DELETE_TASK, deleteId: deleteId});
    });


    it('dispatch update task data', async () => {
        const completedTaskId = '1';
        const completed = true;
        nock(tasksTestApi)
            .put('/' + completedTaskId)
            .reply(200, {}, {'Access-Control-Allow-Origin': '*'});
        const sagaTester = new SagaTester();
        sagaTester.start(rootSaga);
        sagaTester.dispatch(actionTaskIsCompleted(completedTaskId, completed));
        await sagaTester.waitFor(TASK_IS_DONE);
        expect(sagaTester.getLatestCalledAction()).toEqual({
            type: TASK_IS_DONE,
            completedTaskId: completedTaskId,
        });
    });


    it('dispatch update task data', async () => {
        const userId = 1;
        nock(tasksTestApi)
            .get("/user/" + userId)
            .reply(200, tasksFromDB, {'Access-Control-Allow-Origin': '*'});
        const sagaTester = new SagaTester();
        sagaTester.start(rootSaga);
        sagaTester.dispatch(actionGetData(userId));
        await sagaTester.waitFor(GET_DATA);
        expect(sagaTester.getLatestCalledAction()).toEqual({type:GET_DATA , taskData: tasks});
    });
});