const express=require('express');//import express
const router=express.Router();//import router for access new route
const User=require("../dbmodels/Userdb")//get userdata form userdb that is coman for all
const { body, validationResult } = require('express-validator');//for set restrictioin use express validator install by npm
const { findOne } = require('../dbmodels/Userdb');
//for hashing password use bcrypt npm
const bcrypt = require("bcryptjs")//import bcrypt
//creating jwt for extra sequrity
const jwt=require('jsonwebtoken');
const JWT_SECRETE="ajdfkadkjda@!";
const fetchuser=require('../middleware/fetchuser');
//router1 :for  create user
{
router.post('/createuser',//endpoint for accesing
[body('name','enter valid name').isLength({ min: 5 }),
body('email','enter valid email').isEmail(), 
body('password','enter valid password').isLength({ min: 5 }),

], //above are restriction applyed to user db in array format
async (req,res)=>{//this is req and res function for our post
 
    const errors = validationResult(req);//it it catches error it send eroor status code
    if (!errors.isEmpty()) {
   
      return res.status(400).json({ errors: errors.array() });}
   let user= await User.findOne({email:req.body.email});//for checking email already exits or not
   if(user)
   {
    return res.status(400).json({error:'sorry user with same email already exixts'});
   }
   try{//creating hash
       const salt=await bcrypt.genSalt(10);
       const secpass=await bcrypt.hash(req.body.password,salt);
   user= await User.create({//this is for creating new user 
        name:req.body.name,
        email:req.body.email,
        password:secpass
      })
    }catch(error)//if error while new user is occure then this run
    {
        res.send(error);
    }

    //   .then(user=>res.json(user)).catch(err=>{console.log(err)
 
    //     res.json({error: 'please enter unique value for email',message:err.message})})
   const data=
    { user:{
      id:user.id
    }

    }
    const jwttoken= jwt.sign(data,JWT_SECRETE);
    res.json({jwttoken});


   
})


}





//Router2 :for loggin user and creating of jwt token
{
 router.post('/login',//endpoint for accesing
[body('password','enter valid name').isLength({ min: 5 }),
body('email','enter valid email').isEmail(), ], //above are restriction applyed to user db in array format
async (req,res)=>{
  const errors = validationResult(req);//it it catches error it send eroor status code
    if (!errors.isEmpty()) {
   
      return res.status(400).json({ errors: "please enter valid email and password1" });}

      const{email,password}=req.body;
      
     const  user=await User.findOne({email});
      if(!user)
      {
        return res.status(400).json({ errors: "please enter valid email and password2" });
      }
      try{
   const isvalid= await bcrypt.compare(password,user.password);
   
  if(!isvalid)
  {
    return res.status(400).json({ errors:"please enter valid email and password3" });
  }

let data=
{
  user:{
    id:user.id
  }
}
const tokendata= jwt.sign(data,JWT_SECRETE);

return res.json({tokendata});}
catch(error)
{
  return res.status(500).json({ errors: "please enter valid email and password" });

}}

)

}

//Router 3: for getdata of user from jwt token by using middleware
router.post('/getuser',fetchuser,async (req,res)=>{
 try{ let userid=req.user.id;
  let user=await User.findById(userid).select("-password")
  res.send(user);
} catch (error) {
  return  res.status(401).send("internal server error");
 }
})

  


module.exports=router;