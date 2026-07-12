const express = require("express");

const router = express.Router();

const {
    addAsset,
    getAllAssets,
    getSingleAsset,
    updateAsset,
    deleteAsset,
} = require("../controllers/assetController");

router.post("/add", addAsset);

router.get("/", getAllAssets);

router.get("/:id", getSingleAsset);

router.put("/update/:id", updateAsset);

router.delete("/delete/:id", deleteAsset);

module.exports = router;