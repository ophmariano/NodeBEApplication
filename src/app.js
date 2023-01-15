const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const v1ContractRoutes = require('./v1/routes/contractRoutes');
const v1JobRoutes = require('./v1/routes/jobRoutes');
const v1BalanceRoutes = require('./v1/routes/balanceRoutes');

const app = express();

// TODO: check if needed
// app.set('sequelize', sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log('DB connection success.');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json());
app.use('/api/v1/contracts', v1ContractRoutes);
app.use('/api/v1/jobs', v1JobRoutes);
app.use('/api/v1/balances', v1BalanceRoutes);

/**
 * Testing
 * TODO: Remove after
 */
app.get('/', (req, res) => {
  res.send('<h2>Yes, I don\'t know why but it\'s working just fine... for now!</h2>');
});

module.exports = app;
