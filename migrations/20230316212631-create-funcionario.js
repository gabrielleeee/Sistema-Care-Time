'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('funcionarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      dataNascimento: {
        type: Sequelize.DATE
      },
      endereco: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      salario: {
        type: Sequelize.DECIMAL(18,2),
        allowNull: false
      },
      cargo: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      administrador: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      usuario: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING(20),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('funcionarios');
  }
};