const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running successfully",
        timestamp: new Date()
    });
});

module.exports = router;