const devicemodel=require("../model/devicemodel")
async function addnewdevice({id,name})
{

  

    try {
     

        
     let checkid=await devicemodel.findOne({deviceId:id});
 
    if(!checkid)
    {

          const device=new devicemodel({
          deviceId:id,
          name:name,
          timestamp:Date.now()
        })
   let result=  await   device.save();
     console.log("device store succuflluy",result)
    }else{
        console.log("device are allready store")
    }

     
    } catch (error) {
        console.log(error)
    }
   
}
module.exports={addnewdevice}