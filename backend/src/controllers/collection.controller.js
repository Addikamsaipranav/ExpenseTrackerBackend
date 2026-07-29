const collectionService = require("../services/collection.service");

const createCollection = async (req, res) => {
  try {
    const collection = await collectionService.createCollection({
      ...req.body,
      receivedBy: req.admin._id,
    });

    return res.status(201).json({
      success: true,
      message: "Collection added successfully",
      data: collection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCollections = async (req, res) => {
  try {
    const collections = await collectionService.getAllCollections();

    return res.status(200).json({
      success: true,
      count: collections.length,
      data: collections,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCollectionById = async (req, res) => {
  try {
    const collection = await collectionService.getCollectionById(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: collection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCollection = async (req, res) => {
  try {
    const collection = await collectionService.updateCollection(
      req.params.id,
      req.body
    );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      data: collection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const collection = await collectionService.deleteCollection(req.params.id);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
};