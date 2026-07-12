const Department = require("../models/departmentModel");

// Create Department
exports.createDepartment = async (req, res) => {
    try {

        const {
            departmentName,
            departmentHead,
            parentDepartment,
            status,
        } = req.body;

        if (!departmentName || !departmentHead) {
            return res.status(400).json({
                success: false,
                message: "Department Name and Department Head are required",
            });
        }

        const existingDepartment = await Department.findOne({
            departmentName: departmentName.trim(),
        });

        if (existingDepartment) {
            return res.status(400).json({
                success: false,
                message: "Department already exists",
            });
        }

        const department = await Department.create({
            departmentName: departmentName.trim(),
            departmentHead,
            parentDepartment: parentDepartment || null,
            status,
        });

        res.status(201).json({
            success: true,
            message: "Department created successfully",
            data: department,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// Get All Departments
exports.getDepartments = async (req, res) => {

    try {

        const departments = await Department.find()
            .populate("departmentHead", "name email")
            .populate("parentDepartment", "departmentName");

        res.status(200).json({
            success: true,
            count: departments.length,
            data: departments,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// Get Department By ID
exports.getDepartmentById = async (req, res) => {

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

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// Update Department
exports.updateDepartment = async (req, res) => {

    try {

        const {
            departmentName,
            departmentHead,
            parentDepartment,
            status,
        } = req.body;

        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found",
            });
        }

        if (departmentName) {

            const existingDepartment = await Department.findOne({
                departmentName,
                _id: { $ne: req.params.id },
            });

            if (existingDepartment) {
                return res.status(400).json({
                    success: false,
                    message: "Department name already exists",
                });
            }

        }

        department.departmentName =
            departmentName || department.departmentName;

        department.departmentHead =
            departmentHead || department.departmentHead;

        department.parentDepartment =
            parentDepartment || null;

        department.status =
            status || department.status;

        await department.save();

        res.status(200).json({
            success: true,
            message: "Department updated successfully",
            data: department,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// Deactivate Department
exports.deactivateDepartment = async (req, res) => {

    try {

        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found",
            });
        }

        department.status = "Inactive";

        await department.save();

        res.status(200).json({
            success: true,
            message: "Department deactivated successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};