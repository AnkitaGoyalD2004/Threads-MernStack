import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import Conversation from '../models/conversationModel';
import Message from "../models/messageModel";

const app = express();
const server = http.createServer(app);
const io = new Server(server , {
    cors:{
        origin:"http://localhoast:3000",
        methods:["GET" , "POST"]
    }
});

export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId];
}
const userSocketMap = {} // userId: socketId



io.on('connection' , (socket) =>{
    console.log("user connected " , socket.id)
    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));// [1,2,3,4,5]
    
socket.on("markMessageAsSeen" , async({conversationId,userId}) => {
    try{
await Message.updateMany({conversationId: conversationId , seen : false} , {$set:{seen:true}})
await Conversation.updateOne({_id:conversationId},{$set:{"lastMessage.seen":true}})
io.to(userSocketMap[userId]).emit("messageSeen" , {conversationId}) 
    }catch(error){
        console.log(error);
    }
})

    socket.on("disconect" , () =>{
     console.log("user disconnected")
     delete userSocketMap[userId];
     io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { app, io, server };

