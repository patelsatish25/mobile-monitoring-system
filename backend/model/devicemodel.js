const mongoose=require('mongoose');
const deviceSchema= mongoose.Schema({
    deviceId:String,
    name:String,
    timestamp:Number
})
const devicemodel=mongoose.model("device",deviceSchema);
module.exports=devicemodel;