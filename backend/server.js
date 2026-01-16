const http=require('http');

const { initSocket } = require('./src/socket');
const app=require("./src/app");
const server=http.createServer(app);
const dbconnect=require("./config/dbconnection");
initSocket(server)
dbconnect();
server.listen(5000,"0.0.0.0",()=>{
    console.log("server is ready http://localhost:5000")
})
//routes