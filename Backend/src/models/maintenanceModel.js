const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
    {
        assetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Asset",
            required: true,
        },

        issue: {
            type: String,
            required: true,
            trim: true,
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            required: true,
        },

        photo: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "Resolved"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);