import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  user: String,
  username: String,    
  text: String,    
  timeStamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

export {MessageSchema, Message}