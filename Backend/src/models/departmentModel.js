const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
    {
        departmentName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        departmentHead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        parentDepartment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            default: null,
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Department", departmentSchema);