const errorhandlermiddleware=(err,req,res,next)=>{
    console.log(err.message)
    return res.status(err.status).json({msg:err})
}
module.exports=errorhandlermiddleware