import { takeLatest, put } from "redux-saga/effects";
import {IAction, ITask} from "../types/types";
import {
  GET_DATA,
  ADD_TASK,
  DELETE_TASK,
  TASK_IS_DONE,
  ASYNC_GET_DATA,
  ASYNC_ADD_TASK,
  ASYNC_DELETE_TASK,
  ASYNC_TASK_IS_DONE,
} from "../../utils/Constants";
import {Api} from '../api/Api';

export function* asyncAdd(action: IAction) {
  try {
    if(action.newTask && action.userId) {
      const receiveData = yield Api.addData(action.newTask, action.userId);
      if (receiveData) {
        action.newTask.id = receiveData.id;
        yield put({type: ADD_TASK, newTask: action.newTask});
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function* asyncDelete(action: IAction) {
  try {
    if(action.deleteId) {
      const tasks = yield Api.deleteData(action.deleteId);
      if (tasks) {
        yield put({type: DELETE_TASK, deleteId: action.deleteId});
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function* asyncTaskIsCompleted(action: IAction) {
  try {
    if(action.completedTaskId && typeof action.completed !== 'undefined') {
      const tasks = yield Api.updateData(action.completedTaskId, action.completed);
      if (tasks) {
        yield put({
          type: TASK_IS_DONE,
          completedTaskId: action.completedTaskId,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function* getData(action: any) {
  try {
    const taskData: Array<ITask> = [];
    const tasks = yield Api.getData(action.userId);
    for(let task of tasks) {
      const testTask: ITask = {
      taskColor: task.description,
      taskText: task.name,
      id: task.id,
      completed: task.completed,
      };
      taskData.push(testTask);
    }
    yield put({type:GET_DATA , taskData: taskData});

  } catch (e) {
  }
}

export default function* taskContainerSaga() {
  yield takeLatest(ASYNC_ADD_TASK, asyncAdd);
  yield takeLatest(ASYNC_DELETE_TASK, asyncDelete);
  yield takeLatest(ASYNC_TASK_IS_DONE, asyncTaskIsCompleted);
  yield takeLatest(ASYNC_GET_DATA, getData);
}
