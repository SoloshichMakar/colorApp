import {
  actionTextChange,
  actionTaskIsCompleted,
  actionDeleteTask,
  actionSetColor,
  actionAddTask,
  actionGetData,
} from "../../actions/actions";

import {
    ASYNC_ADD_TASK,
    ASYNC_DELETE_TASK,
    SET_COLOR,
    TEXT_CHANGE,
    ASYNC_TASK_IS_DONE,
    ASYNC_GET_DATA,
} from "../../utils/Constants";
import {COLORS} from '../../utils/Constants'
import {task} from '../testUtils/utilsConstant'

describe('test toDo actions', () =>{
    it('should make action text change',  () => {
        const testString = 'Test string';
        const result = actionTextChange(testString);
        expect(result).toEqual({type:TEXT_CHANGE, inputText: testString });
    });

    it('should make action add task', () => {
        const userId = 1;
        const result = actionAddTask(task, userId);
        expect(result).toEqual({ type: ASYNC_ADD_TASK, newTask: task, userId});
    });

    it('should make action add task', () => {
        const userId = 1;
        const result = actionAddTask(task, userId);
        expect(result).toEqual({ type: ASYNC_ADD_TASK, newTask: task, userId});
    });

    it('should make action set color', () => {
        const result = actionSetColor(COLORS[0]);
        expect(result).toEqual({ type: SET_COLOR, value: COLORS[0]});
    });

    it('should make action task is done', () => {
        const completedTaskId = '1';
        const completed = true;
        const result = actionTaskIsCompleted(completedTaskId,completed);
        expect(result).toEqual({ type: ASYNC_TASK_IS_DONE, completedTaskId, completed});
    });

    it('should make action get data', () => {
        const userId = 1;
        const result = actionGetData(userId);
        expect(result).toEqual({ type: ASYNC_GET_DATA, userId});
    });

    it('should make action delete data', () => {
        const deleteId = '1';
        const result = actionDeleteTask(deleteId);
        expect(result).toEqual({ type: ASYNC_DELETE_TASK, deleteId});
    });
});