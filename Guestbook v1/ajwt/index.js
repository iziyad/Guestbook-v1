var crypto = require('crypto');
function sign(data ,scertkey) {
    const header = JSON.stringify({"alg": "HS256","typ": "JWT"});
    const encodedHeaders = Buffer.from(header).toString('base64');
    const Playload = JSON.stringify(data);
    const encodedPlayload = Buffer.from(Playload).toString('base64');
    const signture = crypto.createHmac('sha256', scertkey).update(`${encodedHeaders}.${encodedPlayload}`).digest('base64')
    const token = `${encodedHeaders}.${encodedPlayload}.${signture}`
    return token;
}
function verify(atoken,scertkey){
    let sign = atoken.split(".")[2]
    const signture = crypto.createHmac('sha256', scertkey).update(`${atoken.split(".")[0]}.${atoken.split(".")[1]}`).digest('base64')
    if (sign === signture) {
        return ({verify : true})
    }
    else {
        return ({verify : false})
    }


}
function decode(atoken){
    //console.log(atoken);
    let decode1 = atoken.split(".")[1];
    //console.log(decode1);
    const decodeutf8 = Buffer.from(decode1,'base64').toString();
    //console.log(decodeutf8);
    return decodeutf8
}

module.exports = {decode,sign,verify};