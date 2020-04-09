import { ITask } from "../types/types";
import {ApiRequest} from './ApiRequests'

const tasksApi = "http://localhost:4000/tasks/";
const usersApi = "http://localhost:4000/users/";

function* getData(userId: number) {
  const response = yield ApiRequest.getDataRequest(tasksApi, userId);
  return response;
}

function* addData(newTask: ITask, userId: number) {
  const response = yield ApiRequest.addDataRequest(tasksApi, newTask, userId);
  return response;
}

function* deleteData(deletedTaskId: string) {
  const response = yield ApiRequest.deleteDataRequest(tasksApi, deletedTaskId);
  return response;
}

function* updateData(completedTaskId: string, completed: boolean) {
  const response = yield ApiRequest.updateDataRequest(tasksApi, completedTaskId, completed);
  return response;
}

function* userValidate(email: string, password: string) {
   const response = yield ApiRequest.userValidateRequest(usersApi, email, password);
   return response;
}

function* addUser(email: string, password: string) {
  const response = yield ApiRequest.addUserRequest(usersApi, email, password);
  return response;
}

export const Api = {
  getData,
  addData,
  deleteData,
  updateData,
  userValidate,
  addUser,
};
