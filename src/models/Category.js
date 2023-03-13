const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'category',
    timestamps: false,
    underscored: true,
  },);
  return category;
};


module.exports = Category;