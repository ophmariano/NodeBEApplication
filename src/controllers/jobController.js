const { httpStatusCodes } = require('../exceptions/apiExceptions');
const { jobService, profileService } = require('../services/index');

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

const payForJob = async (req, res) => {
  const profileId = parseInt(req.get('x-profile_id'), 10);
  const jobId = parseInt(req.params.job_id, 10);
  const client = await profileService.getProfileById(profileId);
  // Validate with PM -> if (client.type !== ProfileTypes.client) return;

  const jobBeingPayed = await jobService.getJobById(jobId);

  if (jobBeingPayed.paid) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error: 'This job has already been paid.',
      },
    });
  }
  const contract = await jobBeingPayed.getContract();
  // Validate with PM -> if(contract.status == ContractStatus.terminated) return;
  if (contract.clientId !== profileId) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error:
          'You can only pay for your contracts.',
      },
    });
  }

  if (client.balance < jobBeingPayed.price) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error: `You do not have balance to pay for this job. Balance: $${client.balance} - Job Price: $${jobBeingPayed.price}`,
      },
    });
  }

  const contractor = await contract.getContractor();
  await jobService.payForJob(client, contractor, jobBeingPayed);
  return res.json(jobBeingPayed);
};

module.exports = {
  getUnpaidJobs,
  payForJob,
};
