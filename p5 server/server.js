console.log("My program is Running!")

var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static("public"));

// Setup socket
var socket = require("socket.io")
var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log(socket.id)
}

console.log('Server started on port 3000')