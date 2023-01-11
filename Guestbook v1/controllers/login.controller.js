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
            console.log(hashpassword);                        
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({username:req.body.username,token:"libHREcXqreju91Qm8rzNadJHpR41CGzjlOaYh9pXt0="}));
            res.end();
        }
        else {
            res.writeHead(400, { "Content-Type": "text/html" });
            res.write("incorrect password");
            res.end();
        }

        
  
    },
}