var fs = require('fs');
var crypto = require('crypto');
var jwt = require ('../ajwt');

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
        let m={"username":object.username,"exp":1673633592,"sub": object.id,"loggedIn": true};
        let secpass = "kafsZxcKokz";
        let xtoken = jwt.sign(m,secpass);
        //console.log(xtoken);
        let payload = jwt.decode(xtoken);
        //console.log(payload);

        






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