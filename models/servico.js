'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Servico.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    servico: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    preco: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Servico',
    tableName: 'servicos'
  });
  return Servico;
};