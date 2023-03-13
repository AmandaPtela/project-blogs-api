const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { 
      primaryKey: true,
      autoIncrement: true,
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
      field: 'userId',
      allowNull: false,
      type: DataTypes.STRING,
    },
    published: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    updated: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'blog_post',
    timestamps: false,
    underscored: true,
  },);
  blogPost.associate = function (models) {
    blogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users'
    })
  }
  return blogPost;
};

module.exports = BlogPost;