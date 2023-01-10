var fs = require('fs');
var crypto = require('crypto');
module.exports ={
    createItem(req, res){
        req.body.id=crypto.randomBytes(16).toString("hex");
        req.body.date = Date.now();
        req.body.gip = req.socket.remoteAddress;
        const readItemdb = fs.readFileSync('./data/bookdb.json', {encoding:'utf8'});  
        const allItem = JSON.parse(readItemdb);
        
        allItem.push(req.body);
        fs.writeFileSync('./data/bookdb.json', JSON.stringify(allItem));

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Data created");
        res.end();
  
    },
    readItems(req, res, uuid) {
        if (uuid) {
            
            const readbookdb = fs.readFileSync('./data/bookdb.json', {encoding:'utf8'});
                        const db = JSON.parse(readbookdb);
                        let object= [];
                        for (let item of db) {
                            if (uuid===item.id) {
                                object = item;
                            }
                          };
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.write(JSON.stringify(object));
                        res.end();    
        }
        else { 
            const readbookdb = fs.readFileSync('./data/bookdb.json', {encoding:'utf8'});
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(readbookdb);
            res.end();
        }

    },
    updateItemById(req, res){
        const readbookdb = fs.readFileSync('./data/bookdb.json', {encoding:'utf8'});
        const db = JSON.parse(readbookdb);
        db.forEach((item, index) => {
            if (item.id == req.body.id) {
                db[index].name = req.body.name;
                db[index].email = req.body.email;
                db[index].message = req.body.message;

                //db[index].password = req.body.password;message
            }
        });
        fs.writeFileSync('./data/bookdb.json', JSON.stringify(db));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Data updated");
        res.end();

    },
    deleteItemById(req, res){
        const readbookdb = fs.readFileSync('./data/bookdb.json', {encoding:'utf8'});
        let db1 = JSON.parse(readbookdb);
        db1=db1.filter(item=>item.id != req.body.id);
        //console.log(db1);
        fs.writeFileSync('./data/bookdb.json', JSON.stringify(db1));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("MSG DEL");
        res.end();
    }

}
