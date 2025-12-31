const express=require("express")
const path=require('path')
const app=express();
const cors=require("cors");
const authRouter=require("../routes/AuthRoute")
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","screen.html"))
})


app.use("/api/userAuth",authRouter);

module.exports=app;
