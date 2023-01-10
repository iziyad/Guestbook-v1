var fs = require('fs');
var url = require('url');
var bodyParser = require('./zamodule');
var UserController = require('./controllers/users.controller')
var BookController = require('./controllers/book.controller')
module.exports = {
    Routes(req,res){
        var q = url.parse(req.url, true);
        const myRoute = "/"+q.pathname.split("/")[1];
        var indate = new Date().toISOString().slice(0, 19).replace(/T/g,' , ');
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
        console.log(indate+'  , ' + ip +'  , ' + req.method + ' , ' + myRoute);
        switch (myRoute) {
            case "/gbook":
                if (req.method === "GET") {
                    const uuid = q.pathname.split("/")[2];
                    BookController.readItems(req,res,uuid)
                }
                else if (req.method === "POST") {
                    bodyParser(req,()=>BookController.createItem(req,res))
                    
                    }
                else if (req.method === "PUT") {
                        bodyParser(req,()=>BookController.updateItemById(req,res));      
                    }
                else if (req.method === "DELETE") {
                        bodyParser(req,()=>BookController.deleteItemById(req,res));      
                    }                         
                // If no route present
                else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Route not found" }));
                }
                break;
            case "/users":
                if (req.method === "GET") {
                    const uuid = q.pathname.split("/")[2];
                    UserController.readItems(req,res,uuid)  
                    
                }       
                else if (req.method === "POST") {
                    bodyParser(req,()=>UserController.createItem(req,res));
                    }       
                else if (req.method === "PUT") {
                    bodyParser(req,()=>UserController.updateItemById(req,res));      
                }
                else if (req.method === "DELETE") {
                    bodyParser(req,()=>UserController.deleteItemById(req,res));      
                }                
                else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Route not found" }));
                }
                break;
                
                case "/":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    let html = fs.readFileSync('index.html', {encoding:'utf8'});
                    //set the response
                    res.write(html);
                    //end the response
                    res.end();
                    break;
                
                case "/admingbook":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    let adminhtml = fs.readFileSync('adminGbook.html', {encoding:'utf8'});
                    res.write(adminhtml);
                    res.end();
                    break;    
        
                case "/adminusers":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    let uhtml = fs.readFileSync('adminUsers.html', {encoding:'utf8'});
                    res.write(uhtml);
                    res.end();
                    break;
               case "/output":
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        let output = fs.readFileSync('output.log', {encoding:'utf8'});
                        res.write(output);
                        res.end();
                        break;                         
            default :
            res.writeHead(200, { "Content-Type": "text/html" });
                    res.write("<h1>404 Not Found</h1>");
                    res.end();
                break;
        }
    }
}
