const festivalService = require("../services/festival.service");

const createFestival = async (req, res) => {
  try {
    const festivalData = {
      ...req.body,
      createdBy: req.admin._id,
    };

    const festival = await festivalService.createFestival(festivalData);

    return res.status(201).json({
      success: true,
      message: "Festival created successfully",
      data: festival,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllFestivals = async (req, res) => {
  try {
    const festivals = await festivalService.getAllFestivals();

    return res.status(200).json({
      success: true,
      count: festivals.length,
      data: festivals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFestivalById = async (req, res) => {
  try {
    const festival = await festivalService.getFestivalById(req.params.id);

    if (!festival) {
      return res.status(404).json({
        success: false,
        message: "Festival not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: festival,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFestival,
  getAllFestivals,
  getFestivalById,
};