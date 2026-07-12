const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
    {
        assetName: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        assetTag: {
            type: String,
            unique: true,
        },

        serialNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        purchaseDate: {
            type: Date,
            required: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        condition: {
            type: String,
            enum: ["Excellent", "Good", "Fair", "Damaged"],
            default: "Good",
        },

        sharedResource: {
            type: Boolean,
            default: false,
        },

        photo: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Available", "Allocated", "Maintenance", "Lost"],
            default: "Available",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Asset", assetSchema);