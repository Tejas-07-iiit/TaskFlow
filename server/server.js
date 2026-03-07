const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connect = require("./config/db")

require("dotenv").config()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// connect mongodb
connect()

// user register
app.use("/api", require("./routes/Register"))

// user login 
app.use("/api", require("./routes/Login"))

// tasks routes
app.use("/api", require("./routes/Task"))

// admin routes
app.use("/api", require("./routes/Admin"))

app.listen(process.env.PORT, () => {
  console.log("Your Server Is running on port : ", process.env.PORT)
})