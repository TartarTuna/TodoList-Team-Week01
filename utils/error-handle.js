const headers = require('./headers');

/**
 * 錯誤處理
 * @param {object} res response instance
 * @param {number} statusCode http code
 * @param {string} message 錯誤提醒文字
 */
const errorHandle = (res, statusCode, message) => {
  res.writeHead(statusCode, headers);
  res.write(
    JSON.stringify({
      status: 'false',
      message,
    })
  );
  res.end();
};

module.exports = errorHandle;
