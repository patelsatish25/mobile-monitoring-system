const express=require("express")
const path=require('path')
const app=express();
const cors=require("cors");
app.use(cors())
app.use(express.static(path.join(__dirname,"..","public")));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","screen.html"))
})
module.exports=app;
