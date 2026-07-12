const express = require("express");
const cors = require("cors");


const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

//asset manager
const assetRoutes = require("./routes/assetRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/maintenance", maintenanceRoutes);


//asset management
app.use("/api/assets", assetRoutes);
app.use("/api/allocations", allocationRoutes);

module.exports = app;