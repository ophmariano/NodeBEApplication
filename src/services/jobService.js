const { Op } = require('sequelize');
const { ApiError, httpStatusCodes } = require('../exceptions/apiExceptions');
const { Job } = require('../models');

const getUnpaidJobs = async (profileId) => {
  try {
    const contracts = await Job.findAll({

    });
    return contracts;
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

module.exports = {
  getUnpaidJobs,
};
