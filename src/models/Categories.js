const Categories = (sequelize, DataTypes) => {
  const categories = sequelize.define('Categories', {
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

module.exports = Categories;