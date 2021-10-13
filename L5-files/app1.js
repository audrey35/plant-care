const http = require('http'); // require http protocol in node js

const hostname = '192.168.0.21'; // hostname for VirtualBox Ubuntu Server
const port = 3000;

/* define what the server is
request comes from outside the server, so not defined
we define the result: status code, header, content type, output text */
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
