"use strict";
var net = require("net");
var ip = require("ip");
;
var server = net.createServer();
var clients = [];
server.on('connection', function (socket) {
    function broadcast(message) {
        clients.forEach(function (client) {
            if (client !== socket) {
                client.write('[' + name + '] ' + message + '\n');
            }
        });
    }
    clients.push(socket);
    socket.on('data', function (data) {
        var echo = data.toString().toUpperCase();
        if (echo === 'EXIT') {
            socket.write("Goodbye!");
            socket.end();
        }
        else {
            socket.write("Did you say " + echo + "?");
        }
    });
    socket.on('close', function () {
    });
});
server.on('listening', function () {
    var addr = server.address();
    console.log('server listening on port %d', addr.port);
});
server.listen({
    host: ip.address(),
    port: 3000
});
