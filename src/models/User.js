const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER},
    display_name: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'display_name',
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password:{
      allowNull: false,
      type: DataTypes.STRING
    },
    image: DataTypes.STRING,
  });
  User.associate = (mod) => {
    User.hasMany(mod.blog_posts, { foreignKey: 'user_id', as: 'userId' })
  };
  return user;
};


module.exports = User;