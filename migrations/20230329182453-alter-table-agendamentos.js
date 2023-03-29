'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('agendamentos', {
      fields: ['cliente_id'],      //Campo(s) da tabela de origem
      type: 'foreign key',
      name: 'agendamentos_clientes_fk',    //nome da chave estrangeira (deve ser úniuco no BD)
      references: {
        table: 'clientes',        //Tabela estrangeira
        field: 'id'             //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',     //Não deixa apagar um cliente em uso no agendamentos
      onUpdate: 'CASCADE'       //Atualiza cliente_id em clientes se id em clientes mudar
    })

    await queryInterface.addConstraint('agendamentos', {
      fields: ['funcionario_id'],      //Campo(s) da tabela de origem
      type: 'foreign key',
      name: 'agendamentos_funcionarios_fk',    //nome da chave estrangeira (deve ser úniuco no BD)
      references: {
        table: 'funcionarios',        //Tabela estrangeira
        field: 'id'             //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',     //Não deixa apagar um cliente em uso no agendamentos
      onUpdate: 'CASCADE'       //Atualiza funcionario_id em agendamento se id em funcionarios mudar
    })

    await queryInterface.addConstraint('agendamentos', {
      fields: ['servico_id'],      //Campo(s) da tabela de origem
      type: 'foreign key',
      name: 'agendamentos_servicos_fk',    //nome da chave estrangeira (deve ser úniuco no BD)
      references: {
        table: 'servicos',        //Tabela estrangeira
        field: 'id'             //Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',     //Não deixa apagar um cliente em uso no agendamentos
      onUpdate: 'CASCADE'       //Atualiza servico_id em agendamento se id em servico mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('agendamentos', 'agendamentos_servicos_fk')
    await queryInterface.removeConstraint('agendamentos', 'agendamentos_funcionarios_fk')
    await queryInterface.removeConstraint('agendamentos', 'agendamentos_clientes_fk')
  }
};
