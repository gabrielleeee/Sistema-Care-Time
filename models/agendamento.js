'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agendamento.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dataHora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    servico: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    funcionario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Agendamento',
    tableName: 'agendamentos'
  });
  return Agendamento;
};