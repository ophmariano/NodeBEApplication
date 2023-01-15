const { Op } = require('sequelize');
const { ApiError, httpStatusCodes } = require('../exceptions/apiExceptions');
const { Job, sequelize } = require('../models');
const { Contract, ContractStatus } = require('../models/contract');

const getJobById = async (id) => {
  try {
    const job = await Job.findOne({ where: { id } });
    return job;
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

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

const payForJob = async (client, contractor, jobBeingPayed) => {
  try {
    await sequelize.transaction(
      async (transaction) => {
        await client.decrement('balance', { by: jobBeingPayed.price, transaction });
        await contractor.increment('balance', { by: jobBeingPayed.price, transaction });
        await jobBeingPayed.update({
          paid: true,
        }, {
          where: { id: jobBeingPayed.id }, transaction,
        });
      },
    );
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};
module.exports = {
  getJobById,
  getUnpaidJobs,
  payForJob,
};
