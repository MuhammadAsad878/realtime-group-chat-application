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



function getMessagesFromFile(){
  try{
    if(fs.existsSync(filePath)){
      const data = fs.readFileSync(filePath, 'utf-8');
      if(data){
      return JSON.parse(data).sort((a,b)=> a.timeStamp - b.timeStamp);
      }
    }
  }catch(err){
    console.log("Error reading files ", err);
  }
  return null;
}

io.on('connection', async (socket) => {
  console.log(`User with ID : ${socket.id} CONNECTED`);


  let messages = getMessagesFromFile();

  if (!messages.length) {
    messages = await Message.find().sort({ timeStamp: 1 });
  }
    
  io.emit("chatHistory", messages); // Broadcast to all users

  
 
  // Listen for new messages
  socket.on('newMessage', async (data) => {
    console.log("Data to be saved : ",data);
      const message = new Message(data);
      console.log(message, "Before saving");
      await message.save();
      saveMsgToFile(data);
      io.emit('message', data);
  });

  socket.on('disconnect', () => {
      console.log('🔴 A user disconnected');
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
