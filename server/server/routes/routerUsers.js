const express = require('express');
const { userController } = require('../controllers'); // {user: 123, tast:2312}
const { userMiddleware } = require('../middleware');


const routerUsers = express.Router();


routerUsers.get('/', userController.getAllUsers);

routerUsers.get('/:userId', userController.getUserById);

routerUsers.post('/authorization', userController.userAuthorization);

routerUsers.post('/create', userMiddleware.userCreateValidation, userController.createUser);

routerUsers.put('/update/:userId', userMiddleware.userUpdateValidation, userController.updateUser);

routerUsers.delete('/delete/:userId', userController.deleteUser);

module.exports = routerUsers;
