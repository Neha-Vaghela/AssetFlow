const mongoose = require("mongoose");


const auditSchema = new mongoose.Schema({

    auditName:{
        type:String
    },

    status:{
        type:String
    }

});


module.exports = mongoose.model(
    "Audit",
    auditSchema
);
