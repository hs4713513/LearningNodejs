const jwt=require('jsonwebtoken')
const {UnauthenticatedError}=require('../errors/index.js')

const authenticationMiddleware=async (req,res,next)=>{
    const authHeader=req.headers.authorization
    //console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token provided')
    }
    const token=authHeader.split(' ')[1]


    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET) //to decode the token
        const {id,username}=decoded
        //console.log(decoded)
        //console.log(id)
         req.user={id,username}
         next()
        
    }
    catch(error)
    {
        
        throw new UnauthenticatedError("not authorised to access this route")
        //res.send("not authorised")
    }
    //console.log(token)
    // to stop the request responce chain here 
    //we dont pass the control to the next middleware
    // to pass the control to next middleware type next() 
    //res.send("hello chain has been stopped")
    
}
module.exports=authenticationMiddleware