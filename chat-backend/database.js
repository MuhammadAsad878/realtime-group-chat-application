import mongoose from "mongoose";


export default async function connectDb(){
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
    console.log("DB connection Successfull!");
  }catch(err){
    console.log("Error Occured : ",err);
  }
}