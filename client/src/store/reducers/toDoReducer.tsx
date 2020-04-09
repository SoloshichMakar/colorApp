import {IState, IAction, ITask} from "../types/types";

import {
  ADD_TASK,
  DELETE_TASK,
  SET_COLOR,
  TEXT_CHANGE,
  TASK_IS_DONE,
    GET_DATA,
} from "../../utils/Constants";

const initialState: IState = {
  tasks: [],
  inputText: "",
  chosenColor: "",
};

export default function toDoReducer(
  state: IState = initialState,
  action: IAction
): IState {
  const { tasks } = state;
  const {
    value,
    newTask,
    inputText,
    deleteId,
    completedTaskId,
  } = action;

  switch (action.type) {
    case SET_COLOR:
      if (typeof value === "string") {
        return {
          ...state,
          chosenColor: value,
        };
      }
    case ADD_TASK:
      if (newTask) {
        return {
          ...state,
          tasks: [...tasks, newTask],
          inputText: "",
        };
      }
    case TEXT_CHANGE:
      if (typeof inputText !== 'undefined') {
        return {
          ...state,
          inputText: inputText,
        };
      }
    case DELETE_TASK:
      if (deleteId) {
        const newTasksArray = tasks.filter((task: ITask) => task.id !== deleteId);
        return {
          ...state,
          tasks: newTasksArray,
        };
      }
    case TASK_IS_DONE:
      if (completedTaskId) {
        const newTasks = state.tasks.map((task) => {
          if (task.id === completedTaskId) {
            task.completed = !task.completed
          }
          return task;
        });
        return {
          ...state,
          tasks: newTasks,
        };
      }
    case GET_DATA:
      if(action.taskData) {
        return {
          ...state,
          tasks: action.taskData
        };
      }
    default:
      return state;
  }
}
