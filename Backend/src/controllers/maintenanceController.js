const Maintenance = require("../models/maintenanceModel");
const Asset = require("../models/assetModel");


// Raise Maintenance Request

exports.raiseMaintenance = async (req, res) => {

    try {

        const {
            assetId,
            issue,
            priority,
            photo
        } = req.body;

        if (!assetId || !issue || !priority) {
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

        const maintenance = await Maintenance.create({
            assetId,
            issue,
            priority,
            photo
        });

        res.status(201).json({
            success: true,
            message: "Maintenance request created successfully.",
            maintenance
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// Get All Maintenance Requests

exports.getAllMaintenance = async (req, res) => {

    try {

        const maintenance = await Maintenance.find()
            .populate("assetId", "assetName assetTag");

        res.status(200).json({
            success: true,
            total: maintenance.length,
            maintenance
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// Get Single Maintenance Request

exports.getSingleMaintenance = async (req, res) => {

    try {

        const maintenance = await Maintenance.findById(req.params.id)
            .populate("assetId");

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance request not found."
            });
        }

        res.status(200).json({
            success: true,
            maintenance
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// Approve Maintenance

exports.approveMaintenance = async (req, res) => {

    try {

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance request not found."
            });
        }

        maintenance.status = "Approved";

        await maintenance.save();

        await Asset.findByIdAndUpdate(
            maintenance.assetId,
            {
                status: "Maintenance"
            }
        );

        res.status(200).json({
            success: true,
            message: "Maintenance approved successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// Reject Maintenance

exports.rejectMaintenance = async (req, res) => {

    try {

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance request not found."
            });
        }

        maintenance.status = "Rejected";

        await maintenance.save();

        res.status(200).json({
            success: true,
            message: "Maintenance request rejected."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// Resolve Maintenance

exports.resolveMaintenance = async (req, res) => {

    try {

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance request not found."
            });
        }

        maintenance.status = "Resolved";

        await maintenance.save();

        await Asset.findByIdAndUpdate(
            maintenance.assetId,
            {
                status: "Available"
            }
        );

        res.status(200).json({
            success: true,
            message: "Maintenance resolved successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};