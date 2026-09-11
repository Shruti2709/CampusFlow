const mongoose = require("mongoose");


const interviewSchema = new mongoose.Schema(
{
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"StudentProfile",
        required:true,
    },


    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true,
    },


    role:{
        type:String,
        required:true,
    },


    date:{
        type:Date,
        required:true,
    },


    time:{
        type:String,
        required:true,
    },


    mode:{
        type:String,
        default:"Online",
    },


    status:{
        type:String,
        default:"Scheduled",
    },


},
{
    timestamps:true,
}
);


module.exports = mongoose.model(
"Interview",
interviewSchema
);