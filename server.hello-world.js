"use strict";

//setup Dependencies
var WebSocketServer = require('ws').Server
    ,   port = (process.env.port || 8081)
    ,   wsServ = new WebSocketServer({port : port});

wsServ.on('connection', function(socket) {
    // As soon as they connect, let's say hi.
    socket.send('Hello, client!');

    // We can send data as JSON, but remember to turn it into a string first.
    socket.send(JSON.stringify({
        "abc" : 1,
        "dorame" : 2
    }));

    socket.on('message', function(message) {
       console.log("Client says: " + message);
    });

    socket.on('close', function() {
       console.log("Client has gone :c");
    });

    setTimeout(function() {
        try {
            socket.send("Server forced disconnect.");
            socket.close();
        } catch(ex) {
            console.error(ex.message);
        }
    }, 5000);
});

console.log('Listening on ' + port );
