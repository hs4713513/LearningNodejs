//require('./db/connect')
const express=require('express');
const tasks=require('./routes/tasks')
const app=express();
//const connect=require('./db/connect');
const connectdb = require('./db/connect');
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks',tasks)
//routes


const port=3000
const start=async ()=>{
    try{
        await connectdb(process.env.mongo_uri)
        app.listen(port,console.log(`server is listening ${port}...`))

    }catch(error){
        console.log(error)
    }
}
start()


