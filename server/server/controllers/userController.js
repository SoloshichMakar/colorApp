const { User: UserController } = require('../models');


module.exports = {

  async getAllUsers(req, res) {
    try {
      const users = await UserController.findAll({});
      res.status(200).json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },

  async getUserById(req, res) {
    try {
      const { userId } = req.params;

      const user = await UserController.findAll({
        where: {
          id: userId,
        },
      });
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

  async userAuthorization(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserController.findOne({
        where: {
          email,
        },
      });
      if (user !== null) {
        if (user.password === password) {
          res.status(200).json(user.id);
        } else {
          res.status(400).json(`Incorrect password for user: ${email}`);
        }
      } else {
        res.status(400).json(`Incorrect username: ${email}`);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

  async createUser(req, res) {
    try {
      const user = await UserController
        .create({
          email: req.body.email,
          password: req.body.password,
        });
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const updateNode = req.body;
      updateNode.updatedAt = '';

      await UserController.update(updateNode, {
        where: {
          id: userId,
        },
      });
      res.status(201).json(await UserController.findAll({
        where: {
          id: userId,
        },
      }));
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const deleteUser = await UserController.findAll({
        where: {
          id: userId,
        },
      });

      await UserController.destroy({
        where: {
          id: userId,
        },
      });
      res.status(200).json(deleteUser);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

};
