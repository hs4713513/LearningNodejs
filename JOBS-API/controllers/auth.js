const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')
const { BadRequestError ,UnauthenticatedError}=require('../errors')
//const bcrypt=require('bcryptjs')
//const mongoose=require("mongoose")
//const jwt =require('jsonwebtoken')
const register=async(req,res)=>{
    
    const user=await User.create({...req.body})
    const token=User.createJWT()
    console.log(user)
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
    
    
    
    
}

const login=async(req,res)=>{
    
       const {email,password}=req.body
       console.log(`Email: ${email}, Password: ${password}`)
        if(!email||!password)
        {
            throw new BadRequestError('please provide email and password')
        }
        const user=await User.findOne({email:"at@gmail.com"})
        //compare
        mongoose.set('debug', true);
        console.log(user)
        if(!user)
        {
            throw new UnauthenticatedError('invalid credentials')
        }
        const token=user.createJWT()
        res.status(StatusCodes.OK).json({user:{name:user.name},token})

    
    
    
}

module.exports={
    register,
    login
}