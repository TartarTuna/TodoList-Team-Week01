const { v4: uuidv4 } = require('uuid');
const successHandle = require('../utils/success-handle');
const errorHandle = require('../utils/error-handle');

const postTodo = (res, body, todos) => {
  try {
    const data = JSON.parse(body);
    if (!data.title) {
      // title required
      errorHandle(res, 400, 'data formart not correct or title is required');
    } else {
      const todo = {
        id: uuidv4(),
        title: data.title,
      };
      todos.push(todo);
      successHandle(res, 201, todos);
    }
  } catch (err) {
    errorHandle(res, 400, 'data formart not correct or title is required');
  }
};

module.exports = postTodo;
