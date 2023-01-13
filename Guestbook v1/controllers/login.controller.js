var fs = require('fs');
var crypto = require('crypto')
function sha256(s) {
    return crypto.createHash('sha256').update(s).digest('base64');
};
module.exports ={
    loginuser(req, res){
        console.log(req.body);
        const readItemdb = fs.readFileSync('./data/userdb.json', {encoding:'utf8'});  
        const db = JSON.parse(readItemdb);
        let object= [];
                        for (let item of db) {
                            if (req.body.username===item.username) {
                                object = item;
                            }
                          };
        let hashpassword = sha256(req.body.password)
        if (hashpassword === object.password) {
        let m={"username":"ziyad","exp":1673633592,"sub": "226857231520-zHDVjexWQc7MgQqZUQYDDdZCzTxkTg","loggedIn": true};
        let n= Buffer.from(JSON.stringify(m));
        let xtoken = n.toString("base64");



            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({username:req.body.username,token:xtoken,islogin:true}));
            res.end();
        }
        else {
            res.writeHead(400, { "Content-Type": "text/html" });
            res.write("incorrect password");
            res.end();
        }

        
  
    },
}