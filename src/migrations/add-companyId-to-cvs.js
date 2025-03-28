module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Cvs", "companyId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Companies",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Cvs", "companyId");
  },
};
