const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      field: 'user_id',
      references: {
        model: 'blog_posts',
        key: 'id',
      },
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    categoryId: {
      references: {
        model: 'categories',
        key: 'id',
      },
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
      as: 'categories',
      through: 'PostCategory',
      foreignKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'blogPost',
      through: 'PostCategory',
      foreignKey: 'postId',
    });
  return postCategory;
  }
};

module.exports = PostCategory;