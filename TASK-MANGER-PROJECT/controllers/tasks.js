
const Task=require('../models/task')
const asyncWrapper=require('../middleware/async')
//using wrapper....in getalltasks
const getalltasks= asyncWrapper(async (req,res,next)=>{
   
    const task=await Task.find({})
    if(!task)
    {
        const error=new Error("not found");
        error.status=404
        return next(err)
    }
    res.status(201).json({status:"succes",data:{task,nbHits:task.lenght}})  
    
})
const createtask= async (req,res)=>{
    try{
    const task=await Task.create(req.body)
    res.status(201).json({task})
    }
    catch(err)
    {
        res.send(err)
    }
}
const gettask= async (req,res)=>{
    try{
        const {id:taskid}=req.params
        const task=await Task.findOne({_id:taskid})
        if(!task)
        {
            return res.status(404).json({msg:"notfound"})
        }
        res.status(201).json({task})
    }
    catch(err)
    {
       res.send(err)
    }
    
}
const updatetask=async (req,res)=>{
    try{
        const {id:taskid}=req.params
        const task=await Task.findOneAndUpdate({_id:taskid},req.body,{new:true,runValidators:true})
        if(!task)
        {
            res.send("not found")
        }
        res.status(200).json({task})
    }
    catch(err)
    {
        res.send(err)
    }
}
const deletetask=async (req,res)=>{
    try{
        const {id:taskid}=req.params
        const task=await Task.findOneAndDelete({_id:taskid})
        res.status(201).json({task})
    }
    catch(err)
    {
          res.send(err)
    }
    
}
const edittask=async (req,res)=>{
    try{
        const {id:taskid}=req.params
        const task=await Task.findOneAndUpdate({_id:taskid},req.body,{new:true,runValidators:true})
        if(!task)
        {
            res.send("not found")
        }
        res.status(200).json({task})
    }
    catch(err)
    {
        res.send(err)
    }
}
    

module.exports={
    getalltasks,
    createtask,
    gettask,
    updatetask,
    deletetask,
    edittask
}