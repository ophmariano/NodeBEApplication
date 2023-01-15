const { Contract } = require('../models');

const getOneContract = async (id) => {
  try {
    const contract = await Contract.findOne({ where: { id } });
    return contract;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOneContract,
};
