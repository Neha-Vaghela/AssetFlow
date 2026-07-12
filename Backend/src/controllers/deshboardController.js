const Department = require("../models/departmentModel");
const Category = require("../models/categoryModel");
const Employee = require("../models/employeeModel");


// Optional Models
let Asset = null;
let Booking = null;
let Transfer = null;
let Return = null;
let ActivityLog = null;
let Audit = null;


// Load optional models safely

try {
    Asset = require("../models/assetModel");
} catch (error) {
    console.log("Asset model not available");
}


try {
    Booking = require("../models/bookingModel");
} catch (error) {
    console.log("Booking model not available");
}


try {
    Transfer = require("../models/transferModel");
} catch (error) {
    console.log("Transfer model not available");
}


try {
    Return = require("../models/returnModel");
} catch (error) {
    console.log("Return model not available");
}


try {
    ActivityLog = require("../models/activityLogModel");
} catch (error) {
    console.log("Activity Log model not available");
}


try {
    Audit = require("../models/auditModel");
} catch (error) {
    console.log("Audit model not available");
}



exports.getDashboard = async (req, res) => {

    try {


        // Default values

        let totalAssets = "No Data Found";
        let availableAssets = "No Data Found";
        let allocatedAssets = "No Data Found";
        let maintenanceToday = "No Data Found";

        let activeBookings = "No Data Found";
        let pendingTransfers = "No Data Found";
        let upcomingReturns = "No Data Found";
        let overdueReturns = "No Data Found";



        // Asset Data

        if (Asset) {

            totalAssets = await Asset.countDocuments();


            availableAssets = await Asset.countDocuments({
                status: "Available"
            });


            allocatedAssets = await Asset.countDocuments({
                status: "Allocated"
            });


            maintenanceToday = await Asset.countDocuments({
                status: "Maintenance"
            });

        }



        // Booking Data

        if (Booking) {

            activeBookings = await Booking.countDocuments({
                status: "Active"
            });

        }



        // Transfer Data

        if (Transfer) {

            pendingTransfers = await Transfer.countDocuments({
                status: "Pending"
            });

        }



        // Return Data

        if (Return) {

            upcomingReturns = await Return.countDocuments({
                status: "Upcoming"
            });


            overdueReturns = await Return.countDocuments({
                status: "Overdue"
            });

        }



        // Existing Modules

        const totalDepartments =
            await Department.countDocuments();


        const totalCategories =
            await Category.countDocuments();


        const totalEmployees =
            await Employee.countDocuments();




        // Asset Distribution

        let assetDistribution = {

            available: "No Data Found",

            allocated: "No Data Found",

            maintenance: "No Data Found"

        };


        if (Asset) {

            assetDistribution = {

                available:
                    await Asset.countDocuments({
                        status: "Available"
                    }),


                allocated:
                    await Asset.countDocuments({
                        status: "Allocated"
                    }),


                maintenance:
                    await Asset.countDocuments({
                        status: "Maintenance"
                    })

            };

        }





        // Department Wise Assets

        let departmentWiseAssets = "No Data Found";


        if (Asset) {

            departmentWiseAssets =
                await Asset.aggregate([

                    {
                        $group: {

                            _id: "$department",

                            totalAssets: {
                                $sum: 1
                            }

                        }

                    },

                    {
                        $lookup: {

                            from: "departments",

                            localField: "_id",

                            foreignField: "_id",

                            as: "department"

                        }

                    },

                    {
                        $unwind: "$department"
                    },


                    {
                        $project: {

                            _id: 0,

                            department:
                                "$department.departmentName",

                            totalAssets: 1

                        }

                    }

                ]);

        }





        // Recent Activities

        let recentActivities = "No Data Found";


        if (ActivityLog) {

            recentActivities =
                await ActivityLog.find()
                    .sort({
                        createdAt: -1
                    })
                    .limit(5);

        }





        // Pending Items

        let pendingItems = "No Data Found";


        if (Audit) {

            pendingItems =
                await Audit.find({
                    status: {
                        $in: [
                            "Pending",
                            "In Progress"
                        ]
                    }
                })
                    .limit(5);

        }





        res.status(200).json({

            success: true,

            message:
                "Dashboard data fetched successfully",


            data: {


                // Dashboard Cards

                cards: {

                    totalAssets,

                    availableAssets,

                    allocatedAssets,

                    maintenanceToday,

                    activeBookings,

                    pendingTransfers,

                    upcomingReturns,

                    overdueReturns,


                    totalDepartments,

                    totalCategories,

                    totalEmployees

                },




                // Quick Actions

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





                // Charts

                assetDistribution,


                departmentWiseAssets,





                // Activity

                recentActivities,





                // Pending

                pendingItems


            }

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};