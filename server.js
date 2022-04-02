const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errHandle = require('./errorHandle');
const todos = [];
const getTodo = require('./getTodo');
const { deleteOne, deleteAll} = require('./deleteTodo')
const patchTodo = require('./patchTodo');

const requestListener = (req, res)=>{
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    let body = "";
    
    req.on('data', chunk=>{
        body+=chunk;
    })
    
    if(req.url=="/todos" && req.method == "GET"){
        // getTodo.js
        getTodo(res,headers,todos)
    }else if(req.url=="/todos" && req.method == "POST"){
        // postTodo.js
    }else if(req.url=="/todos" && req.method == "DELETE"){
        // deleteTodo.js
        deleteAll(res,todos)
    }else if(req.url.startsWith("/todos/") && req.method=="DELETE"){
        // deleteTodo.js
        deleteOne(res,req,todos)
    }else if(req.url.startsWith("/todos/") && req.method=="PATCH"){
        req.on('end', () => {
          patchTodo(res, req, body, todos);
        });
        //  patchTodo.js
    }else if(req.method == "OPTIONS"){
        res.writeHead(200,headers);
        res.end();
    }else{
        res.writeHead(404,headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }));
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);