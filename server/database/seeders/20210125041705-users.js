'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Tim',
        lastName: 'Nayton',
        email: 'tim@gmail.com',
        password: bcrypt.hashSync('secret', 10),
        gender: 'male'
      },
      {
        firstName: 'Bill',
        lastName: 'Smith',
        email: 'bill@gmail.com',
        password: bcrypt.hashSync('secret1', 10),
        gender: 'male'
      },
      {
        firstName: 'Sarah',
        lastName: 'Nayton',
        email: 'sarah@gmail.com',
        password: bcrypt.hashSync('secret2', 10),
        gender: 'female'
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
