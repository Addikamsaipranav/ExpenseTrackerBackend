const express = require("express");

const router = express.Router();

const memberController = require("../controllers/member.controller");
const authMiddleware = require("../middlewares/auth.middleware");


// PUBLIC - Dashboard Members
router.get(
  "/public",
  memberController.getPublicMembers
);


// ADMIN - Create Member
router.post(
  "/",
  authMiddleware,
  memberController.createMember
);


// ADMIN - Get All Members
router.get(
  "/",
  authMiddleware,
  memberController.getAllMembers
);


// ADMIN - Get Member By Id
router.get(
  "/:id",
  authMiddleware,
  memberController.getMemberById
);


// ADMIN - Update Member
router.put(
  "/:id",
  authMiddleware,
  memberController.updateMember
);


// ADMIN - Delete Member
router.delete(
  "/:id",
  authMiddleware,
  memberController.deleteMember
);


module.exports = router;