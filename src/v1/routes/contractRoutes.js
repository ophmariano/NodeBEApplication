const express = require('express');

const router = express.Router();
const { getProfile } = require('../../middleware/getProfile');

router.get('/:contractId', getProfile, async (req, res) => {
  const { Contract } = req.app.get('models');
  const { id } = req.params;
  const contract = await Contract.findOne({ where: { id } });
  if (!contract) return res.status(404).end();
  return res.json(contract);
});

module.exports = router;
