//console.log("harshit")
require('dotenv').config()
require('express-async-errors')
const express=require('express')

const mainRouter=require('./routes/main')
const notFoundMiddlware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')
const app=express()

//middleare

app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1',mainRouter)

app.use(notFoundMiddlware)
app.use(errorHandlerMiddleware)

const port=process.env.PORT||3000

const start=async ()=>{
    try{
     app.listen(port,console.log("server listning to 3000"))
    }
    catch(err)
    {
          console.log(err)
    }
}
start()