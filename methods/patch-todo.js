const successHandle = require('../utils/success-handle');
const errorHandle = require('../utils/error-handle');

const patchTodo = (res, req, body, todos) => {
  const id = req.url.split('/').pop();
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    errorHandle(res, 404, 'no this id');
    return;
  }

  try {
    const title = JSON.parse(body).title;
    if (!title) throw { message: 'no title property' };
    todos[index].title = title;
    successHandle(res, 200, todos);
  } catch (error) {
    errorHandle(res, 404, error.message);
  }
};

module.exports = patchTodo;
