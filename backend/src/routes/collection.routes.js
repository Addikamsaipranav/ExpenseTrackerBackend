const express = require("express");

const router = express.Router();

const collectionController = require("../controllers/collection.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create Collection
router.post("/", authMiddleware, collectionController.createCollection);

// Get All Collections
router.get("/", authMiddleware, collectionController.getAllCollections);

// Get Collection By Id
router.get("/:id", authMiddleware, collectionController.getCollectionById);

// Update Collection
router.put("/:id", authMiddleware, collectionController.updateCollection);

// Delete Collection
router.delete("/:id", authMiddleware, collectionController.deleteCollection);

module.exports = router;