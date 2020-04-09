import {
  ASYNC_ADD_TASK,
  ASYNC_DELETE_TASK,
  SET_COLOR,
  TEXT_CHANGE,
  ASYNC_TASK_IS_DONE,
  ASYNC_GET_DATA,
} from "../utils/Constants";

import { ITask } from "../store/types/types";

export function actionAddTask(newTask: ITask, userId: number) {
  return { type: ASYNC_ADD_TASK, newTask, userId};
}

export function actionSetColor(value: string) {
  return { type: SET_COLOR, value };
}

export function actionTextChange(getTextAreaValue: string) {
  return {
    type: TEXT_CHANGE,
    inputText: getTextAreaValue,
  };
}

export function actionDeleteTask(deleteId: string) {
  return { type: ASYNC_DELETE_TASK, deleteId: deleteId };
}

export function actionTaskIsCompleted(completedTaskId: string, completed: boolean) {
  return { type: ASYNC_TASK_IS_DONE, completedTaskId, completed};
}

export function actionGetData(userId: number) {
  return { type: ASYNC_GET_DATA, userId};
}
