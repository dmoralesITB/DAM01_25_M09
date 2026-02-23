const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 //Resuelve el problema de CORS
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
});
