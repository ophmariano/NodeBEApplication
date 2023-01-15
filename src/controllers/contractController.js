const { httpStatusCodes } = require('../exceptions/apiExceptions');
const contractService = require('../services/contractService');

const getOneContract = async (req, res) => {
  const { contractId } = req.params;
  const profileId = parseInt(req.get('x-profile_id'), 10);

  if (!contractId) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error:
            'The following keys is missing or is empty: \'profile_id\'.',
      },
    });
  }

  const contract = await contractService.getOneContract(contractId);

  if (!contract) {
    return res.status(httpStatusCodes.NOT_FOUND).send({
      status: 'FAILED',
      data: {
        error:
          'The contract was not found.',
      },
    });
  }

  if ((contract.contractorId !== profileId) && (contract.clientId !== profileId)) {
    return res.status(httpStatusCodes.UNAUTHORIZED).send({
      status: 'FAILED',
      data: {
        error:
          'You can only look for your contracts.',
      },
    });
  }

  return res.json(contract);
};

module.exports = {
  getOneContract,
};
