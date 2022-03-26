function getTodo(res, headers, data) {
  res.writeHead(200, headers, data);
  res.write(
    JSON.stringify({
      status: 'success',
      data,
    })
  );
  res.end();
}

module.exports = getTodo;
