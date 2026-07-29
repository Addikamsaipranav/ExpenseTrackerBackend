const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },


    category: {
      type: String,
      enum: [
        "Decoration",
        "Food",
        "Sound",
        "Lighting",
        "Pooja",
        "Transportation",
        "Miscellaneous",
      ],
      default: "Miscellaneous",
    },


    amount: {
      type: Number,
      required: true,
      min: 1,
    },


    // NEW FIELD
    status: {
      type: String,
      enum: [
        "Yet to Start",
        "In Progress",
        "Completed"
      ],
      default: "Yet to Start",
    },


    expenseDate: {
      type: Date,
      default: Date.now,
    },

status:{
  type:String,
  enum:[
    "Yet To Start",
    "In Progress",
    "Completed"
  ],
  default:"Yet To Start"
},
    description: {
      type: String,
      default: "",
      trim: true,
    },


    festival: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Festival",
      required: true,
    },


    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

  },
  {
    timestamps: true,
  },
  
);


module.exports = mongoose.model("Expense", expenseSchema);