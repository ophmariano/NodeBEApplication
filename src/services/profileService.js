const { Op } = require('sequelize');
const { ApiError, httpStatusCodes } = require('../exceptions/apiExceptions');
const {
  Profile, Job, Contract, sequelize,
} = require('../models');

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

const getBestProfession = async (beginningOfDay, endOfDay) => {
  try {
    const profiles = await Profile.findAll({
      attributes: ['profession',
        [sequelize.fn('sum', sequelize.col('price')), 'totalPayed'],
      ],
      include: [{
        model: Contract,
        as: 'profileContractor',
        required: true,
        include: {
          model: Job,
          as: 'contract',
          required: true,
          where: {
            paid: true,
            paymentDate: {
              [Op.gte]: beginningOfDay,
              [Op.lte]: endOfDay,
            },
          },
        },
      },
      ],
      where: {
        type: 'contractor',
      },
      group: 'profession',
      order: [['totalPayed', 'DESC']],
    });
    return profiles[0];
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

const getBestClient = async (beginningOfDay, endOfDay, limitValue) => {
  Profile.addScope('limited', {
    limit: limitValue,
  });

  // Profile.addScope('limited', {
  //   addLimit(limitValue) {
  //     return {
  //       limit: limitValue,
  //     };
  //   },
  // });
  // [sequelize.fn('CONCAT', [sequelize.col('firstName'), sequelize.col('lastName')]), 'fullName'],
  // when using limit = ApiError: SQLITE_ERROR: no such column: price
  try {
    const profiles = await Profile.scope('limited').findAll({
      attributes: ['firstName', 'lastName',
        [sequelize.fn('sum', sequelize.col('price')), 'totalPayed'],
      ],
      include: [{
        model: Contract,
        as: 'profileClient',
        required: true,
        include: {
          model: Job,
          as: 'contract',
          required: true,
          where: {
            paid: true,
            paymentDate: {
              [Op.gte]: beginningOfDay,
              [Op.lte]: endOfDay,
            },
          },
        },
      },
      ],
      where: {
        type: 'client',
      },
      group: 'id',
      order: [['totalPayed', 'DESC']],
    });
    return profiles[0];
  } catch (error) {
    throw new ApiError(httpStatusCodes.INTERNAL_SERVER, error.message);
  }
};

module.exports = {
  getProfileById,
  depositBalanceForClient,
  getBestProfession,
  getBestClient,
};
