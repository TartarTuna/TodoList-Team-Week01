const headers = require('./headers');

/**
 * 錯誤處理
 * @param {object} res response instance
 * @param {number} statusCode http code
 * @param {*} data 回傳的結果
 */
const successHandle = (res, statusCode = 200, data) => {
  res.writeHead(statusCode, headers);
  if (data) {
    res.write(
      JSON.stringify({
        status: 'success',
        data,
      })
    );
  }
  res.end();
};

module.exports = successHandle;
