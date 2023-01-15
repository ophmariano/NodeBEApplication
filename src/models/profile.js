const Sequelize = require('sequelize');

const ProfileTypes = {
  client: 'client',
  contractor: 'contractor',
};

class Profile extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        profession: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        balance: {
          type: Sequelize.DECIMAL(12, 2),
        },
        type: {
          type: Sequelize.ENUM(ProfileTypes.client, ProfileTypes.contractor),
        },
      },
      {
        sequelize,
        modelName: 'Profile',
        tableName: 'Profiles',
        timestamps: true,
        paranoid: true,
      },
    );
  }

  static associate(dataBase) {
    dataBase.Profile.hasMany(dataBase.Contract, { as: 'contractor', foreignKey: 'contractorId' });
    dataBase.Profile.hasMany(dataBase.Contract, { as: 'client', foreignKey: 'clientId' });
  }
}

module.exports = {
  Profile,
  ProfileTypes,
};
