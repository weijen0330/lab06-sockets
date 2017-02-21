# lab06-sockets

## Overview
The internet wasn't built to be very dynamic, and historically web pages were just static HTML with links, creating a conceptual web of information. These were done by stateless requests and RESTful API's, but as time went on, static webpages gave way to dynamic content which doesn't work stateless. The internet needed a way to maintain bi-directional, persistant connections between client and server.

## Objectives
* To learn what WebSockets are
* To learn how to network with node.js
* To set up a simple messaging application with a client-server architecture

## Necessary Files
You will need to **fork** and **clone** [this repository](https://github.com/info498e-w17/lab06-sockets) and open the folder in your favorite editor.

## WebSockets
So what are these websocket things anyways?
WebSockets are a bi-directional, full-duplex, persistant connection between a client (web browser) and server. Now, a client can request a socket connection with a server, and it stays open until either party decides to close the connection. With an open socket connection, clients or servers can send data to eachother at any time. This solves the problem of event-driven web programming! Facebook notifications? websockets.

## Networking in node
There are a few different javascript implementations of websockets, like [µWebSockets](https://github.com/uWebSockets/uWebSockets), [ws](https://github.com/websockets/ws) (probably the fastest) or [socket.io](https://github.com/socketio/socket.io), but we will be learning the basics with the standard node api network wrapper.

### Net Module
The net module provides you with an asynchronous network wrapper and allows you to create clients and servers.
Import the net module with `import net = require('net')`

### Node Event Emmiters
Node.js is built around the idea of an asynchronous, event driven architecture where certain types of objects (called "emitters") emit events that cause functions called listeners to be called. Every object that is an instance of the node EventEmmiter class has a method called eventEmmiter.on(), this allows you to listen for specific events and respond accordingly.

#### Node .on()
In order to listen to events you can call .on() to a defined emitter object with parameters like `emitter.on(eventName, listener)` where eventName is a string, and listener is a callback function.

Additionally you can define and listen for custom emmiters like: (outside scope of this excersise)
```
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');

```

## Node Servers
We will start with server.ts, locaed in /src in it you will find some starter code that lays out the basic outline of a node server.
A call to `net.createServer()`, returns a net Server object which is used to create a TCP or local server.

### Server on('connection') Listener
When a client connects to the server, it emmits a 'connection' Event which returns a reference to the socket of the connected client. In order to listen for it pass a a socket to an anonymous function
```
server.on('connection', function(socket){
  // do something with socket here
});
```
### Listening for data on a socket
When data is sent from a client to a server, it sends data to a socket. This is emmitted as a 'data' event on the socket in above anonymous function. You can do something with that data by calling data.toString(), which converts it to a readable string. 

### Server listen()
In order to actually start the server, you need to call `server.listen(<port>)`, passing in a number of the port you want your server to run on.

## Node Clients

