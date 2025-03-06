// MODULES || Libraries 
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { Message,  } from "./models/message.js";
import connectDb from "./database.js";
import http from 'http';
import fs from "fs";

// Server Creation with express, http and WebSocket.io
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors : {
    origin : 'http://localhost:3000',
    methods : ['GET', 'POST'],
    credentials : true,
  }
});

// Middlewares 
app.use(cors());
app.use(express.json());

// Connect DB
connectDb();

const filePath = './messages.json';




io.on('connection', async (socket) => {

  console.log(`User with ID : ${socket.id} CONNECTED`);
  let messages = [];
try{
 messages =  getMessagesFromFile();
  if(messages.length < 20 || null) { 
    // first i applied with only !messages.length but later it causes cutting of data as when it fills again then it can only show those messages however database contains all previous data so i put condition like if messages are < 20 then it can only fetch from db as db is persistent and have more data
    // console.log("Data returning from MongoDB");
    messages = await Message.find().sort({ timeStamp: 1 });
  }
}catch(err) { 
  throw new Error("Some error occured", err); 
}
  io.emit("chatHistory", messages); // Broadcast to all users

  // Listen for new messages
  socket.on('newMessage', async (data) => {
    // console.log("Data to be saved : ",data);
      const message = new Message(data);
      // console.log(message, "Before saving");
      await message.save();
      saveMsgToFile(data);
      io.emit('message', data);
  });

  socket.on('disconnect', () => {
      console.log(`User with ID : ${socket.id} DisConnected`);
  });
});

// app.get('/', (req, res) => {
//   res.send('This is Chat Server!');
// });

const port = 5000;
server.listen(port, () => {
  console.log("Server running on port ", port);
  console.log("Server started on =>",`http://localhost:${port}`);

});


// Implemented function to also save messages in  /messages.json file
function saveMsgToFile(message){
  let messages = [];

  if (fs.existsSync(filePath)) {
      messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log(messages, "Before after file save");
  }
  messages.push(message);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
};

// Implemented function to getMessagesFromFile also
function getMessagesFromFile(){
  try{
    if(fs.existsSync(filePath)){
      const data = fs.readFileSync(filePath, 'utf-8');
      if(data){
      // console.log("Data returning from messages.json");
      return JSON.parse(data).sort((a,b)=> a.timeStamp - b.timeStamp).slice(-100); // showing only 100 recent messages if present
      }
    }
  }catch(err){
    console.log("Error reading files ", err);
  }
  return null;
}
