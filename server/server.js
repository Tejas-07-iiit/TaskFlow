const express = require("express")
const app = express()
const cors = require("cors")
const connect = require("./config/db")

require("dotenv").config()

app.use(express.json())
app.use(cors())

// connect mongodb
connect()

// user register
app.use("/api",require("./routes/Register"))

// user login 
app.use("/api" , require("./routes/Login"))

app.listen(process.env.PORT,()=>{
    console.log("Your Server Is running on port : " , process.env.PORT)
})