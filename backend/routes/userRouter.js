const express=require('express')
const userRouter=express.Router();
const user=require('../Controller/users')


userRouter.get("/",user.isAllowToDevicess);

module.exports=userRouter;

