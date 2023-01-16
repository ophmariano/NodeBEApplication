const { Op } = require('sequelize');
const { ApiError, httpStatusCodes } = require('../exceptions/apiExceptions');
const { Contract, ContractStatus } = require('../models/contract');

const getOneContract = async (id) => {
  try {
    const contract = await Contract.findOne({ where: { id } });
    return contract;
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

const getAllActiveContractsForProfileId = async (profileId) => {
  try {
    const contracts = await Contract.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { status: ContractStatus.new },
              { status: ContractStatus.in_progress },
            ],
          },
          {
            [Op.or]: [
              { contractorId: profileId },
              { clientId: profileId },
            ],
          },
        ],
      },
    });
    return contracts;
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

module.exports = {
  getOneContract,
  getAllActiveContractsForProfileId,
};
