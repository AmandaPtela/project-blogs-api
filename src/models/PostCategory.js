const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
  },
  {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  },);
  postCategory.associate = (models) => {
     models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: 'PostCategory',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: 'PostCategory',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    }); 
  }
  return postCategory;
};

module.exports = PostCategory;