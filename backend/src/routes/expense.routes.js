const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const expenseController = require("../controllers/expense.controller");


// ADMIN - Create Expense
router.post(
  "/",
  authMiddleware,
  expenseController.createExpense
);


// PUBLIC - Get Expenses
router.get(
  "/public",
  expenseController.getPublicExpenses
);


// ADMIN - Get All Expenses
router.get(
  "/",
  authMiddleware,
  expenseController.getAllExpenses
);


// ADMIN - Get By Id
router.get(
  "/:id",
  authMiddleware,
  expenseController.getExpenseById
);


// ADMIN - Update
router.put(
  "/:id",
  authMiddleware,
  expenseController.updateExpense
);


// ADMIN - Delete
router.delete(
  "/:id",
  authMiddleware,
  expenseController.deleteExpense
);


module.exports = router;