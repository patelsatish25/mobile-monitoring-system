const {Server}=require("socket.io");
const { addnewdevice } = require("../Controller/device");
const {getusers}=require("../servicess/usersdata");
const { instrument } = require("@socket.io/admin-ui");


let io;
const activeDevices = new Map();
function initSocket(server)
{
    
 
     io=new Server(server,{
      cors: {

        origin: "*",
    credentials: true
      },
        connectionStateRecovery:{
        maxDisconnectionDuration:1000*60*2,
        skipMiddlewares:true,
       
          
        }
         ,
        pingInterval:10000,
        pingTimeout:5000
    }

  
  );
  

  instrument(io,{
    auth:false,
    mode: "development",
  })

    io.on("connection",async(Socket)=>{
           
        console.log("connection socket");
        
        if(Socket.recovered)
        {
            
          console.log("recoverd")

               
        }else{
          console.log("not recoverd");
        }
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
        
         
         
          Socket.join(device.id);
          
          Socket.emit("divices", Array.from(activeDevices.values()));
          io.emit("divices", Array.from(activeDevices.values()));
          if(isNewdevices)
          {
            
            io.emit("newdevice");
          }

        });
    
        
        Socket.on("dashboardjoin", (data) => {
          Socket.join(data.deviceID);
         
        });

        // location
        Socket.on("location",(data)=>{
         
      
        
          io.to(data.deviceID).emit('location',data)
        });
     
        //battery
        Socket.on("battery",(data)=>{
       
           io.to(data.id).emit("battery",data)
        });
 

        //video stream
        Socket.on("videoframe",(data)=>{
         
          io.to(data.id).emit('v',data)
        });  
        
        

        //deviceorientation
        Socket.on("deviceorientation",(data)=>{
              io.to(data.id).emit('deviceorientation',data)
        });

        //devicemotion
        Socket.on("devicemotion",(data)=>{
         
          io.to(data.id).emit('devicemotion',data)
        });

        //netinfo
        Socket.on("netinfo",(data)=>{
        
          io.to(data.id).emit('n',data)
        });
        
        //speedMbps
        Socket.on("speed",(spped)=>{
         
          io.to(spped.id).emit('s',spped)
        });

        const data=await getusers(); 
        Socket.emit("usersdata",data);
    
        Socket.on("disconnect", () => {

            
            if (Socket.deviceId) {
                activeDevices.delete(Socket.deviceId);
              }
            
           
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
