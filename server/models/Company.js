const mongoose = require("mongoose");


const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    package: {
      type: String,
      default: "",
    },

    eligibility: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Company",
  companySchema
);