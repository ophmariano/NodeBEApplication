const { ApiError, httpStatusCodes } = require('../exceptions/apiExceptions');
const { Profile } = require('../models');

const getProfileById = async (id) => {
  try {
    const profile = await Profile.findOne({ where: { id } });
    return profile;
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

module.exports = {
  getProfileById,
};
