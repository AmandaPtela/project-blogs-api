const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  },);
  blogPost.associate = function (models) {
    blogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }
  return blogPost;
};

module.exports = BlogPost;