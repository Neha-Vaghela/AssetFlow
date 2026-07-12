const Asset = require("../models/assetModel");
const Maintenance = require("../models/maintenanceModel");

exports.getAssetDashboard = async (req, res) => {
    try {

        // ==========================
        // Dashboard Cards
        // ==========================

        const totalAssets = await Asset.countDocuments();

        const allocatedAssets = await Asset.countDocuments({
            status: "Allocated",
        });

        const availableAssets = await Asset.countDocuments({
            status: "Available",
        });

        const maintenanceAssets = await Asset.countDocuments({
            status: "Maintenance",
        });

        // ==========================
        // Recent Assets
        // ==========================

        const recentAssets = await Asset.find()
            .populate("category", "categoryName")
            .sort({ createdAt: -1 })
            .limit(5)
            .select("assetName category status");

        // ==========================
        // Pending Requests
        // ==========================

        const pendingRequests = await Maintenance.find({
            status: "Pending",
        })
            .populate("assetId", "assetName")
            .limit(5);

        // ==========================
        // Assets By Category
        // ==========================

        const assetsByCategory = await Asset.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind: "$category",
            },
            {
                $group: {
                    _id: "$category.categoryName",
                    totalAssets: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    totalAssets: -1,
                },
            },
        ]);

        // ==========================
        // Assets Distribution
        // ==========================

        const assetDistribution = {
            available: availableAssets,
            allocated: allocatedAssets,
            maintenance: maintenanceAssets,
        };

        // ==========================
        // Response
        // ==========================

        res.status(200).json({
            success: true,
            message: "Asset Manager Dashboard fetched successfully.",

            cards: {
                totalAssets,
                allocatedAssets,
                availableAssets,
                maintenanceAssets,
            },

            recentAssets,

            assetDistribution,

            pendingRequests,

            assetsByCategory,

            quickActions: [
                {
                    title: "Add Asset",
                    endpoint: "/api/assets/add",
                },
                {
                    title: "Allocate Asset",
                    endpoint: "/api/allocations/add",
                },
                {
                    title: "Create Category",
                    endpoint: "/api/category/add",
                },
                {
                    title: "View Reports",
                    endpoint: "/api/reports",
                },
            ],
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};