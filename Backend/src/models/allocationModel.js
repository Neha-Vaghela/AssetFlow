const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema(
    {
        assetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },

        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        allocatedDate: {
            type: Date,
            default: Date.now,
        },

        expectedReturnDate: {
            type: Date,
            required: true,
        },

        notes: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Allocated", "Returned"],
            default: "Allocated",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Allocation", allocationSchema);