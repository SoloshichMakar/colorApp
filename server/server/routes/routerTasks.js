const express = require('express');
const { taskController } = require('../controllers');
const { taskMiddleware } = require('../middleware');

const routerTasks = express.Router();


routerTasks.get('/', taskController.getAllTasks);

routerTasks.get('/:taskId', taskController.getTaskById);

routerTasks.get('/user/:userId', taskController.getAllTasksOfUser);

routerTasks.post('/', taskMiddleware.taskCreateValidation, taskController.createTask);

routerTasks.put('/:taskId', taskMiddleware.taskUpdateValidation, taskController.updateTask);

routerTasks.delete('/:taskId', taskController.deleteTask);

module.exports = routerTasks;
