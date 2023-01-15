const express = require('express');

const router = express.Router();
const { getProfile } = require('../../middleware/getProfile');
const contractController = require('../../controllers/contractController');

router.get('/', getProfile, contractController.getAllActiveContracts);
router.get('/:contractId', getProfile, contractController.getOneContract);

module.exports = router;
