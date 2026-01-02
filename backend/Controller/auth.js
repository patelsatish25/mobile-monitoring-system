const jwt=require('jsonwebtoken');
const bycrpt=require('bcrypt');
const userModel = require('../model/usermodel');
const {getio}=require("../src/socket");

async function signup(req,res)
{

         const {username,password,email}=req.body;
      

         if(!username || !password || !email)
         {
           return res.status(400).json({ error: "Missing required fields 13" });
         }
  
      let veryfie= await userModel.findOne({username});
        if(veryfie)
        {
        
       return res.status(409).json({error:"username allready used"})
        }
    
       let encrptpassword=await bycrpt.hash(password,10);
     
        const user=new userModel({
         username:username, 
         password:encrptpassword,
         email:email,
         type:"user",
         status:"pending"
        })
      
   
     let a= await user.save();
  
     const io=getio();
     const data=await userModel.find({},{password:0})
     io.emit("usersdata",data);

  return  res.status(201).send(a);

}
async function login(req,res)
{
   const { username, password } = req.body;

   if (!username || !password) {
     return res.status(400).json({ error: "Missing required fields" });
   }
   
   const user = await userModel.findOne({ username });
   
   if (!user) {
     return res.status(401).json({ error: "username and password invalid" });
   }
   
   const isPasswordValid = await bycrpt.compare(password, user.password);
   
   if (!isPasswordValid) {
     return res.status(401).json({ error: "username and password invalid" });
   }
   
   const token = jwt.sign(
     { id: user._id, type:user.type },
     "qwerty@123",
     { expiresIn: "1h" }
   );
   
   return res.json({ token });

  
   
    
}

module.exports={signup,login};