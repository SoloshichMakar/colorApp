module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'posts',
    });
  };
  return User;
};
