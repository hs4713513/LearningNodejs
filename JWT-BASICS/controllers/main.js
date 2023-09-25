//check username,pasword in post login
//if exist craeate a new jwt
//send back to front-end
//setup authentication so only the requests with jwt can access the dashboard
const jwt=require('jsonwebtoken')
require('dotenv').config()

const BadRequestError=require('../errors')
const login=async(req,res)=>{
    const {username,password}=req.body
    //mongoose validation
    //Joi
    //check in the controller
    if(!username||!password)
    {
        throw new BadRequestError('please provide valid  email and password')
    }
    
    const id=new Date().getDate()
    //console.log(id)
    //try to keep payload small,better experience for user
    const token=jwt.sign({ id,username},process.env.JWT_SECRET,{expiresIn:'30d'})// to create encoded token
   //const decoded=jwt.verify(token,process.env.JWT_SECRET) 
    //console.log(decoded)
    res.status(200).json({msg:"meassage created",token})

    //console.log(username,password)

    
}

const dashboard=async(req,res)=>{
   
      
    const luckyNumber=Math.floor(Math.random()*100)
        res.status(200).json({
            msg:`Hello ${req.user.username}`,
            secret : `your lucky number id is ${luckyNumber}`})//sending res to dashboard
    //console.log(token)
}
module.exports={login,dashboard}