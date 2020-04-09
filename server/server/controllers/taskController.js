const { Task } = require('../models');


module.exports = {

  async getAllTasksOfUser(req, res) {
    try {
      const { userId } = req.params;

      const tasks = await Task.findAll({
        where: {
          userId,
        },
      });
      res.status(200).json(tasks);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

  async createTask(req, res) {
    try {
      const task = await Task.create({
        name: req.body.name,
        description: req.body.description,
        userId: req.body.userId,
      });

      res.status(200).json(task);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },

  async updateTask(req, res) {
    try {
      const { taskId } = req.params;
      const updateNode = req.body;
      updateNode.updatedAt = '';

      await Task.update(updateNode, {
        where: {
          id: taskId,
        },
      });

      res.status(200).json(await Task.findAll({
        where: {
          id: taskId,
        },
      }));
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },

  async deleteTask(req, res) {
    try {
      const { taskId } = req.params;

      const deletedTask = await Task.findAll({
        where: {
          id: taskId,
        },
      });

      await Task.destroy({
        where: {
          id: taskId,
        },
      });
      res.status(200).json(deletedTask);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },

  async getAllTasks(req, res) {
    try {
      const tasks = await Task.findAll({});
      res.status(200).send(tasks);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

  async getTaskById(req, res) {
    try {
      const { taskId } = req.params;

      const tasks = await Task.findAll({
        where: {
          id: taskId,
        },
      });
      res.status(200).json(tasks);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

};
