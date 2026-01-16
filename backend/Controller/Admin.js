const userModel = require('../model/usermodel');
const mongoose = require('mongoose')
const {getio}=require("../src/socket");



async function setpermission(req,res)
{
    const _id=req.params.id;
    
    console.log("a",req.body)
 let a =await userModel.updateOne(
        { _id: new mongoose.Types.ObjectId(_id) },
        {
          $set: {
            status: req.body.state,
            date: Date.now()
          }
        }
      );
  
    const io=getio()
    console.log(io)
    const users=await userModel.find({},{password:0}).sort({ date: -1 }).limit(5);
    const total=await userModel.find({}).countDocuments({});
    const data={users:users,total:total};
     io.emit("usersdata",data);
    res.status(200).json({msg:a});
   

}

 async function searchuser(req,res)
  {
    const page=req.params.page;
    console.log(req.query)
    let query={};
    if(req.query.status)
    {
        query.status=req.query.status;
    }
   
    const users= await userModel.find(query).sort({ date: -1 }).skip((page-1)*3).limit(5);
    const total=await userModel.find(query).countDocuments({});


    res.status(200).json({users:users,total:total});
    
}

module.exports={setpermission,searchuser}