const { ApiError, httpStatusCodes } = require('../exceptions/apiExceptions');
const { Profile, sequelize } = require('../models');

const getProfileById = async (id) => {
  try {
    const profile = await Profile.findOne({ where: { id } });
    return profile;
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

const depositBalanceForClient = async (client, depositAmount) => {
  try {
    await sequelize.transaction(
      async (transaction) => {
        await client.increment('balance', { by: depositAmount, transaction });
      },
    );
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

module.exports = {
  getProfileById,
  depositBalanceForClient,
};
