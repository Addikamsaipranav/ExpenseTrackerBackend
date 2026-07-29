const express = require("express");

const router = express.Router();

const festivalController = require("../controllers/festival.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create Festival
router.post("/", authMiddleware, festivalController.createFestival);

// Get All Festivals
router.get("/", authMiddleware, festivalController.getAllFestivals);

// Get Festival By Id
router.get("/:id", authMiddleware, festivalController.getFestivalById);

module.exports = router;