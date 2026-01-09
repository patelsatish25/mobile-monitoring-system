const {Server}=require("socket.io");
const { addnewdevice } = require("../Controller/device");
const {getusers}=require("../Controller/Admin");
const { emit } = require("./app");
let io;

function initSocket(server)
{


     io=new Server(server,{
        cors:'*'
    });

    io.on("connection",async(Socket)=>{
           
        console.log("connection socket");
        
       //device id
        Socket.on("device",(device)=>{
           
         addnewdevice(device)

             console.log(device)
            
        })

         //location
        Socket.on("location",(data)=>{
             
            console.log(data)
            
        })
     
        //video stream
        Socket.on("videostream",(data)=>{
            console.log(data);
        })  
        

        //battery
        Socket.on("battery",(data)=>{
             console.log(data)
        })


        //deviceorientation
        Socket.on("deviceorientation",(data)=>{
               console.log(data)
        })

        //devicemotion
        Socket.on("devicemotion",(data)=>{
               
        })


        //netinfo
        Socket.on("netinfo",(data)=>{

        })
        

        //speedMbps
        Socket.on("speedmbps",(spped)=>{
                   
        })

      
    
      
       
          
        const data=await getusers(); 
         Socket.emit("usersdata",data);
    
       
    })


}
function getio() {
   if (!io) throw new Error("Socket not initialized");
   return io;
}
module.exports={initSocket,getio}