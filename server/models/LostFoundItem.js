const mongoose = require("mongoose");

const lostFoundItemSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    itemName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Lost", "Found"],
      default: "Lost",
    },

    foundAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LostFoundItem", lostFoundItemSchema);
