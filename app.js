const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app = new express();
const server = require('http').createServer(app);
const socketIO = require('socket.io')
const port = process.env.PORT || 2134;

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// sockets
module.exports.io = socketIO(server);
require('./sockets/socket')

//Database pool
const pool = require('./database/database.js')

// Server on
server.listen(port, () => {
    console.log('Server on');
})