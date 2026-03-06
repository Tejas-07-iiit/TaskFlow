const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv").config()

app.use(cors())

app.listen(process.env.PORT,()=>{
    console.log("Your Server Is running on port : " , process.env.PORT)
})