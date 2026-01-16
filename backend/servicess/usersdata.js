const userModel = require('../model/usermodel');
async function getusers()
{
 
  
    const users=await userModel.find({},{password:0}).sort({ date: -1 }).limit(5);
    const total=await userModel.find({}).countDocuments({});
    const data={users:users,total:total};
    return data;
    
      
}

module.exports={getusers}