const http = require('http');
const getTodo = require('./methods/get-todo');
const postTodo = require('./methods/post-todo');
const patchTodo = require('./methods/patch-todo');
const { deleteOne, deleteAll } = require('./methods/delete-todo');
const successHandle = require('./utils/success-handle');
const errorHandle = require('./utils/error-handle');
const httpMethod = require('./utils/http-method');

const url = '/todos';
const todos = [];

const requestListener = (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  // 取得全部的代辦事項
  if (req.url == url && req.method == httpMethod.GET) {
    getTodo(res, todos);
  }
  // 新增代辦事項
  else if (req.url == url && req.method == httpMethod.POST) {
    req.on('end', () => {
      postTodo(res, body, todos);
    });
  }
  // 刪除全部的代辦事項
  else if (req.url == url && req.method == httpMethod.DELETE) {
    deleteAll(res, todos);
  }
  // 刪除特定的代辦事項
  else if (req.url.startsWith(`${url}/`) && req.method == httpMethod.DELETE) {
    deleteOne(res, req, todos);
  }
  // 更新特定的代辦事項
  else if (req.url.startsWith(`${url}/`) && req.method == httpMethod.PATCH) {
    req.on('end', () => {
      patchTodo(res, req, body, todos);
    });
  }
  // 預檢請求
  else if (req.method == httpMethod.OPTIONS) {
    successHandle(res);
  }
  // 無匹配的路由
  else {
    errorHandle(res, 404, '無此網站路由');
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
