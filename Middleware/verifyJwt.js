const jwt=require('jsonwebtoken');

const verifyJWT=(req,res,next)=>{
   const authHeader= req.headers.authorization||req.headers.Authorization;
   if(!authHeader?.startsWith('Bearer ')){
        return res.sendStatus(401); //token does not exist
    }
    const token =authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decode)=>{
            if(err) return res.sendStatus(403); //token does not exist
            req.role=decode.UserInfo.role;
            next();
    });
}

module.exports=verifyJWT;