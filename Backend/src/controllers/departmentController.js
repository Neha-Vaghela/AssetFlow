import Department from "../model/departmentModel.js";
import HttpError from "../middleware/HttpError.js";


const departmentController = {

    // Create Department
    async createDepartment(req, res,next) {
        try {
            const {
                departmentName,
                departmentHead,
                parentDepartment,
                status,
            } = req.body;

            // Validation
        if (!departmentName || !status) {
            return res.status(400).json({
                success: false,
                message: "Department Name and Status are required",
            });
        }

        if (!["Active", "Inactive"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }


            const existingDepartment = await Department.findOne({
                departmentName,
            });

            if (existingDepartment) {
                return res.status(400).json({
                    success: false,
                    message: "Department already exists",
                });
            }

            const department = await Department.create({
                departmentName,
                departmentHead,
                parentDepartment,
                status,
            });

            res.status(201).json({
                success: true,
                message: "Department created successfully",
                data: department,
            });

        } catch (error) {
            next(new HttpError(error.message, 500));

        }
    },

    // Get All Departments
    async getDepartments(req, res,next) {
        try {

            const departments = await Department.find()
                .populate("departmentHead", "name email")
                .populate("parentDepartment", "departmentName");

            res.status(200).json({
                success: true,
                data: departments,
            });

        } catch (error) {

            next(new HttpError(error.message, 500));


        }
    },

    // Get Single Department
    async getDepartment(req, res,next) {

        try {

            const department = await Department.findById(req.params.id)
                .populate("departmentHead", "name email")
                .populate("parentDepartment", "departmentName");

            if (!department) {
                return res.status(404).json({
                    success: false,
                    message: "Department not found",
                });
            }

            res.status(200).json({
                success: true,
                data: department,
            });

        } catch (error) {

            next(new HttpError(error.message, 500));


        }
    },

    // Update Department
    async updateDepartment(req, res,next) {

        try {

            const department = await Department.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

            if (!department) {
                return res.status(404).json({
                    success: false,
                    message: "Department not found",
                });
            }

            res.status(200).json({
                success: true,
                message: "Department updated successfully",
                data: department,
            });

        } catch (error) {

            next(new HttpError(error.message, 500));


        }
    },

    // Deactivate Department
    async deactivateDepartment(req, res,next) {

        try {

            const department = await Department.findByIdAndUpdate(
                req.params.id,
                {
                    status: "Inactive",
                },
                {
                    new: true,
                }
            );

            if (!department) {
                return res.status(404).json({
                    success: false,
                    message: "Department not found",
                });
            }

            res.status(200).json({
                success: true,
                message: "Department deactivated successfully",
                data: department,
            });

        } catch (error) {

            next(new HttpError(error.message, 500));


        }
    },

};

export default departmentController;