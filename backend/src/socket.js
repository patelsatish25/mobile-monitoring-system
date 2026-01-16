const {Server}=require("socket.io");
const { addnewdevice } = require("../Controller/device");
const {getusers}=require("../servicess/usersdata");

let io;
const activeDevices = new Map();
function initSocket(server)
{
    
 
     io=new Server(server,{
        cors:'*'
    });

    io.on("connection",async(Socket)=>{
           
        console.log("connection socket");
        
       //device id
        Socket.on("device",(device)=>{
           
            console.log(device)
            if (typeof device === "string") {
              
                 device = JSON.parse(device);
              }
              
         const isNewdevices=  addnewdevice(device);

         Socket.deviceId = device.id;
         
         if (!activeDevices.has(device.id)) {
            activeDevices.set(device.id, {
              deviceId: device.id,
              deviceName: device.name,
              lastSeen: Date.now()
            });
          }   
        
          console.log(device)
          console.log(Array.from(activeDevices.values()))
          Socket.join(device.id);
          
          Socket.emit("divices", Array.from(activeDevices.values()));
          io.emit("divices", Array.from(activeDevices.values()));
          if(isNewdevices)
          {
            
            io.emit("newdevice");
          }

        });

        Socket.on("dashboardjoin",(deviceId)=>{
          Socket.join(deviceId)
        })

         //location
        Socket.on("location",(data)=>{
         
          io.to(data.deviceId).emit('location',data)
        });
     
        //video stream
        Socket.on("videostream",(data)=>{
          io.to(data.deviceId).emit('videostream',data)
        });  
        
        //battery
        Socket.on("battery",(data)=>{
           io.to(data.deviceId).emit("battery",data)
        });

        //deviceorientation
        Socket.on("deviceorientation",(data)=>{
              io.to(data.deviceId).emit('deviceorientation',data)
        });

        //devicemotion
        Socket.on("devicemotion",(data)=>{
          io.to(data.deviceId).emit('devicemotion',data)
        });

        //netinfo
        Socket.on("netinfo",(data)=>{
          io.to(data.deviceId).emit('netinfo',data)
        });
        
        //speedMbps
        Socket.on("speedmbps",(spped)=>{
          io.to(data.deviceId).emit('speedmbps',spped)
        });

        const data=await getusers(); 
        Socket.emit("usersdata",data);
    
        Socket.on("disconnect", () => {

            
            if (Socket.deviceId) {
                activeDevices.delete(Socket.deviceId);
              }
            
            console.log(Array.from(activeDevices.values()))
            io.emit("divices", Array.from(activeDevices.values()));
        });

        io.emit('divices',Array.from(activeDevices.values()));
    });
}

function getio() {
  if (!io) throw new Error("Socket not initialized");
   return io;
}

module.exports={initSocket,getio};
