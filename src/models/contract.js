const Sequelize = require('sequelize');

const ContractStatus = {
  new: 'new',
  in_progress: 'in_progress',
  terminated: 'terminated',
};

class Contract extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        terms: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM(
            ContractStatus.new,
            ContractStatus.in_progress,
            ContractStatus.terminated,
          ),
          defaultValue: ContractStatus.new,
        },
      },
      {
        sequelize,
        modelName: 'Contract',
        tableName: 'Contracts',
      },
    );
  }

  static associate(dataBase) {
    dataBase.Contract.belongsTo(dataBase.Profile, { as: 'contractor' });
    dataBase.Contract.belongsTo(dataBase.Profile, { as: 'client' });
    dataBase.Contract.hasMany(dataBase.Job, { as: 'contract', foreignKey: 'contractId' });
  }
}

module.exports = {
  Contract,
  ContractStatus,
};
