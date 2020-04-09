import { ITask } from "../types/types";

function* getDataRequest(tasksApi: string, userId: number) {
    const response = yield fetch(tasksApi + "user/" + userId, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const data = yield response.json();
    if (yield response.status === 200) {
        return data;
    }
}

function* addDataRequest(tasksApi: string, newTask: ITask, userId: number) {
    const data = {
        description: newTask.taskColor,
        userId: userId,
        name: newTask.taskText,
    };
    const response = yield fetch(tasksApi, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const receiveData = yield response.json();
    if (yield response.status === 200) {
        return yield receiveData;
    }
}

function* deleteDataRequest(tasksApi: string, deletedTaskId: string) {
    const response = yield fetch(tasksApi + deletedTaskId, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    return yield response.status === 200;
}

function* updateDataRequest(tasksApi: string, completedTaskId: string, completed: boolean) {
    const data = {
        completed: completed,
    };
    const response = yield fetch(tasksApi + completedTaskId, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return yield response.status === 200;
}

function* userValidateRequest(usersApi: string, email: string, password: string) {
    const checkData = {
        email: email,
        password: password,
    };
    const response = yield fetch(usersApi + "authorization", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(checkData),
    });
    if (response.status === 200) {
        const data = yield response.json();
        return data;
    } else {
        throw Error(yield response.json());
    }
}

function* addUserRequest(usersApi: string, email: string, password: string) {
    const data = {
        email: email,
        password: password,
    };
    const response = yield fetch(usersApi + "create", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.status === 200) {
        return true;
    } else {
        const errorData = yield response.json();
        throw Error(errorData.message);
    }
}

export const ApiRequest = {
    getDataRequest,
    addDataRequest,
    deleteDataRequest,
    updateDataRequest,
    userValidateRequest,
    addUserRequest,
};