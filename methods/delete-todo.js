const successHandle = require('../utils/success-handle');
const errorHandle = require('../utils/error-handle');

const deleteOne = (res, req, todos) => {
  // 1.先取得 url 的  uuid
  const id = req.url.split('/').pop();
  const findIndex = todos.findIndex((el) => el.id === id);

  if (findIndex !== -1) {
    todos.splice(findIndex, 1);
    successHandle(res, 200, todos);
  } else {
    errorHandle(res, 400, 'todo 無此 id，請重新確認。');
  }
};

const deleteAll = (res, todos) => {
  todos.length = 0;
  successHandle(res, 200, todos);
};

module.exports = {
  deleteOne,
  deleteAll,
};
