const headers = require('./headers');
// const errorHandle = require('./errorHandle');

function patchTodo(res, req, body, todos, errHandle) {
  const id = req.url.split('/').pop();
  const index = todos.findIndex(item => item.id === id);

  if (index === -1) {
    errorHandle(res, 404, 'no this id');
    return;
  }

  try {
    const title = JSON.parse(body).title;
    if (!title) throw { message: 'no title property' };

    todos[index].title = title;

    res.writeHead(200, headers);
    res.write(JSON.stringify({ status: 'success', data }));
    res.end();
  } catch (error) {
    errHandle(res, 404, error.message);
  }
}

module.exports = patchTodo;