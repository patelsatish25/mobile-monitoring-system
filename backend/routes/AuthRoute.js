const express=require('express')
const authRouter=express.Router();
const auth=require('../Controller/auth')
authRouter.post("/login",auth.login);
authRouter.post("/signup",auth.signup);
module.exports=authRouter;