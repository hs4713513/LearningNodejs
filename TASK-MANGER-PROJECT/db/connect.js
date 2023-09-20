const mongoose=require('mongoose')

const connectdb=(url)=>{
    return mongoose.connect(url,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true})
}
module.exports=connectdb
// mongoose.connect(connectionstring,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false,
//     useUnifiedTopology:true})
//     .then(()=>console.log('connected to database...'))
//     .catch((err)=>console.log(err))