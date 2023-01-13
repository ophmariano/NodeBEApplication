const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const { getProfile } = require('./middleware/getProfile');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
// app.set('models', sequelize.models);

/**
 * Testing
 * TODO: Remove after
 */
app.get('/', (req, res) => {
  res.send('<h2>Yes, I don\'t know why but it\'s working just fine... for now!</h2>');
});

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id', getProfile, async (req, res) => {
  const { Contract } = req.app.get('models');
  const { id } = req.params;
  const contract = await Contract.findOne({ where: { id } });
  if (!contract) return res.status(404).end();
  return res.json(contract);
});
module.exports = app;
