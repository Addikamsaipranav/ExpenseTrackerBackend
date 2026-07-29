const Expense = require("../models/Expense");


const expenseService = require("../services/expense.service");


const createExpense = async (req, res) => {
  try {

    const expense = await expenseService.createExpense({
      ...req.body,
      addedBy: req.admin._id,
    });

    res.status(201).json({
      success:true,
      message:"Expense added successfully",
      data:expense
    });

  } catch(error){

    res.status(400).json({
      success:false,
      message:error.message
    });

  }
};
const getAllExpenses = async () => {
  return await Expense.find()
    .populate("festival", "year name")
    .populate("addedBy", "username fullName")
    .sort({ expenseDate: -1 });
};

const getExpenseById = async (id) => {
  return await Expense.findById(id)
    .populate("festival", "year name")
    .populate("addedBy", "username fullName");
};

const updateExpense = async (id, data) => {
  return await Expense.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteExpense = async (id) => {
  return await Expense.findByIdAndDelete(id);
};

const getPublicExpenses = async (req,res)=>{

  try{

    const expenses = await expenseService.getAllExpenses();


    return res.status(200).json({

      success:true,
      count:expenses.length,

      data:expenses.map(expense=>({

        _id:expense._id,
        title:expense.title,
        category:expense.category,
        amount:expense.amount,
        expenseDate:expense.expenseDate,
        description:expense.description,
        status:expense.status

      }))

    });


  }catch(error){

    return res.status(500).json({

      success:false,
      message:error.message

    });

  }

};
module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getPublicExpenses
};