import mongoose from "mongoose";


const schema=mongoose.Schema({
  participant:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
messages:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Message'
  }
]
},
{timestamps:true}
);

const Conversation=mongoose.model('Conversation',schema)

export default Conversation