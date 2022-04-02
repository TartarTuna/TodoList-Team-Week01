// const errHandle = require('./errorHandle');

const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
}

const deleteOne = (res ,req, todos, errHandle)=>{
    // 1.先取得 url 的  uuid 
    let id = req.url.split('/').pop()
    let findIndex = todos.findIndex(el => el.id === id)
    
    if(findIndex !== -1){
        todos.splice(findIndex,1)
        res.writeHead(200,headers)
        res.write(JSON.stringify({
            status: 'success',
            data: todos
        }))
        res.end()
    }else{
        errHandle(res,400,'todo 無此 id，請重新確認。')
    }
}

const deleteAll = (res, todos)=>{
    todos.length = 0
    res.writeHead(200,headers)
    res.write(JSON.stringify({
        status:'success',
        data : todos
    }))
    res.end()
}


module.exports = {
    deleteOne,
    deleteAll
 };