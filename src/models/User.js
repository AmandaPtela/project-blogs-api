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
  user.associate = (models) => {
    user.hasMany(models.BlogPost)
  };
  return user;
};


module.exports = User;