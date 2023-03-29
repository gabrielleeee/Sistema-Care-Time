'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Agendamento, {
        through: 'agendamentos',     //Tabela intermediária
        foreignKey: 'funcionario_id',         //Chave strangeira da tabela iintermediaria
        otherKey: 'cliente_id',
        otherKey: 'servico_id',
        as: 'agendamento'
      })
    }
  }
    
  Funcionario.init({
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
    dataNascimento: {
      type: DataTypes.DATE
    },
    endereco: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    salario: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    cargo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    administrador: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(20),
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Funcionario',
    tableName: 'funcionarios'
  });
  return Funcionario;
};