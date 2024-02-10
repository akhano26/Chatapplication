import mongoose from "mongoose";


const connectToMongoDB=async()=>{

 try{
  
     await mongoose.connect(process.env.MONGO_DB_URL)
     console.log("man chala hun")
     console.log("Mongo DB connected")
 }
 catch (error){
      console.log("Error while connecting: ",error.message)
 }

 }
 export default connectToMongoDB;
