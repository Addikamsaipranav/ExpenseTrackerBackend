const Collection = require("../models/Collection");
const Expense = require("../models/Expense");
const Member = require("../models/Member");

const getDashboardData = async () => {
  // Total Collection
  const collectionResult = await Collection.aggregate([
    {
      $group: {
        _id: null,
        totalCollection: { $sum: "$amount" },
      },
    },
  ]);

  // Total Expenses
  const expenseResult = await Expense.aggregate([
    {
      $group: {
        _id: null,
        totalExpenses: { $sum: "$amount" },
      },
    },
  ]);

  // Total Members
  const totalMembers = await Member.countDocuments();

  // Latest 5 Expenses
  const recentExpenses = await Expense.find()
    .sort({ expenseDate: -1 })
    .limit(5)
    .select("title category amount expenseDate");

  const totalCollection =
    collectionResult.length > 0
      ? collectionResult[0].totalCollection
      : 0;

  const totalExpenses =
    expenseResult.length > 0
      ? expenseResult[0].totalExpenses
      : 0;

  return {
    summary: {
      totalCollection,
      totalExpenses,
      balance: totalCollection - totalExpenses,
      totalMembers,
    },
    recentExpenses,
  };
};

module.exports = {
  getDashboardData,
};