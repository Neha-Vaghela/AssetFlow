const mongoose = require("mongoose");


const activitySchema = new mongoose.Schema({

    message:{
        type:String
    }

},{
    timestamps:true
});


module.exports = mongoose.model(
    "ActivityLog",
    activitySchema
);