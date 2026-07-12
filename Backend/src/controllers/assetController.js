const Asset = require("../models/assetModel");
const Category = require("../models/categoryModel");


// Add Asset
exports.addAsset = async (req, res) => {
    try {

        const {
            assetName,
            category,
            serialNumber,
            purchaseDate,
            location,
            condition,
            sharedResource,
            photo
        } = req.body;

        if (
            !assetName ||
            !category ||
            !serialNumber ||
            !purchaseDate ||
            !location
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory."
            });
        }

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        const serialExists = await Asset.findOne({ serialNumber });

        if (serialExists) {
            return res.status(400).json({
                success: false,
                message: "Serial Number already exists."
            });
        }

        const totalAssets = await Asset.countDocuments();

        const assetTag = `AF-${String(totalAssets + 1).padStart(4, "0")}`;

        const asset = await Asset.create({
            assetName,
            category,
            assetTag,
            serialNumber,
            purchaseDate,
            location,
            condition,
            sharedResource,
            photo
        });

        res.status(201).json({
            success: true,
            message: "Asset added successfully.",
            asset
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};




// Get All Assets

exports.getAllAssets = async (req, res) => {

    try {

        const assets = await Asset.find().populate("category", "categoryName");

        res.status(200).json({
            success: true,
            total: assets.length,
            assets
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// Get Single Asset

exports.getSingleAsset = async (req, res) => {

    try {

        const asset = await Asset.findById(req.params.id)
            .populate("category", "categoryName");

        if (!asset) {

            return res.status(404).json({
                success: false,
                message: "Asset not found."
            });

        }

        res.status(200).json({
            success: true,
            asset
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// Update Asset

exports.updateAsset = async (req, res) => {

    try {

        const asset = await Asset.findById(req.params.id);

        if (!asset) {

            return res.status(404).json({
                success: false,
                message: "Asset not found."
            });

        }

        const updatedAsset = await Asset.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Asset updated successfully.",
            updatedAsset
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// Delete Asset

exports.deleteAsset = async (req, res) => {

    try {

        const asset = await Asset.findById(req.params.id);

        if (!asset) {

            return res.status(404).json({
                success: false,
                message: "Asset not found."
            });

        }

        await asset.deleteOne();

        res.status(200).json({
            success: true,
            message: "Asset deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};