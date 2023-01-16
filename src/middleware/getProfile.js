const { Profile } = require('../models/index');
const { httpStatusCodes } = require('../exceptions/apiExceptions');

const getProfile = async (req, res, next) => {
  // TODO: make service call
  const profile = await Profile.findOne({ where: { id: req.get('x-profile_id') || 0 } });
  if (!profile) {
    return res.status(httpStatusCodes.UNAUTHORIZED).send({
      status: 'FAILED',
      data: {
        error:
          'The \'x-profile_id\' was not found in our database or is blocked from access the system.',
      },
    });
  }
  req.profile = profile;
  return next();
};

module.exports = { getProfile };
