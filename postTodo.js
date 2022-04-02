// const errorHandle = require('./errorHandle');
const { v4: uuidv4 } = require('uuid');
const headers = require('./headers');

function postTodo(res, body, todos, errHandle) {
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
      res.writeHead(201, headers);
      res.write(
        JSON.stringify({
          status: 'success',
          todos,
        }),
      );
      res.end();
    }
  } catch (err) {
    errHandle(res, 400, 'data formart not correct or title is required');
  }
}

module.exports = postTodo;
