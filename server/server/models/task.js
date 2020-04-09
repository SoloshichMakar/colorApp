module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: 'userId',
    });
  };

  return Task;
};
