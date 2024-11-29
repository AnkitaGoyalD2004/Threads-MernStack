import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server , {
    cors:{
        origin:"http://localhoast:3000",
        methods:["GET" , "POST"]
    }
});
const userSocketMap = {} // userId: socketId
io.on('connection' , (socket) =>{
    console.log("user connected " , socket.id)
    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));// [1,2,3,4,5]
    
    socket.on("disconect" , () =>{
     console.log("user discponnected")
    })
})

export { app, io, server };

