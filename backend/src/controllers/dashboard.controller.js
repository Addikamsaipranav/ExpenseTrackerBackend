const dashboardService = require("../services/dashboard.service");

const getDashboard = async (req, res) => {
  try {
    const dashboard = await dashboardService.getDashboardData();

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};