// import environmental variables from our variables.env file
require('dotenv').config({
    path: 'variables.env'
});

// import all of our models
// require('./models/Store');
// require('./models/User');
// require('./models/Review');

// Start our app!
const url = require('url');
const fs = require('fs');
const path = require('path');
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');
const dir = path.dirname(fs.realpathSync(__filename));

const http = require('http');

let port = process.env.PORT || 7000;

http.createServer(function(request, response) {
    console.log('url: ', request.url);
    if (request.url === "/" || request.url === "/index.html") {
        sendFileContent(response, "index.html", "text/html");
    }
    // else if (request.url === "/") {
    //     response.writeHead(200, { 'Content-Type': 'text/html' });
    //     response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
    // }
    else if (/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/javascript");
    } else if (/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    } else if (/[a-zA-Z0-9\/]*.jpg$/.test(request.url.toString())) {

        sendFileContent(response, request.url.toString().substring(1), "image/jpeg");
    } else {
        console.log("Did not load Requested URL is: " + request.url);
        response.end();
    }
}).listen(port);

function sendFileContent(response, fileName, contentType) {
    console.log(fileName, contentType);
    fileName = `./build/${fileName}`;
    fs.readFile(fileName, function(err, data) {
        console.error(err);
        if (err) {
            response.writeHead(404);
            response.write("Not Found!");
        } else {
            response.writeHead(200, {
                'Content-Type': contentType
            });
            response.write(data);
        }
        response.end();
    });
}

console.log(`Express running → PORT ${port}`);