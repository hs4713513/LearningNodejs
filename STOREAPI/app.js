const connectDB=require('./db/connect')
require('dotenv').config()
require('express-async-errors')
//async error

const express=require('express');
const app=express();
const productRouter=require('./routes/product')
const notFoundMiddleware=require('./middleware/notfound')
const errorMiddleware=require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes

app.get('/',(req,res)=>{
    res.send('<h1>store api</h1><a href="/api/v1/products">product route</a>')
})
app.use('/api/v1/products',productRouter)

//products route
app.use(notFoundMiddleware)
app.use(errorMiddleware)
const port=process.env.PORT||3000

const  start=async()=>{
    try{
        //connect db..
        await connectDB(process.env.MONGO_URI)
       app.listen(port,console.log(`Server is listning to ${port}`))
    }catch(err)
    {
        console.log(err)
    }
}
start()


