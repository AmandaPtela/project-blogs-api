const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
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
  },
  {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  },);
  User.associate = (mod) => {
    User.hasMany(mod.blog_posts, { foreignKey: 'user_id', as: 'userId' })
  };
  return user;
};


module.exports = User;