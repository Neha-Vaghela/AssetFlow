const express = require("express");

const router = express.Router();

const {
    allocateAsset,
    getAllAllocations,
    getSingleAllocation,
    returnAsset,
    transferAsset
} = require("../controllers/allocationController");

router.post("/add", allocateAsset);

router.get("/", getAllAllocations);

router.get("/:id", getSingleAllocation);

router.put("/return/:id", returnAsset);

router.put("/transfer/:id", transferAsset);

module.exports = router;