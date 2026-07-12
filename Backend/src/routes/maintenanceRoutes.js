const express = require("express");

const router = express.Router();

const {

    raiseMaintenance,
    getAllMaintenance,
    getSingleMaintenance,
    approveMaintenance,
    rejectMaintenance,
    resolveMaintenance

} = require("../controllers/maintenanceController");


router.post("/add", raiseMaintenance);

router.get("/", getAllMaintenance);

router.get("/:id", getSingleMaintenance);

router.put("/approve/:id", approveMaintenance);

router.put("/reject/:id", rejectMaintenance);

router.put("/resolve/:id", resolveMaintenance);

module.exports = router;