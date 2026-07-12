const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({

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
    "Booking",
    bookingSchema
);