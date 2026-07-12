const Department = require("../models/departmentModel");
const Category = require("../models/categoryModel");
const Employee = require("../models/employeeModel");

exports.getDashboard = async (req, res) => {

    try {

        const totalDepartments = await Department.countDocuments();

        const totalCategories = await Category.countDocuments();

        const totalEmployees = await Employee.countDocuments();

        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            data: {

                // Existing Modules
                totalDepartments,
                totalCategories,
                totalEmployees,

                // Future Modules
                totalAssets: 0,
                availableAssets: 0,
                allocatedAssets: 0,
                maintenanceToday: 0,
                activeBookings: 0,
                pendingTransfers: 0,
                upcomingReturns: 0,
                overdueReturns: 0
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};