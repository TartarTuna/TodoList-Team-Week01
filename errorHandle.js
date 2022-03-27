function errorHandle(res, statusCode, message) {

    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }

    res.writeHead(statusCode, headers)
    res.write(JSON.stringify({
      status: 'false',
      message
    }))
    
    res.end();
}

module.exports = errorHandle;

//使用時 errorHandle(res, 想要回傳的狀態碼, '想要回傳的錯誤提醒文字') 就可以囉~
