const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

const ProfileTypes = {
  client: 'client',
  contractor: 'contractor',
};

const ContractStatus = {
  new: 'new',
  in_progress: 'in_progress',
  terminated: 'terminated',
};

class Profile extends Sequelize.Model {}
Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    profession: {
      type: Sequelize.STRING,
      allowNull: false
    },
    balance:{
      type:Sequelize.DECIMAL(12,2)
    },
    type: {
      type: Sequelize.ENUM(ProfileTypes.client, ProfileTypes.contractor),
    },
  },
  {
    sequelize,
    modelName: 'Profile'
  }
);

class Contract extends Sequelize.Model {}
Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false
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
    modelName: 'Contract'
  }
);

class Job extends Sequelize.Model {}
Job.init(
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price:{
      type: Sequelize.DECIMAL(12,2),
      allowNull: false
    },
    paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    paymentDate:{
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    modelName: 'Job'
  }
);

Profile.hasMany(Contract, {as :'contractor',foreignKey:'contractorId'})
Contract.belongsTo(Profile, {as: 'contractor'})
Profile.hasMany(Contract, {as : 'client', foreignKey:'clientId'})
Contract.belongsTo(Profile, {as: 'client'})
Contract.hasMany(Job)
Job.belongsTo(Contract)

module.exports = {
  sequelize,
  Profile,
  Contract,
  Job,
  ProfileTypes,
  ContractStatus,
};
