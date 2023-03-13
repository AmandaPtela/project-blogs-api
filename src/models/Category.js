const Category = (sequelize, DataTypes) => {
  const categories = sequelize.define('Category', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
  },
  {
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  },);
  return categories;
};

module.exports = Category;