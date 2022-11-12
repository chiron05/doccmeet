const userRouter = require("./userRouter");
const express=require('express')
const router = express.Router();

router.use(userRouter)

module.exports=router