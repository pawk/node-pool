const { pid } = process;
const http = require('http');

const port = 8000;

const server = http.createServer((req, res) => {
  req
    .on('data', (data) => console.log('%d got request: %s', pid, data))
    .pipe(res);
});
server.listen(port, () => console.log('%d is listening on %d', pid, port))
