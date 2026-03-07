const Task = require("../models/task.model");

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        const task = new Task({
            user: req.user.id,
            title,
            description,
            dueDate
        });

        await task.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating task",
            error: error.message
        });
    }
};

// Get All Tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching tasks",
            error: error.message
        });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user.id },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating task",
            error: error.message
        });
    }
};

// Complete Task (Mark as complete and auto-delete)
exports.completeTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the task first to ensure it exists and belongs to the user
        const task = await Task.findOne({ _id: id, user: req.user.id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // According to new requirement: mark as complete instead of delete
        await Task.findByIdAndUpdate(id, { completed: true });

        res.status(200).json({
            success: true,
            message: "Task marked as complete"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error completing task",
            error: error.message
        });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting task",
            error: error.message
        });
    }
};
