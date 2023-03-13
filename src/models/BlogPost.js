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
    user_id: {
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
    tableName: 'blogPost',
    timestamps: false,
    underscored: true,
  },);
  return blogPost;
};

module.exports = BlogPost;