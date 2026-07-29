const express = require("express");

const router = express.Router();

const ApiResponse = require("../utils/apiResponse");

router.get("/", (req, res) => {
    return ApiResponse.success(
        res,
        "Backend is running successfully",
        {
            serverTime: new Date().toISOString(),
            version: "1.0.0"
        }
    );
});

module.exports = router;