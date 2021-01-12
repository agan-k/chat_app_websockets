'use strict';

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
        password: 'secret',
        gender: 'male'
      },
      {
        firstName: 'Bill',
        lastName: 'Smith',
        email: 'bill@gmail.com',
        password: 'secret2',
        gender: 'male'
      },
      {
        firstName: 'Sarah',
        lastName: 'Nayton',
        email: 'sarah@gmail.com',
        password: 'secret3',
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
