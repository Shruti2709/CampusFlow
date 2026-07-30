const mongoose = require("mongoose");


const studentProfileSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    phone:{
        type:String
    },


    branch:{
        type:String
    },


    cgpa:{
        type:Number
    },


    skills:[
        {
            type:String
        }
    ],


    resume:{
        type:String
    },


    portfolio:{
        type:String
    },


    placementStatus:{
        type:String,
        default:"Not Placed"
    }

},
{
    timestamps:true
}
);


module.exports =
mongoose.model(
"StudentProfile",
studentProfileSchema
);