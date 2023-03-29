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
      this.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        targetKey: 'id',
        as: 'cliente'
      })
      this.belongsTo(models.Funcionario, {
        foreignKey: 'funcionario_id',
        targetKey: 'id',
        as: 'funcionario'
      })
      this.belongsTo(models.Servico, {
        foreignKey: 'servico_id',
        targetKey: 'id',
        as: 'servico'
      })
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
    servico_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    funcionario_id: {
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