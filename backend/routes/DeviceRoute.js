const express=require('express')
const deviceRouter=express.Router();
const {getdevice}=require('../Controller/device')


deviceRouter.get('/',getdevice)

module.exports=deviceRouter;