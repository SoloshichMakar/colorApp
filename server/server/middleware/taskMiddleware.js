function taskElementValid(element) {
  if (element !== null && element !== undefined && element !== '') {
    return true;
  }
  return false;
}

function completeValid(completed) {
  if (taskElementValid(completed) && (completed === true || completed === false)) {
    return true;
  }
  return false;
}


module.exports = {

  taskCreateValidation(req, res, next) {
    const { name } = req.body;
    const { description } = req.body;
    const { userId } = req.body;

    if ((taskElementValid(name))
        && (taskElementValid(description))
        && (taskElementValid(userId))) {
      next();
    } else {
      res.status(400).send('Invalid task');
    }
  },

  taskUpdateValidation(req, res, next) {
    const { name } = req.body;
    const { description } = req.body;
    const { completed } = req.body;
    const { userId } = req.body;

    if (((name === undefined || taskElementValid(name))
        && (description === undefined || taskElementValid(description)))
        && (completed === undefined || completeValid(completed))
        && (userId === undefined)) {
      next();
    } else {
      res.status(400).send('Invalid task');
    }
  },


};
