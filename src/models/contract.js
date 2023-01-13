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
      },
    );
  }

  static associate(db) {
    db.Contract.belongsTo(db.Profile, { as: 'contractor' });
    db.Contract.belongsTo(db.Profile, { as: 'client' });
    db.Contract.hasMany(db.Job);
  }
}

module.exports = {
  Contract,
  ContractStatus,
};
