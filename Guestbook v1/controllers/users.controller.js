var fs = require('fs');
var crypto = require('crypto');
var jwt = require('../ajwt');
function sha256(s) {
    return crypto.createHash('sha256').update(s).digest('base64');
};
module.exports ={
    createItem(req, res){
        req.body.id =crypto.randomBytes(16).toString("hex");
        req.body.date = Date.now();
        req.body.password = sha256(req.body.password);        
        const readItemdb = fs.readFileSync('./data/userdb.json', {encoding:'utf8'});  
        const allItem = JSON.parse(readItemdb);       
        allItem.push(req.body);
        fs.writeFileSync('./data/userdb.json', JSON.stringify(allItem));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Data created");
        res.end();
  
    },
    readItems(req, res, uuid) {
        let secpass = "kafsZxcKokz";

        let a =jwt.verify(req.headers.accesstoken,secpass);
        let token = jwt.sign(a,secpass);


        if (a.verify === true) {
            if (uuid) {
                console.log(uuid);
                
                const readuserdb = fs.readFileSync('./data/userdb.json', {encoding:'utf8'});
                            const db = JSON.parse(readuserdb);
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
                const readuserdb = fs.readFileSync('./data/userdb.json', {encoding:'utf8'});
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(readuserdb);
                res.end();
            }
        } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write("Access Denied");
                res.end();
        }

        
    },

    updateItemById(req, res){
        const readuserdb = fs.readFileSync('./data/userdb.json', {encoding:'utf8'});
        const db = JSON.parse(readuserdb);
        db.forEach((item, index) => {
            if (item.id == req.body.id) {
                db[index].username = req.body.username;
                db[index].email = req.body.email;
                //db[index].password = req.body.password;
            }
        });
        fs.writeFileSync('./data/userdb.json', JSON.stringify(db));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Data updated");
        res.end();

    },
    deleteItemById(req, res){
        const readuserdb = fs.readFileSync('./data/userdb.json', {encoding:'utf8'});
        let db1 = JSON.parse(readuserdb);
        db1=db1.filter(item=>item.id != req.body.id);
        //console.log(db1);
        fs.writeFileSync('./data/userdb.json', JSON.stringify(db1));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("MSG DEL");
        res.end();
        
    }

}
