const mongoose = require("mongoose");


const transferSchema = new mongoose.Schema({

    assetName:{
        type:String
    },

    fromDepartment:{
        type:String
    },

    toDepartment:{
        type:String
    },

    status:{
        type:String
    }

});


module.exports = mongoose.model(
    "Transfer",
    transferSchema
);