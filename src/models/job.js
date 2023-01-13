const Sequelize = require('sequelize');

module.exports = class Job extends Sequelize.Model {
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
      },
    );
  }

  static associate(db) {
    db.Job.belongsTo(db.Contract);
  }
};
