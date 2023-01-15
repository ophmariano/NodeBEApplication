const { httpStatusCodes } = require('../exceptions/apiExceptions');
const jobService = require('../services/jobService');

const getUnpaidJobs = async (req, res) => {
  const profileId = parseInt(req.get('x-profile_id'), 10);
  const jobs = await jobService.getUnpaidJobs(profileId);
  if (!jobs) {
    return res.status(httpStatusCodes.NOT_FOUND).send({
      status: 'FAILED',
      data: {
        error:
          'No job unpaid was not found.',
      },
    });
  }
  return res.json(jobs);
};

module.exports = {
  getUnpaidJobs,
};
