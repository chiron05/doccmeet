require('dotenv/config')

const express=require('express')
const mongoose=require('mongoose');
const { User } = require('./Model/userModel');
const router = require('./Routes/index');
const app=express();
const PORT=process.env.PORT||3001
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(router)



mongoose.connect(process.env.MONGODB_URL_ATLAS,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`Connected successfully to mongoDB`)
}).catch(err=>{
    console.log(err)
    console.log('MongoDB connection failed')
})

app.get('/',(req,res)=>{
   return res.json({
    "message":"Deployed successfully"
    })
})

app.listen(PORT,()=>{
    console.log(`server listening port ${PORT}`)
})