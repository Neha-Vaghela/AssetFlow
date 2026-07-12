const Allocation = require("../models/allocationModel");
const Asset = require("../models/assetModel");
const Employee = require("../models/employeeModel");

// Allocate Asset

exports.allocateAsset = async (req, res) => {

    try {

        const {
            assetId,
            employeeId,
            expectedReturnDate,
            notes
        } = req.body;

        if (!assetId || !employeeId || !expectedReturnDate) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory."
            });
        }

        const asset = await Asset.findById(assetId);

        if (!asset) {
            return res.status(404).json({
                success: false,
                message: "Asset not found."
            });
        }

        if (asset.status !== "Available") {
            return res.status(400).json({
                success: false,
                message: "Asset is not available."
            });
        }

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        const allocation = await Allocation.create({
            assetId,
            employeeId,
            expectedReturnDate,
            notes
        });

        asset.status = "Allocated";
        await asset.save();

        res.status(201).json({
            success: true,
            message: "Asset allocated successfully.",
            allocation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get All Allocations

exports.getAllAllocations = async (req, res) => {

    try {

        const allocations = await Allocation.find()
            .populate("assetId", "assetName assetTag")
            .populate("employeeId", "name email");

        res.status(200).json({
            success: true,
            total: allocations.length,
            allocations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get Single Allocation

exports.getSingleAllocation = async (req, res) => {

    try {

        const allocation = await Allocation.findById(req.params.id)
            .populate("assetId")
            .populate("employeeId");

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found."
            });
        }

        res.status(200).json({
            success: true,
            allocation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Return Asset

exports.returnAsset = async (req, res) => {

    try {

        const allocation = await Allocation.findById(req.params.id);

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found."
            });
        }

        allocation.status = "Returned";
        await allocation.save();

        await Asset.findByIdAndUpdate(
            allocation.assetId,
            {
                status: "Available"
            }
        );

        res.status(200).json({
            success: true,
            message: "Asset returned successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Transfer Asset

exports.transferAsset = async (req, res) => {

    try {

        const {
            employeeId,
            notes
        } = req.body;

        const allocation = await Allocation.findById(req.params.id);

        if (!allocation) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found."
            });
        }

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });
        }

        allocation.employeeId = employeeId;

        if (notes) {
            allocation.notes = notes;
        }

        await allocation.save();

        res.status(200).json({
            success: true,
            message: "Asset transferred successfully.",
            allocation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};