const http = require('http');
const url = require('url');

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);

    const pathname = parsedUrl.pathname;
    var trimmedPath = pathname.replace(/^\/+|\/+$/g, '');

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : handlers.notFound;

    const data = {
        path: trimmedPath,
    };

    chosenHandler(data, function(statusCode = 200, payload = {}) {
        // Convert the payload to a string
        var payloadString = JSON.stringify(payload);

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
    })
});

const handlers = {};

handlers.notFound = function(data, callback) {
    callback(404);
};

handlers.hello = function(data, callback) {
    callback(200, 'Hello Friend!');
}

const routes = {
    'hello': handlers.hello
}

server.listen(3000, function(){
    console.log('The server is listening');
});