const Expense = require("../models/Expense");

const expenseService = require("../services/expense.service");





// CREATE EXPENSE

const createExpense = async (req,res)=>{

try{


const expense =
await expenseService.createExpense({

...req.body,

addedBy:req.admin._id

});



return res.status(201).json({

success:true,

message:"Expense added successfully",

data:expense

});


}
catch(error){


return res.status(400).json({

success:false,

message:error.message

});


}


};









// ADMIN GET ALL EXPENSES

const getAllExpenses = async(req,res)=>{


try{


const expenses =
await expenseService.getAllExpenses();



return res.status(200).json({

success:true,

count:expenses.length,

data:expenses

});


}
catch(error){


return res.status(500).json({

success:false,

message:error.message

});


}


};









// ADMIN GET BY ID

const getExpenseById = async(req,res)=>{


try{


const expense =
await expenseService.getExpenseById(
req.params.id
);



return res.status(200).json({

success:true,

data:expense

});


}
catch(error){


return res.status(500).json({

success:false,

message:error.message

});


}


};









// UPDATE

const updateExpense = async(req,res)=>{


try{


const expense =
await expenseService.updateExpense(

req.params.id,

req.body

);



return res.status(200).json({

success:true,

message:"Expense updated successfully",

data:expense

});


}
catch(error){


return res.status(400).json({

success:false,

message:error.message

});


}


};









// DELETE

const deleteExpense = async(req,res)=>{


try{


await expenseService.deleteExpense(

req.params.id

);



return res.status(200).json({

success:true,

message:"Expense deleted successfully"

});


}
catch(error){


return res.status(400).json({

success:false,

message:error.message

});


}


};









// PUBLIC EXPENSES

const getPublicExpenses = async(req,res)=>{


try{


const expenses =
await expenseService.getAllExpenses();




return res.status(200).json({

success:true,

count:expenses.length,

data:expenses.map(expense=>(

{

_id:expense._id,

title:expense.title,

category:expense.category,

amount:expense.amount,

expenseDate:expense.expenseDate,

description:expense.description,

status:expense.status

}

))


});


}
catch(error){


return res.status(500).json({

success:false,

message:error.message

});


}


};








module.exports={

createExpense,

getAllExpenses,

getExpenseById,

updateExpense,

deleteExpense,

getPublicExpenses

};