const Festival = require("../models/Festival");

const createFestival = async (festivalData) => {
  // Check if a festival already exists for the given year
  const existingFestival = await Festival.findOne({
    year: festivalData.year,
  });

  if (existingFestival) {
    throw new Error(`Festival for year ${festivalData.year} already exists.`);
  }

  const festival = await Festival.create(festivalData);

  return festival;
};

const getAllFestivals = async () => {
  return await Festival.find()
    .populate("createdBy", "username fullName")
    .sort({ year: -1 });
};

const getFestivalById = async (festivalId) => {
  return await Festival.findById(festivalId).populate(
    "createdBy",
    "username fullName"
  );
};

module.exports = {
  createFestival,
  getAllFestivals,
  getFestivalById,
};