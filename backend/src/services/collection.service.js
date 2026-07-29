const Collection = require("../models/Collection");
const Member = require("../models/Member");

const createCollection = async (collectionData) => {
  // Check if member exists
  const member = await Member.findById(collectionData.member);

  if (!member) {
    throw new Error("Member not found");
  }

  // Create collection entry
  const collection = await Collection.create(collectionData);

  return collection;
};

const getAllCollections = async () => {
  return await Collection.find()
    .populate("member", "fullName phone")
    .populate("festival", "year name")
    .populate("receivedBy", "username fullName")
    .sort({ collectionDate: -1 });
};

const getCollectionById = async (id) => {
  return await Collection.findById(id)
    .populate("member", "fullName phone")
    .populate("festival", "year name")
    .populate("receivedBy", "username fullName");
};

const updateCollection = async (id, data) => {
  return await Collection.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteCollection = async (id) => {
  return await Collection.findByIdAndDelete(id);
};

module.exports = {
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
};