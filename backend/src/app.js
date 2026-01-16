const express=require("express")
const path=require('path')
const app=express();
const cors=require("cors");
const authRouter=require("../routes/AuthRoute");
const AdminRoute = require("../routes/AdminRoute");
const deviceRouter = require("../routes/DeviceRoute");
const userRouter = require("../routes/userRouter");

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","screen.html"))
})


app.use("/devices",deviceRouter);
app.use("/api/userAuth",authRouter);
app.use("/api/admin",AdminRoute);
app.use("/users",userRouter)

module.exports=app;


