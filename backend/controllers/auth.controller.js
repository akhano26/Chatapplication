import User from "../modal/users.modal.js";
import bcryptjs from 'bcryptjs';
import generatejawttoken from "../utils/generateToken.js";



export const  signup=async(req,res)=>{
try{
  console.log("war gate")
  console.log(req.body)
  const {name,username,password,conformpassword,gander}=req.body;
console.log(username)
if(password!==conformpassword){
  res.status(400).json({error:"Password doesn't Match"});
}
const user= await User.findOne({username});
if(user){
  res.status(400).json({error:` User name already exits. BSKA ${user}`})
}

const salt=await bcryptjs.genSalt(10);
const hashpassword=await bcryptjs.hash(password,salt);

const boyprofilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`
const girlprofilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`

const newUser=new User({
  fullname:name,
  username:username,
  password:hashpassword,
  gender:gander,
  profilepic:gander==="Male"?boyprofilepic:girlprofilepic,
})
if(newUser){
  generatejawttoken(newUser._id,res)
await newUser.save();
res.status(201).json({
  _id:newUser._id,
  name:newUser.fullname,
  gander:newUser.gender,
  profile:newUser.profilepic
})}
else{
  res.status(201).json({
    error:"There is some error."
  })
}
}
catch(error){
 console.log(error.message)
  res.status(500).json({error:"internal server error"})
}
}



export const  login= async(req,res)=>{
try{
  
const {username,password}=req.body;

const user=await User.findOne({username})
const checkpassword=await bcryptjs.compare(password,user?.password || "")
if(!user || !checkpassword){
  return res.status(400).json({
    error:"Name or Password is incorrect"
  }
    )
}

req.session.userId=user._id;
req.session.cookie.maxAge = 15 * 24 * 60 * 60 * 1000;
console.log(req.session.userId)
res.status(200).json({
 name: user.fullname,
  gander:user.gander,
  profilepis:user.profilepic

})

}
catch(error){
  console.log(error.message)
  res.status(500).json({error:"internal server error"})
}
}
export const logout = (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Session is destroyed, send response
      res.status(200).json({ message: 'You are logged out successfully' });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


