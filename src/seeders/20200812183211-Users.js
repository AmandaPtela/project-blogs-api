const { DATETIME, TIMESTAMP } = require("mysql2/lib/constants/types");

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        display_name: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
        createdAt: '2023-03-10 12:00:01',
        updatedAt: '2023-03-10 12:00:01',
      },
      {
        id: 2,
        display_name: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        password: '123456',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
        createdAt: '2023-03-10 12:00:01',
        updatedAt: '2023-03-10 12:00:01',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
