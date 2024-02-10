import  jwt  from "jsonwebtoken";



const generatejawttoken=(userId,res)=>{
  const token =jwt.sign({userId},process.env.JWT_Secret,{
expiresIn:'15d'
  })

 res.cookie('jwt',token,{
  maxAge:15*24*60*60*1000,
  httpOnly:true,
  sameSite:true,
  secure:process.env.NODE_env !=='development'
 })
}
export default generatejawttoken;