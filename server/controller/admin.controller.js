const User = require("../models/user.model");
const Task = require("../models/task.model");

exports.getAllUsersWithTasks = async (req, res) => {
    try {
        // Find all users except the current admin
        const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");

        // For each user, find their tasks
        const usersWithTasks = await Promise.all(users.map(async (user) => {
            const tasks = await Task.find({ user: user._id });
            return {
                ...user._doc,
                tasks
            };
        }));

        res.status(200).json({
            success: true,
            users: usersWithTasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching admin data",
            error: error.message
        });
    }
};
