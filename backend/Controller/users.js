const jwt=require('jsonwebtoken');
const userModel = require('../model/usermodel');
const { use } = require('../routes/DeviceRoute');

async function isAllowToDevicess(req,res)
{
 
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token" });
  
    
    try {
      const decoded = jwt.verify(token, "qwerty@123");
     
      const user = await userModel.findById(decoded.id);
  
     if(user.status == 'approved')
      {
        return res.status(200).json({ message: "Access" ,state:user.status});
        
      }else if (!user || user.status !== 'approve')
      {
        return res.status(403).json({ message: "Access denied" ,state:user.status});
      }
            
    } catch(error) {
      res.status(403).json({ message: "Access denied",error:error.message });
    }


}
module.exports={isAllowToDevicess}