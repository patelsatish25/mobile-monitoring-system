const {Server}=require("socket.io");
const { addnewdevice } = require("../Controller/device");

function initSocket(server)
{


    const io=new Server(server,{
        cors:'*'
    });

    io.on("connection",(Socket)=>{
           
        console.log("connection socket");
        
       //device id
        Socket.on("device",(device)=>{
           
            addnewdevice(JSON.parse(device))
             console.log(device)
            
        })

         //location
        Socket.on("location",(data)=>{

        })
     
        //video stream
        Socket.on("videostream",(data)=>{
            console.log(data);
        })  
        

        //battery
        Socket.on("battery",(data)=>{
             
        })


        //deviceorientation
        Socket.on("deviceorientation",(data)=>{

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

       
          
        

   
            
       
    })


}
module.exports={initSocket}