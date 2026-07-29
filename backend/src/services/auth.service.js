const Admin = require("../models/Admin");
const { generateToken } = require("../utils/jwt");

const login = async (username, password) => {
  const admin = await Admin.findOne({
    username: username.toLowerCase(),
  });

  if (!admin) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  admin.lastLogin = new Date();
  await admin.save();

  const token = generateToken(admin);

  return {
    token,
    admin: {
      id: admin._id,
      username: admin.username,
      fullName: admin.fullName,
      email: admin.email,
    },
  };
};

module.exports = {
  login,
};