const User = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER},
    displayName: {
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  });
  User.associate = (mod) => {
    User.hasMany(mod.blog_posts, { foreignKey: 'user_id', as: 'userId' })
  };
  return user;
};


module.exports = User;