const express = require("express");

const router = express.Router();

const {
    getAssetDashboard
} = require("../controllers/assetDashboardController");

router.get("/", getAssetDashboard);

module.exports = router;