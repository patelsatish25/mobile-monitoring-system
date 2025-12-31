const http=require('http');
const app=require("./src/app");
const { initSocket } = require('./src/socket');
const server=http.createServer(app);
const dbconnect=require("./config/dbconnection");
initSocket(server)
dbconnect();
server.listen(5000,"0.0.0.0",()=>{
    console.log("server is redy http://localhost:5000")
})
