const Member = require("../models/Member");

const createMember = async (memberData) => {
  const existingMember = await Member.findOne({
    phone: memberData.phone,
    festival: memberData.festival,
    isActive: true,
  });

  if (existingMember) {
    throw new Error("A member with this phone number already exists for this festival.");
  }

  const member = await Member.create(memberData);

  return member;
};

const getAllMembers = async () => {
  return await Member.find({ isActive: true })
    .populate("festival", "year name")
    .sort({ createdAt: -1 });
};

const getMemberById = async (id) => {
  return await Member.findById(id).populate("festival", "year name");
};

const updateMember = async (id, data) => {
  return await Member.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteMember = async (id) => {
  return await Member.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};