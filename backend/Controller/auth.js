const jwt=require('jsonwebtoken');
const bycrpt=require('bcrypt');
const userModel = require('../model/usermodel');
const {getio}=require("../src/socket");

async function signup(req,res)
{

      

         const {username,password,email}=req.body;
      

         if(!username || !password || !email)
         {
           return res.status(400).json({ error: "Missing required fields " });
         }
  
      let veryfie= await userModel.findOne({username});
        if(veryfie)
        {
        
       return res.status(409).json({error:"username Already used"})
        }
    
       let encrptpassword=await bycrpt.hash(password,10);
     
        const user=new userModel({
         username:username, 
         password:encrptpassword,
         email:email,
         type:"user",
         status:"pending",
         date:Date.now()
        })
      
   
     let a= await user.save();
  
     const io=getio();
    //  const data=await userModel.find({},{password:0})
    const users=await userModel.find({},{password:0}).sort({ date: -1 }).limit(5);
    const total=await userModel.find({}).countDocuments({});
    const data={users:users,total:total};
     io.emit("usersdata",data);

    return  res.status(201).json({msg:"signupd succussfully"});

}
async function login(req,res)
{
   const { username, password } = req.body;

   if (!username || !password) {
     return res.status(400).json({ error: "Missing required fields" });
   }
   
   const user = await userModel.findOne({ username });
   
   if (!user) {
     return res.status(401).json({ error: "username invalid" });
   }
   
   const isPasswordValid = await bycrpt.compare(password, user.password);
   
   if (!isPasswordValid) {
     return res.status(401).json({ error: "password invalid" });
   }
   
   const token = jwt.sign(
     { id: user._id, type:user.type,state:user.status},
     "qwerty@123",
     { expiresIn: "1h" }
   );
   
   return res.json({ token });
    
}
module.exports={signup,login};