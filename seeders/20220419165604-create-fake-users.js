"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "c5697c5e-9b5c-43df-adaf-f95cf99e0685",
          name: "Jeanndo",
          email: "jeanndo@gmail.com",
          role: "admin",
          createdAt: "2022-04-19T12:57:15.221Z",
          updatedAt: "2022-04-19T12:57:15.221Z",
        },
        {
          uuid: "86151e1f-9757-4605-b67a-4881e74fed85",
          name: "Karera",
          email: "Karera@gmail.com",
          role: "user",
          createdAt: "2022-04-19T13:13:21.742Z",
          updatedAt: "2022-04-19T13:13:21.742Z",
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {})
  },
}
