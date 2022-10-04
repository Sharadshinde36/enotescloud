const jwt=require('jsonwebtoken')
const JWT_SECRETE="ajdfkadkjda@!";


const fetchuser=(req,res,next)=>
{
const token=req.header('auth-token');

if(!token)
{
    res.status(401).json({error:"token is not valid"});
}
const data=jwt.verify(token,JWT_SECRETE);

req.user=data.user;
next();
}

module.exports=fetchuser;
