const contractService = require('../services/contractService');

const getOneContract = async (req, res) => {
  const { contractId } = req.params;
  const profileId = parseInt(req.get('x-profile_id'), 10);

  if (!contractId) {
    return res.status(404).end();
  }

  const contract = await contractService.getOneContract(contractId);

  if (!contract) {
    return res.status(404).end();
  }

  if ((contract.contractorId !== profileId) && (contract.clientId !== profileId)) {
    return res.status(404).end();
  }

  return res.json(contract);
};

module.exports = {
  getOneContract,
};
