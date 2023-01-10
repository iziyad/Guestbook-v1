var http = require('http');
var https = require('https');
var fs = require('fs');
var routes = require('./routes')

//let operation_start = Date.now()/1000;

function requestListener (req, res) {
  routes.Routes(req, res); 
  //console.log("Operation time: " + (Date.now()/1000 - operation_start) + " ms");  
  
};
 

const port = 3300;
const sslport = 8888;          
const hostname = 'localhost';
const options = {
    //key: fs.readFileSync(`/etc/letsencrypt/live/${hostname}/privkey.pem`),
    //cert: fs.readFileSync(`/etc/letsencrypt/live/${hostname}/fullchain.pem`)
    key: fs.readFileSync(`./live/${hostname}/privkey.pem`),
    cert: fs.readFileSync(`./live/${hostname}/fullchain.pem`)    
};
https.createServer(options, requestListener).listen(sslport, hostname, () => {
    console.log(`Server running at https://${hostname}:${sslport}/`)
});
http.createServer(requestListener).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});
