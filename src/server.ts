import net = require('net');//import socket module
import ip = require('ip');

// define address interface
interface Address { port: number; family: string; address: string; };

// create socket server
let server:net.Server = net.createServer();
let clients: net.Socket[] = [];
// when the server is connected
server.on('connection', function(socket:net.Socket){
    function broadcast(message:string) {
        clients.forEach(function(client:net.Socket) {
            if (client !== socket) {
                client.write('[' + name + '] ' + message + '\n');
            }
        });
    }

    clients.push(socket);

    // when data is sent to the socket
    socket.on('data', function(data){
        //process data
        var echo = data.toString().toUpperCase();

        if(echo === 'EXIT') {
            socket.write("Goodbye!");
            socket.end();
        } else {
            socket.write("Did you say " + echo + "?");
        }
    });

    socket.on('close', function(){
        // handle client disconnecting
    })


});

//when the server starts listening...
server.on('listening', function() {
    //output to the console the port number on which we are listening
    var addr:Address = server.address();
    console.log('server listening on port %d', addr.port);
});

//start the server
server.listen({
  host: ip.address(),
  port: 3000
});

