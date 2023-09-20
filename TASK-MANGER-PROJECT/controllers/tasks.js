
const Task=require('../models/task')
const getalltasks= async (req,res)=>{
    try{
    const task=await Task.find({})
    res.status(201).json({task})
    }
    catch(err){
    res.send(`cannot retrieve all documents ${err}`)
    }
}
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
    

module.exports={
    getalltasks,
    createtask,
    gettask,
    updatetask,
    deletetask
}