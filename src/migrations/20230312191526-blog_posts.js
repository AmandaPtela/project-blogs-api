'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', { 
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type:Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      published: {
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP()'),
        type: Sequelize.DATE,
      },
      updated: {
        // defaultValue:Sequelize.literal('CURRENT_TIMESTAMP()'),
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};
