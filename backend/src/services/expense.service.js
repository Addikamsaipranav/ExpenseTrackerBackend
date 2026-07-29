const Expense = require("../models/Expense");



const createExpense = async (expenseData) => {

  try {

    return await Expense.create(expenseData);

  } catch(error){

    throw error;

  }

};







const getAllExpenses = async () => {

  try {


    return await Expense.find()

      .populate(
        "festival",
        "year name"
      )

      .populate(
        "addedBy",
        "username fullName"
      )

      .sort({
        expenseDate:-1
      });



  } catch(error){

    throw error;

  }

};







const getExpenseById = async (id) => {

  try {


    return await Expense.findById(id)

      .populate(
        "festival",
        "year name"
      )

      .populate(
        "addedBy",
        "username fullName"
      );



  } catch(error){

    throw error;

  }

};








const updateExpense = async (id, data) => {

  try {


    return await Expense.findByIdAndUpdate(

      id,

      data,

      {
        new:true,
        runValidators:true
      }

    );



  } catch(error){

    throw error;

  }

};








const deleteExpense = async (id) => {

  try {


    return await Expense.findByIdAndDelete(id);



  } catch(error){

    throw error;

  }

};







module.exports = {

  createExpense,

  getAllExpenses,

  getExpenseById,

  updateExpense,

  deleteExpense,

};