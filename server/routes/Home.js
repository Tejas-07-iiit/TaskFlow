const express = require("express");

const router = express.Router();

router.get("/", (_req, res) => {
	res.status(200).json({ message: "Taskflow home route" });
});

module.exports = router;
