const Department = require("../models/departmentModel");
const Category = require("../models/categoryModel");
const Employee = require("../models/employeeModel");

exports.getDashboard = async (req, res) => {
    try {

        // Database Counts
        const totalDepartments = await Department.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalEmployees = await Employee.countDocuments();

        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",

            data: {

                // Dashboard Cards
                cards: {
                    totalAssets: 0,
                    availableAssets: 0,
                    allocatedAssets: 0,
                    maintenanceToday: 0,
                    activeBookings: 0,
                    pendingTransfers: 0,
                    upcomingReturns: 0,
                    overdueReturns: 0,

                    totalDepartments,
                    totalCategories,
                    totalEmployees
                },

                // Quick Action Buttons
                quickActions: [
                    {
                        title: "Add Department",
                        route: "/departments/create"
                    },
                    {
                        title: "Add Category",
                        route: "/category/create"
                    },
                    {
                        title: "Add Employee",
                        route: "/employees/create"
                    }
                ],

                // Pie Chart
                assetDistribution: {
                    available: 0,
                    allocated: 0,
                    maintenance: 0
                },

                // Bar Chart
                departmentWiseAssets: [
                    {
                        department: "IT",
                        totalAssets: 0
                    },
                    {
                        department: "HR",
                        totalAssets: 0
                    },
                    {
                        department: "Finance",
                        totalAssets: 0
                    },
                    {
                        department: "Operations",
                        totalAssets: 0
                    }
                ],

                // Recent Activities
                recentActivities: [
                    {
                        user: "Admin",
                        action: "Created Department",
                        description: "IT Department",
                        date: new Date()
                    },
                    {
                        user: "Admin",
                        action: "Added Category",
                        description: "Laptop Category",
                        date: new Date()
                    },
                    {
                        user: "Admin",
                        action: "Added Employee",
                        description: "Employee Record",
                        date: new Date()
                    }
                ],

                // Pending Items
                pendingItems: [
                    {
                        title: "Q3 Audit",
                        status: "Pending"
                    },
                    {
                        title: "Laptop Audit",
                        status: "Pending"
                    },
                    {
                        title: "Printer Audit",
                        status: "In Progress"
                    }
                ]
            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};