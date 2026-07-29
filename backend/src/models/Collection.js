const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    festival: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Festival",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Bank"],
      default: "Cash",
    },
    collectionDate: {
      type: Date,
      default: Date.now,
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);