const { Op } = require('sequelize');
const { ApiError, httpStatusCodes } = require('../exceptions/apiExceptions');
const { Job } = require('../models');
const { Contract, ContractStatus } = require('../models/contract');

const getUnpaidJobs = async (profileId) => {
  try {
    const jobs = await Job.findAll({
      include: {
        model: Contract,
        as: 'contract',
        required: true,
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
      },
      where: {
        paid: false,
      },
    });
    return jobs;
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

module.exports = {
  getUnpaidJobs,
};
