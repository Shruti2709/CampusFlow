const mongoose = require("mongoose");


const placementDriveSchema = new mongoose.Schema(
  {

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },


    role: {
      type: String,
      required: true,
    },


    package: {
      type: String,
      default: "",
    },


    deadline: {
      type: Date,
      required: true,
    },


    eligibility: {
      cgpa: {
        type: String,
        default: "",
      },

      branches: {
        type: [String],
        default: [],
      },
    },


    registeredStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentProfile",
      }
    ],


    status: {
      type: String,
      default: "Open",
    },


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

  },
  {
    timestamps:true,
  }
);


module.exports = mongoose.model(
  "PlacementDrive",
  placementDriveSchema
);