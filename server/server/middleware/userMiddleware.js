const { User } = require('../models');

function emailValidation(email) {
  const regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(email);
}

function passwordValidation(password) {
  if ((password !== undefined
      && password !== null
      && password !== ''
      && password.length > 5)) {
    return true;
  }
  return false;
}

async function userIsExsist(email) {
  const user = await User.findAll({
    where: {
      email,
    },
  });
  return user.length > 0;
}


module.exports = {
  async userCreateValidation(req, res, next) {
    const { email } = req.body;
    const isUserExists = await userIsExsist(email);
    if (isUserExists) {
      return res.status(400).json({ statusCode: 400, message: `user ${email} already exists` });
    }
    if (emailValidation(email) && passwordValidation(req.body.password)) {
      return next();
    }
    return res.status(400).json({ statusCode: 400, message: 'Invalid query' });
  },


  userUpdateValidation(req, res, next) {
    const { email } = req.body;
    const { password } = req.body;

    if ((emailValidation(email))
            && (passwordValidation(password))) {
      next();
    } else if ((email === undefined)
            && (passwordValidation(password))) {
      next();
    } else if ((emailValidation(email))
            && (password === undefined)) {
      next();
    } else {
      res.status(400).send('Invalid query');
    }
  },
};
