const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const router = express.Router()


router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const normalizedEmail = email.trim().toLowerCase()

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        })


        await user.save()
        
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        console.log("Err in register : ", error.message)
        return res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router