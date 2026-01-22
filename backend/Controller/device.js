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
     
     return true;
    }else{
        
        return false;
    }

     
    } catch (error) {
        console.log(error)
    }
   
}

async function getdevice(req, res) {
    const data = await devicemodel.find({});
   
    res.status(200).json({ devices: data });
}
module.exports={addnewdevice,getdevice}