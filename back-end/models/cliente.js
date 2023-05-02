'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Agendamento, {
        through: 'agendamentos',     //Tabela intermediária
        foreignKey: 'cliente_id',         //Chave strangeira da tabela iintermediaria
        otherKey: 'funcionario_id',
        otherKey: 'servico_id',
        as: 'agendamento'
      })
    }
  }

  
  Cliente.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes'
  });
  return Cliente;
};