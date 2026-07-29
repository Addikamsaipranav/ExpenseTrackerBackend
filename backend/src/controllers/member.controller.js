const memberService = require("../services/member.service");
const Member = require("../models/Member");
const Collection = require("../models/Collection");
const createMember = async (req, res) => {
  try {
    const member = await memberService.createMember(req.body);

    return res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await memberService.getAllMembers();

    return res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    const member = await memberService.getMemberById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const member = await memberService.updateMember(req.params.id, req.body);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await memberService.deleteMember(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPublicMembers = async (req, res) => {

  try {

    const members = await Member.find({
      isActive: true
    });


    const result = [];


    for (const member of members) {


      const collections = await Collection.find({
        member: member._id
      });


      const collected = collections.reduce(
        (sum, item) => sum + item.amount,
        0
      );


      const pending =
        member.expectedContribution - collected;


      const percentage =
        member.expectedContribution > 0
          ? Math.round(
              (collected / member.expectedContribution) * 100
            )
          : 0;



      result.push({

        _id: member._id,

        name: member.fullName,

        phone: member.phone,

        expected: member.expectedContribution,

        collected,

        pending,

        percentage

      });


    }


    return res.status(200).json({

      success: true,

      count: result.length,

      data: result

    });


  } catch(error) {


    return res.status(500).json({

      success:false,

      message:error.message

    });


  }

};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getPublicMembers,

};