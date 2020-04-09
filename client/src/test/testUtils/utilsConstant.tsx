import {ITask} from "../../store/types/types";
import {COLORS} from "../../utils/Constants";

export const email = 'test@mail.com';
export const password = '123456';

export const tasksTestApi = "http://localhost:4000/tasks/";
export const usersTestApi = "http://localhost:4000/users/";

export const tasks: Array<ITask> = [
    {
        taskColor: COLORS[0],
        taskText: "Test text 1",
        id: "1",
        completed: true,
    },
    {
        taskColor: COLORS[1],
        taskText: "Test text 2",
        id: "2",
        completed: false,
    },
];


export const tasksFromDB: Array<any> = [
    {
        description: COLORS[0],
        name: 'Test text 1',
        id: '1',
        completed: true,
    },
    {
        description: COLORS[1],
        name: 'Test text 2',
        id: '2',
        completed: false,
    },
];


export const task: ITask = {
    taskColor: COLORS[0],
    taskText: 'Test text',
    id: '1',
    completed: false,
};