import mongoose from "mongoose";

const schema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true  
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Use 'timestamps' instead of 'timestaps'

const Message = mongoose.model('Message', schema);

export default Message;
