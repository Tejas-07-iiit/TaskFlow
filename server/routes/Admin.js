const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const adminAuth = require("../middleware/admin.middleware");
const adminController = require("../controller/admin.controller");

// Get all users and their tasks (Admin only)
router.get("/admin/users-tasks", auth, adminAuth, adminController.getAllUsersWithTasks);

module.exports = router;
