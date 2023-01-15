const { ApiError, httpStatusCodes } = require('../exceptions/apiExceptions');
const { Contract } = require('../models');

const getOneContract = async (id) => {
  try {
    const contract = await Contract.findOne({ where: { id } });
    return contract;
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

module.exports = {
  getOneContract,
};
