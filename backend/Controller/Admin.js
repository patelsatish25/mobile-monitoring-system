const userModel = require('../model/usermodel');


async function getusers()
{
 
  
    const users=await userModel.find({},{password:0}).limit(3);
    
      return users;
    
      
}


async function setpermission(req,res)
{
    const id=req.params.id;
    
    await userModel.updateOne({_id:id},{$set:{"status":req.body.status}});
    res.status(200).json({msg:"permssion set"});
}

 async function searchuser(req,res)
  {
    const page=req.params.page;
    let query={};
    if(req.query.status)
    {
        query.status=req.query.status;
    }
   
    const users= await userModel.find(query).skip((page-1)*3).limit(3);
    res.status(200).json({data:users,page:page});
    
}

module.exports={setpermission,getusers,searchuser}