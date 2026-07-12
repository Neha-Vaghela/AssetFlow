const mongoose = require("mongoose");


const returnSchema = new mongoose.Schema({

    assetName:{
        type:String
    },

    employeeName:{
        type:String
    },

    status:{
        type:String
    }

});


module.exports = mongoose.model(
    "Return",
    returnSchema
);