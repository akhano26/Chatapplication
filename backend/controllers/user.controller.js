import User from "../modal/users.modal.js";

export const getUserForSidebar=async(req,res)=>{
  try{
  const userId=req.session.userId;
  if(!userId) return res.status(200).json({error:'unathorized User Logged-in'}).select("-password")
console.log("Main hi hun",req.session.userId)
  const filterusers=await User.find({_id:{$ne:userId}})

   res.status(200).json(filterusers);

  }
  catch(error){
    console.log("Error in gerUserForSidebar",error.message)
    res.status(500).json({error:'Internal Server Error'})
  }
}