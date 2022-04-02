const http = require('http');
const getTodo = require('./getTodo');
const { deleteOne, deleteAll } = require('./deleteTodo');
const patchTodo = require('./patchTodo');
const postTodo = require('./postTodo');
const errHandle = require('./errorHandle');

const todos = [];

const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json',
  };
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  if (req.url == '/todos' && req.method == 'GET') {
    // getTodo.js
    getTodo(res, headers, todos);
  } else if (req.url == '/todos' && req.method == 'POST') {
    // postTodo.js
    req.on('end', () => {
      postTodo(res, body, todos, errHandle);
    });
  } else if (req.url == '/todos' && req.method == 'DELETE') {
    // deleteTodo.js
    deleteAll(res, todos);
  } else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
    // deleteTodo.js
    deleteOne(res, req, todos, errHandle);
  } else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
    //  patchTodo.js
    req.on('end', () => {
      patchTodo(res, req, body, todos, errHandle);
    });
  } else if (req.method == 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: 'false',
        message: '無此網站路由',
      }),
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
