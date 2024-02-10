import Conversation from "../modal/conversation.modal.js";
import Message from "../modal/message.model.js";

export const messagesend=async(req,res)=>{

    try{
  
  const {message}=req.body;
  const {id:receiverId}=req.params;
  console.log("Main hun user Id",req.session.userId)
  const senderId=req.session.userId
 let conversation= await Conversation.findOne({
    participant:{$all:[senderId,receiverId]}
  })

  if(!conversation){
conversation=await Conversation.create({
  participant:[senderId,receiverId]
})
  }

  const newmessage=new Message({
    senderId,
    receiverId,
    message
  })
if(newmessage){
  conversation.messages.push(newmessage.id)
}
// await conversation.save();
// await newmessage.save();
await Promise.all([conversation.save(),newmessage.save()])
res.status(201).json({newmessage})
  }
  catch(error){
    console.log("errro is message controler",error.message)
    res.status(500).json({error:'Internal Server Error'})
  }
}

export const  getUserMessages=async(req,res)=>{
try{

  const {id:usertochatId}=req.params;
  const senderId=req.session.userId;
  const conversation = await Conversation.findOne({
    participant:{$all:[senderId,usertochatId]}
  }).populate('messages')
console.log(conversation)


if(!conversation){return res.status(200).json({error:"No Messages found"})}


  res.status(200).json({conversation})

}
  catch(error){
    console.log("errro is in Get Messages Controller ",error.message)
    res.status(500).json({error:'Internal Server Error'})
  }

}