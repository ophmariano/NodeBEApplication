// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require('moment');
const { httpStatusCodes } = require('../exceptions/apiExceptions');
const { profileService } = require('../services/index');

const getBestProfession = async (req, res) => {
  const startDate = new Date(req.query.start);
  const endDate = new Date(req.query.end);

  if (!startDate || !endDate) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error: 'The date send is not valid.',
      },
    });
  }

  const beginningOfDay = moment(startDate, 'YYYY-MM-DD').startOf('day');
  const endOfDay = moment(endDate, 'YYYY-MM-DD').endOf('day');

  const bestProfession = await profileService.getBestProfession(beginningOfDay, endOfDay);

  if (!bestProfession) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error: 'Nothing was yearned during this period.',
      },
    });
  }
  return res.json(bestProfession);
};

const getBestClients = async (req, res) => {
  const defaultLimit = 2;
  const limitValue = parseInt(req.query.limit || defaultLimit, 10);

  const startDate = new Date(req.query.start);
  const endDate = new Date(req.query.end);

  if (!startDate || !endDate) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error: 'The date send is not valid.',
      },
    });
  }

  const beginningOfDay = moment(startDate, 'YYYY-MM-DD').startOf('day');
  const endOfDay = moment(endDate, 'YYYY-MM-DD').endOf('day');

  const bestClients = await profileService.getBestClient(beginningOfDay, endOfDay, limitValue);
  if (!bestClients) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      status: 'FAILED',
      data: {
        error: 'Nothing was paid during this period.',
      },
    });
  }
  return res.json(bestClients);
};

module.exports = {
  getBestProfession,
  getBestClients,
};
