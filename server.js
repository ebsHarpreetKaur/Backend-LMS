// to create server
const http = require('http');
const app = require('./app')                // app hosting
const server = http.createServer(app);


server.listen(3000,console.log('app is working'));