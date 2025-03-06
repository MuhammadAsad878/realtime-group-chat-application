import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { Message, MessageSchema } from "./models/message.js";
import connectDb from "./database.js";
import http from 'http';
import fs from "fs";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors : {
    origin : 'http://localhost:3000',
    methods : ['GET', 'POST'],
    credentials : true,
  }
});


app.use(cors());
app.use(express.json());

connectDb();


function saveMsgToFile(message){
  const filePath = './messages.json';
  let messages = [];

  if (fs.existsSync(filePath)) {
      messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  messages.push(message);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
};


io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  // Load chat history
  Message.find().sort({ timeStamp: 1 }).then(messages => {
    console.log(messages);
      socket.emit('chatHistory', messages);
  });

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