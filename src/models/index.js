const Sequelize = require('sequelize');
const { Profile } = require('./profile');
const { Contract } = require('./contract');
const { Job } = require('./job');

const dataBase = {};
// TODO: make config file
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

dataBase.sequelize = sequelize;
dataBase.Profile = Profile;
dataBase.Contract = Contract;
dataBase.Job = Job;

dataBase.Profile.init(sequelize);
dataBase.Contract.init(sequelize);
dataBase.Job.init(sequelize);

dataBase.Profile.associate(dataBase);
dataBase.Contract.associate(dataBase);
dataBase.Job.associate(dataBase);

module.exports = dataBase;
