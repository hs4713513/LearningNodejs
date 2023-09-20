const mongoose=require('mongoose')


const taskschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],//custom message
        trim:true,
        maxlength:[20,'name cannotmorethan 20 character']

    },
    completed:{
        type:Boolean,
        default:false 
    }
})

module.exports=mongoose.model('task',taskschema)