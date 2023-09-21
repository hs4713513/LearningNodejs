const express=require('express')
//hello comment
const router=express.Router()

const{getalltasks,createtask,gettask,updatetask,deletetask,edittask}=require('../controllers/tasks')
router.route('/').get(getalltasks).post(createtask)
router.route('/:id').get(gettask).patch(updatetask).delete(deletetask).put(edittask)


module.exports=router