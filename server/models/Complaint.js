const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },

    adminRemarks: {
      type: String,
      default: "",
    },

    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
