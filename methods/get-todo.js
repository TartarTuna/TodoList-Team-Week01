const successHandle = require('../utils/success-handle');

const getTodo = (res, data) => {
  successHandle(res, 200, data);
};

module.exports = getTodo;
