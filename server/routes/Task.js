const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const taskController = require("../controller/task.controller");

// Create Task
router.post("/tasks", auth, taskController.createTask);

// Get All Tasks
router.get("/tasks", auth, taskController.getTasks);

// Update Task
router.put("/tasks/:id", auth, taskController.updateTask);

// Complete Task (Mark as complete and auto-delete)
router.patch("/tasks/:id/complete", auth, taskController.completeTask);

// Delete Task
router.delete("/tasks/:id", auth, taskController.deleteTask);

module.exports = router;
