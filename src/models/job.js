const Sequelize = require('sequelize');

class Job extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        price: {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: false,
        },
        paid: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        paymentDate: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        modelName: 'Job',
        tableName: 'Jobs',
      },
    );
  }

  static associate(dataBase) {
    dataBase.Job.belongsTo(dataBase.Contract, { as: 'contract' });
  }
}

module.exports = {
  Job,
};
