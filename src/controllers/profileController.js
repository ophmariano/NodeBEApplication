const { httpStatusCodes } = require('../exceptions/apiExceptions');
const { profileService, jobService } = require('../services/index');
const { ProfileTypes } = require('../models/profile');

const depositForClientUser = async (req, res) => {
  const maxDepositPercentAllowed = 0.25;
  const profileId = parseInt(req.get('x-profile_id'), 10);
  const clientId = parseInt(req.params.userId, 10);
  const depositAmount = parseInt(req.body.amount, 10);

  const depositor = await profileService.getProfileById(profileId);
  if (depositor.type === ProfileTypes.contractor) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error: 'Only Clients can deposit money.',
      },
    });
  }

  const client = await profileService.getProfileById(clientId);
  if (client.type === ProfileTypes.contractor) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error: 'Can only deposit money on a Client profile.',
      },
    });
  }

  const jobs = await jobService.getClientUnpaidJobs(clientId);

  const initialValue = 0;
  const totalUnpaidJobsAmount = jobs.reduce((sum, { price }) => sum + price, initialValue);
  const maxDepositAllowed = totalUnpaidJobsAmount * maxDepositPercentAllowed;

  if (depositAmount > maxDepositAllowed) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error: `Your deposit is greater than the allowed amount of ${maxDepositPercentAllowed * 100}% of your unpaid jobs. Max deposit allowed: $${maxDepositAllowed}`,
      },
    });
  }
  await profileService.depositBalanceForClient(client, depositAmount);
  const updatedClient = await profileService.getProfileById(clientId);

  return res.json(updatedClient);
};

module.exports = {
  depositForClientUser,
};
