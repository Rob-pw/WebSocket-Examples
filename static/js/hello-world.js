/* Author: Robert White (Rob PW)
*/

var HelloWorld = (function() {
    var socket = new WebSocket('ws://localhost:8081')
        , print = function(toPrint, level) {
          /* Simple function which both logs, and writes onto the page */
          console[level || "log"](toPrint);
          document.getElementsByTagName('pre')[0].innerText += toPrint + "\n";
        };

    var me = {
        name : "Robert White",
        alias : "Rob PW",
        website : "rob.pw",
        age : 18,
        email : "me@rob.pw"
    };

    socket.onopen = function() {
        // As soon as we connect, let's say hi.
        socket.send("Hello, server!");
        socket.send(JSON.stringify(me));
    };

    socket.onmessage = function(e) {
        print(e.data || "The server didn't say anything - spooky.");
    };

    socket.onerror = function(error) {
        print(error, "error");
    };

    socket.onclose = function(code, data) {
        print("Goodbye!\n You have now disconnected.");
    };

})();

