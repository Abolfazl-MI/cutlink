const jwt = require("jsonwebtoken");
const UserModel = require("../models/user_model");
require('dotenv').config()
function authMiddleware(req, res, next) {
  let header = req.headers.Authorization || req.header.authorization;

  if (!header || !header.startWith("Bearer")) {
    return next({ status: 400, message: "unauthorized request" });
  }
  const token = header.split(" ")[1];

  if (!token) {
    return next({ status: 400, message: "unauthorized request" });
  }
  jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
    if(err){
        console.log(err)
        return next({staus:400,message:'Unatuhorized reques'})
    }
    let user=await UserModel.findById(decoded.id)
    req.user=user
    return next()
  })
}


module.exports={
    authMiddleware
}