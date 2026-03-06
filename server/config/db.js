const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Data base connected successfully")
        
    } catch (error) {
        console.log("Data Base Connection fails : ", error.message)
        process.exit(1)
    }
}

module.exports = connectDB;